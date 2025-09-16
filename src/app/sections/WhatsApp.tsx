"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import QR_IMAGE from "../../../public/qr.png"; // ✅ Update path if needed
import "../styles/WhatsApp.css";

// ✅ WhatsApp group link
const WHATSAPP_GROUP_LINK =
  "https://chat.whatsapp.com/EIRbyW0Fk9EIzQIdgZueLd?mode=ems_share_t";

export default function WhatsApp() {
  return (
    <section className="whatsapp-section">
      <h2 className="whatsapp-heading">
        Order Fresh Organic Veggies on WhatsApp! 🌿
      </h2>
      <p className="whatsapp-subheading">
        Scan the QR code below to join our group and place your order instantly.
      </p>

      {/* ✅ Optimized Next.js Image */}
      <Image
        src={QR_IMAGE as StaticImageData}
        alt="WhatsApp Group QR Code"
        className="whatsapp-qr"
        width={200}
        height={200}
        priority
      />

      <br />

      <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer">
        <button className="whatsapp-button">Join WhatsApp Group</button>
      </a>
    </section>
  );
}
