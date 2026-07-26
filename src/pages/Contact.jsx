import React, { useState } from "react";
import { Mail } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="section contact-page">
      <span className="eyebrow">
        <Mail size={13} /> Get in touch
      </span>
      <h2 className="font-display">Custom orders &amp; questions</h2>
      <div className="contact-grid">
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label>
            Name
            <input type="text" required />
          </label>
          <label>
            Email
            <input type="email" required />
          </label>
          <label>
            What are you dreaming up?
            <textarea rows={4} required />
          </label>
          <button className="btn-primary" type="submit">
            {sent ? "Sent — talk soon!" : "Send message"}
          </button>
        </form>
        <div className="contact-side">
          <p>
            Shelly's Signature Designs
            <br />
            Custom Apparel &amp; Printing
          </p>
          <a className="contact-link" href="#">
            <Mail size={14} /> hello@shellyssignaturedesigns.com
          </a>
          <a className="contact-link" href="#">
            <span style={{ fontWeight: 600 }}>@</span> shellyssignaturedesigns
          </a>
        </div>
      </div>
    </section>
  );
}
