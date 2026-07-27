import Stripe from "stripe";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const resend = new Resend(process.env.RESEND_API_KEY);

      const itemsHtml = lineItems.data
        .map((li) => `<li>${li.quantity} x ${li.description} — $${(li.amount_total / 100).toFixed(2)}</li>`)
        .join("");

      const shipping = session.shipping_details
        ? `${session.shipping_details.name}<br>${session.shipping_details.address.line1}${
            session.shipping_details.address.line2 ? ", " + session.shipping_details.address.line2 : ""
          }<br>${session.shipping_details.address.city}, ${session.shipping_details.address.state} ${session.shipping_details.address.postal_code}`
        : "Local pickup or no shipping address";

      await resend.emails.send({
        from: "Shelly's Signature Designs <orders@shellysdesigns.com>",
        to: "ehopeinjesus@yahoo.com",
        subject: "New Paid Order!",
        html: `
          <h2>New Card Order</h2>
          <ul>${itemsHtml}</ul>
          <p><strong>Total paid:</strong> $${(session.amount_total / 100).toFixed(2)}</p>
          <p><strong>Customer email:</strong> ${session.customer_details?.email || "N/A"}</p>
          <p><strong>Shipping:</strong><br>${shipping}</p>
        `,
      });
    } catch (err) {
      console.error("Error sending order email:", err);
    }
  }

  res.status(200).json({ received: true });
}
