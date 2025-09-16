"use client";
import React, { useState, useEffect } from "react";
import "../styles/Blog.css";
import Okra from "../../../public/Okra.jpg";
import { StaticImageData } from "next/image";
import Image from "next/image";

// Type definitions
interface FAQ {
  q: string;
  a: string;
}

interface Nutrition {
  calories: string;
  carbs: string;
  protein: string;
  fat: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData;
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  tips?: string[];
  variations?: string[];
  faqs?: FAQ[];
  nutrition?: Nutrition;
}

// Recipes array
const recipes: Recipe[] = [
  {
    id: 1,
    title: "Crispy Ladies Finger Fry",
    description: "Crispy and tasty fried ladies finger snack.",
    image: Okra,
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: "2–3 people",
    difficulty: "Easy",
    ingredients: [
      "Ladies finger (Okra) – 200g",
      "Oil – for deep frying",
      "Chili powder – 1 tsp",
      "Salt – to taste",
      "Turmeric – ½ tsp",
    ],
    instructions: [
      "Wash and pat dry the ladies finger. Slice them into thin pieces.",
      "In a bowl, mix sliced okra with chili powder, turmeric, and salt.",
      "Heat oil in a pan on medium flame.",
      "Deep fry the spiced okra until golden brown and crispy.",
      "Remove and drain excess oil on tissue paper before serving.",
    ],
    tips: [
      "Make sure okra is completely dry before frying to avoid stickiness.",
      "You can add rice flour or corn flour for extra crispiness.",
    ],
    variations: [
      "Air fry instead of deep fry for a healthier version.",
      "Add curry leaves for extra flavor.",
    ],
    faqs: [
      {
        q: "Can I use frozen okra?",
        a: "Yes, but thaw and pat dry before frying to avoid sogginess.",
      },
      {
        q: "How do I store fried okra?",
        a: "Best eaten fresh, but can be stored in an airtight container for up to 1 day.",
      },
    ],
    nutrition: {
      calories: "180 kcal",
      carbs: "10g",
      protein: "2g",
      fat: "12g",
    },
  },
  // ✅ You can continue the rest of your recipes with same structure
];

export default function BlogPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [search, setSearch] = useState<string>("");
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [parallaxStyle, setParallaxStyle] = useState<React.CSSProperties>({});

  // Track cursor movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const moveX = (e.clientX / innerWidth - 0.5) * 20;
      const moveY = (e.clientY / innerHeight - 0.5) * 20;

      setCursorPos({ x: e.clientX, y: e.clientY });
      setParallaxStyle({
        transform: `perspective(1000px) rotateX(${moveY}deg) rotateY(${-moveX}deg) scale(1.05)`,
        transition: "transform 0.1s ease-out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Filter recipes based on search
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="parallax-wrapper">
      {/* Parallax Background Layer */}
      <div className="parallax-bg" style={parallaxStyle}></div>

      {/* Main Blog Content */}
      <div className="blog-container">
        <h1>🍲 Recipes from Our Harvest</h1>

        {/* Floating Cook Emoji */}
        <div className="cook-emoji" style={{ left: cursorPos.x + 10, top: cursorPos.y + 10 }}>
          👨‍🍳
        </div>

        {/* Search Box */}
        {!selectedRecipe && (
          <input
            type="text"
            className="search-box"
            placeholder="🔍 Search recipes (e.g. brinjal, okra)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}

        {/* Recipe Details or List */}
        {selectedRecipe ? (
          <div className="recipe-details">
            <Image src={selectedRecipe.image} alt={selectedRecipe.title} />
            <h2>{selectedRecipe.title}</h2>
            <p>{selectedRecipe.description}</p>
            <button className="print-btn" onClick={() => window.print()}>
              🖨️ Print Recipe
            </button>
            <div className="recipe-meta">
              <p>⏱️ <b>Prep time:</b> {selectedRecipe.prepTime}</p>
              <p>🔥 <b>Cook time:</b> {selectedRecipe.cookTime}</p>
              <p>🍴 <b>Servings:</b> {selectedRecipe.servings}</p>
              <p>⭐ <b>Difficulty:</b> {selectedRecipe.difficulty}</p>
            </div>
            <h3>🛒 Ingredients</h3>
            <ul>{selectedRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
            <h3>👩‍🍳 Instructions</h3>
            <ol>{selectedRecipe.instructions.map((step, i) => <li key={i}>{step}</li>)}</ol>
            {selectedRecipe.tips && (
              <>
                <h3>🌟 Tips</h3>
                <ul>{selectedRecipe.tips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
              </>
            )}
            {selectedRecipe.variations && (
              <>
                <h3>🍽️ Variations</h3>
                <ul>{selectedRecipe.variations.map((variation, i) => <li key={i}>{variation}</li>)}</ul>
              </>
            )}
            {selectedRecipe.faqs && (
              <>
                <h3>❓ FAQs</h3>
                {selectedRecipe.faqs.map((faq, i) => (
                  <p key={i}>
                    <b>{faq.q}</b>
                    <br />
                    {faq.a}
                  </p>
                ))}
              </>
            )}
            {selectedRecipe.nutrition && (
              <>
                <h3>🔥 Nutrition (per serving)</h3>
                <p>
                  Calories: {selectedRecipe.nutrition.calories} | Carbs: {selectedRecipe.nutrition.carbs} | Protein: {selectedRecipe.nutrition.protein} | Fat: {selectedRecipe.nutrition.fat}
                </p>
              </>
            )}
            <button className="back-btn" onClick={() => setSelectedRecipe(null)}>⬅ Back to Recipes</button>
          </div>
        ) : (
          <div className="recipe-list">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <div className="recipe-card" key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
                  <Image src={recipe.image} alt={recipe.title} />
                  <h2>{recipe.title}</h2>
                  <p>{recipe.description}</p>
                </div>
              ))
            ) : (
              <p className="no-results">❌ No recipes found for "{search}"</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
