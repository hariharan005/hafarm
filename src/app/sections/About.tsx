// src/app/pages/About.tsx
"use client"; // Only needed if using client-side hooks

import "../styles/About.css";
import Image from "next/image";
import aboutCompanyImg from "../../../public/6.jpg";
import visionImg from "../../../public/1.jpg";
import missionImg from "../../../public/4.jpg";

const About = () => {
  return (
    <section className="about-section">
      <h2 className="about-heading">About Us</h2>

      {/* About Company */}
      <div className="about-row">
        <div className="about-col about-text">
          <h3>About Company</h3>
          <p>
            We are dedicated to sustainable farming practices, delivering fresh produce while caring for the environment and our community. Our commitment is to quality, transparency, and innovation in agriculture.
          </p>
        </div>
        <div className="about-col about-img">
          <Image
            src={aboutCompanyImg}
            alt="About Company"
            width={500} // adjust width as needed
            height={400} // adjust height as needed
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Vision */}
      <div className="about-row reverse">
        <div className="about-col about-img">
          <Image
            src={visionImg}
            alt="Vision"
            width={500}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="about-col about-text">
          <h3>Our Vision</h3>
          <p>
            To lead the way in sustainable farming, inspiring communities to embrace eco-friendly agriculture and healthy living for generations to come.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="about-row">
        <div className="about-col about-text">
          <h3>Our Mission</h3>
          <p>
            Empower farmers and consumers through innovative solutions, education, and responsible practices that promote growth, sustainability, and well-being.
          </p>
        </div>
        <div className="about-col about-img">
          <Image
            src={missionImg}
            alt="Mission"
            width={500}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
