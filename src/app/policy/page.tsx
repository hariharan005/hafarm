import type { Metadata } from "next";
import "../styles/Policy.css"

export const metadata: Metadata = {
  title: "Privacy Policy, Terms, Shipping, and Refunds | HA Farm",
  description:
    "Read HA Farm's Privacy Policy, Terms and Conditions, Shipping Policy, and Cancellation & Refund Policy. Learn how we protect your data, manage orders, and process refunds.",
  alternates: {
    canonical: "https://hafarm.com/policy",
  },
  openGraph: {
    title: "Policies | HA Farm",
    description:
      "Learn more about HA Farm's Privacy Policy, Terms and Conditions, Shipping Policy, and Cancellation & Refund Policy.",
    url: "https://hafarm.com/policy",
    siteName: "HA Farm",
    type: "website",
  },
};

// Optional: JSON-LD for structured policy data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "HA Farm Policies",
  description:
    "Privacy Policy, Terms and Conditions, Shipping Policy, and Cancellation & Refund Policy of HA Farm.",
  publisher: {
    "@type": "Organization",
    name: "HA Farm",
    url: "https://hafarm.com",
  },
};

export default function PolicyPage() {
  return (
    <main className="policy-page container mx-auto px-4 py-10">
      {/* Inject JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-3xl font-bold mb-8">Our Policies</h1>

      {/* Privacy Policy */}
      <section id="privacy" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p>
          At <strong>HA Farm</strong>, we respect your privacy and are fully
          committed to protecting your personal information.
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            We collect only the information necessary to process and deliver
            your orders.
          </li>
          <li>
            Your data will never be shared with third parties, except when
            required for order fulfillment.
          </li>
          <li>
            All personal data is stored and processed securely using trusted
            methods.
          </li>
          <li>
            You may request the deletion of your information by contacting{" "}
            <a href="mailto:support@hafarm.com" className="text-blue-600">
              support@hafarmfarm.com
            </a>
            .
          </li>
        </ul>
      </section>

      {/* Terms and Conditions */}
      <section id="terms" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
        <p>
          By accessing and using our website or services, you agree to the
          following terms:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>All products are subject to availability.</li>
          <li>Prices, discounts, and offers may change without prior notice.</li>
          <li>
            Users must provide accurate and up-to-date details during
            registration and checkout.
          </li>
          <li>
            We reserve the right to refuse service to anyone who violates these
            terms.
          </li>
        </ul>
        <p className="mt-2">
          For the full terms, contact us at{" "}
          <a href="mailto:support@hafarm.com" className="text-blue-600">
            support@hafarm.com
          </a>
          .
        </p>
      </section>

      {/* Shipping Policy */}
      <section id="shipping" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
        <p>At HA Farm, we aim to deliver your products quickly and reliably:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Orders are typically shipped within 1–3 business days.</li>
          <li>Delivery times may vary depending on your location.</li>
          <li>Tracking details will be shared once your order is dispatched.</li>
          <li>
            We are not liable for delivery delays caused by courier partners or
            unforeseen events.
          </li>
        </ul>
        <p className="mt-2">
          For shipping queries, please reach out to{" "}
          <a href="mailto:support@HAfarm.com" className="text-blue-600">
            support@HAfarm.com
          </a>
          .
        </p>
      </section>

      {/* Cancellation & Refunds */}
      <section id="cancellation" className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Cancellation & Refunds</h2>
        <p>We understand that plans may change, and you might need to cancel:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Orders can be cancelled within 24 hours of placement.</li>
          <li>
            Refunds are issued to the original payment method within 5–7
            business days after approval.
          </li>
          <li>
            Some products may not be eligible for cancellation once processed or
            shipped.
          </li>
        </ul>
        <p className="mt-2">
          For cancellation or refund queries, contact us at{" "}
          <a href="mailto:support@HAfarm.com" className="text-blue-600">
            support@HAfarm.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
