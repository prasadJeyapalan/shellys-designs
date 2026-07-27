import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 300, currency: "usd" },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 8 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Local Pickup (Free)",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 3 },
            },
          },
        },
      ],
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/?checkout=canceled`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    res.status(500).json({ error: err.message });
  }
}
