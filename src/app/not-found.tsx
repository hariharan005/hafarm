"use client"; // Required for useState and useEffect

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../app/styles/NotFound.css";

interface Position {
  x: number;
  y: number;
}

interface Particle extends Position {
  id: number;
}

export default function NotFound() {
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [sand, setSand] = useState<Particle[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const newX = e.clientX;
    const newY = e.clientY;
    setPos({ x: newX, y: newY });

    // create sand particle behind tractor
    const newParticle: Particle = {
      id: Date.now(),
      x: newX - 30, // behind tractor
      y: newY + 10,
    };
    setSand((prev) => [...prev.slice(-10), newParticle]); // keep last 10
  };

  // remove old sand particles after animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSand((prev) => prev.slice(1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notfound-container" onMouseMove={handleMouseMove}>
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">
        Oops! Looks like this page has wandered off to the farm.
      </p>

      {/* Tractor */}
      <span
        className="tractor-follow"
        style={{ left: pos.x, top: pos.y }}
      >
        🚜
      </span>

      {/* Sand Particles */}
      {sand.map((particle) => (
        <span
          key={particle.id}
          className="sand"
          style={{ top: particle.y, left: particle.x }}
        >
          •
        </span>
      ))}

      <div className="buttons">
        <Link href="/" className="btn">Go Back Home</Link>
        <Link href="/products" className="btn">View Our Products</Link>
      </div>
    </div>
  );
}
