"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import "../styles/Carousel.css";

// ✅ Import images from public or assets
import img1 from "../../../public/1.jpg";
import img2 from "../../../public/2.jpg";
import img3 from "../../../public/3.jpg";
import img4 from "../../../public/4.jpg";
import img5 from "../../../public/5.jpg";
import img6 from "../../../public/6.jpg";
import img7 from "../../../public/7.jpg";
import img8 from "../../../public/8.jpg";
import img9 from "../../../public/9.jpg";
import img10 from "../../../public/10.jpg";
import img11 from "../../../public/11.jpg";
import img12 from "../../../public/12.jpg";

// ✅ Type definition
const images: StaticImageData[] = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

const Carousel: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <section className="carousel-section">
      <div className="carousel-container">
        <div className="carousel-image-wrapper">
          <Image
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="carousel-image"
            priority
          />
        </div>
      </div>
      <div className="carousel-indicators">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`indicator ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
