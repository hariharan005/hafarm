import React from "react";
import "../styles/Hero.css"; // styles moved here

const Hero = () => {
    return (
        <section
            className="hero-section"
            style={{ backgroundImage: `url(/grapes.jpg)` }}
        >
            <div className="hero-overlay">
                <h1 className="brand-name">HA Farm</h1>
                <p className="tagline">Fresh from our farm to your table</p>
            </div>
        </section>
    );
};

export default Hero;
