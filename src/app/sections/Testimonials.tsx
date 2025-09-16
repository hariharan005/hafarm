"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { Star, StarHalf } from "lucide-react"; // ✅ Star + Half star
import "../styles/Testimonial.css";

// ✅ Local images from /public
import ProfilePic1 from "../../../public/profile1.jpg";
import ProfilePic2 from "../../../public/profile2.jpg";
import ProfilePic3 from "../../../public/profile3.jpg";
import ProfilePic4 from "../../../public/profile4.jpg";
import ProfilePic5 from "../../../public/profile5.jpg";

// ✅ Testimonial type
interface Testimonial {
  name: string;
  text: string;
  rating: number; // allow decimals (e.g., 4.5)
  image: StaticImageData;
}

// ✅ Data (added one 4.5 example)
const testimonials: Testimonial[] = [
  {
    name: "John Doe",
    text: "HA Farm made my farming journey so much easier. Highly recommended!",
    rating: 5,
    image: ProfilePic1,
  },
  {
    name: "Jane Smith",
    text: "Excellent customer support and reliable products. Will buy again.",
    rating: 4.5,
    image: ProfilePic2,
  },
  {
    name: "Alice Johnson",
    text: "The platform is user-friendly and the results exceeded my expectations.",
    rating: 5,
    image: ProfilePic3,
  },
  {
    name: "Bob Brown",
    text: "Fast delivery and great quality. My crops are thriving!",
    rating: 4.5,
    image: ProfilePic4,
  },
  {
    name: "Charlie Davis",
    text: "I appreciate the transparency and professionalism. Five stars!",
    rating: 5,
    image: ProfilePic5,
  },
];

// ✅ StarRow now handles half stars
function StarRow({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating); // e.g., 4 from 4.5
  const hasHalf = rating % 1 !== 0; // true if decimal
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div style={{ display: "flex", gap: "4px", marginBottom: "0.5rem" }}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} size={20} color="#FFD700" fill="#FFD700" />
      ))}
      {hasHalf && <StarHalf key="half" size={20} color="#FFD700" fill="#FFD700" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={20} color="#ccc" />
      ))}
    </div>
  );
}

// ✅ Testimonial card
function TestimonialCard({ name, text, rating, image }: Testimonial) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-notch">
        <Image
          src={image}
          alt={name}
          className="testimonial-user-img"
          width={40}
          height={40}
          style={{ borderRadius: "50%", objectFit: "cover", }}
        />
      </div>
      <div className="testimonial-name">{name}</div>
      <StarRow rating={rating} />
      <div className="testimonial-text">"{text}"</div>
    </div>
  );
}

// ✅ Main component
export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">Testimonials</h2>
      <div className="testimonials-list">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
}
