import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { items, total, name, phone, pickupTime } = req.body;

    const itemsHtml = items
      .map((i) => `<li>${i.qty} x ${i.name} — $${i.price * i.qty}</li>`)
      .join("");

    await resend.emails.send({
      from: "Shelly's Signature Designs <orders@shellysdesigns.com>",
      to: "ehopeinjesus@yahoo.com",
      subject: "Cash Pickup Order Request",
      html: `
        <h2>New Cash Pickup Request</h2>
        <ul>${itemsHtml}</ul>
        <p><strong>Subtotal:</strong> $${total}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Preferred pickup time:</strong> ${pickupTime}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({ error: err.message });
  }
}
