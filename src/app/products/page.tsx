"use client"; // Required for useState/useEffect

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import "../styles/ProductPage.css";

import {
  addOrUpdateItem,
  removeItem,
  getAllItems,
  type CartItem,
} from "../DB/CartDB";

// Import images
import tomato from "../../../public/tomato.jpg";
import onion from "../../../public/onion.jpg";
import brinjal from "../../../public/brinjal.jpg";
import ladiesfinger from "../../../public/ladiesfinger.jpg";
import greenchilli from "../../../public/greenchilli.jpg";
import beetroot from "../../../public/beetroot.jpg";
import potato from "../../../public/potato.jpg";
import curryleaf from "../../../public/curryleaf.jpg";
import coriander from "../../../public/coriander.jpg";
import radish from "../../../public/radish.jpg";
import pumpkin from "../../../public/pumpkin.jpg";
import cucumber from "../../../public/cucumber.jpg";
import cauliflower from "../../../public/cauliflower.jpg";
import bittergourd from "../../../public/bittergourd.jpg";

// Define Product type
interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string | StaticImageData;
}

// Products organized by category
interface ProductsData {
  [category: string]: Product[];
}


const fallbackImage = "/comingsoon.png"; // 

const productsData: ProductsData = {
  Vegetables: [
    { id: 1, name: "Tomato", price: 1, unit: "kg", image: tomato }, 
    { id: 2, name: "Onion", price: 35, unit: "kg", image: onion }, 
    { id: 3, name: "Brinjal", price: 60, unit: "kg", image: brinjal },
    { id: 4, name: "Ladies Finger", price: 60, unit: "kg", image: ladiesfinger },
    { id: 5, name: "GreenChilli", price: 60, unit: "kg", image: greenchilli },
    { id: 6, name: "Carrot", price: 60, unit: "kg", image: "" },
    { id: 7, name: "Beetroot", price: 40, unit: "kg", image: beetroot }, 
    { id: 8, name: "Potatoes", price: 35, unit: "kg", image: potato }, 
    { id: 9, name: "Beans", price: 60, unit: "kg", image: "" },
    { id: 10, name: "Peas", price: 60, unit: "kg", image: "" },
    { id: 11, name: "Drumstick", price: 60, unit: "kg", image: "" },
    { id: 12, name: "Curry Leaves", price: 60, unit: "kg", image: curryleaf },
    { id: 13, name: "Coriander", price: 60, unit: "kg", image: coriander },
    { id: 14, name: "Radish", price: 40, unit: "kg", image: radish }, 
    { id: 15, name: "Tapioca", price: 35, unit: "kg", image: "" }, 
    { id: 16, name: "Pumpkin", price: 60, unit: "kg", image: pumpkin },
    { id: 17, name: "Cucumber", price: 60, unit: "kg", image: cucumber },
    { id: 18, name: "Cauliflower", price: 60, unit: "kg", image: cauliflower },
    { id: 19, name: "Sundaikai", price: 60, unit: "kg", image: "" },
    { id: 20, name: "AshGourd", price: 60, unit: "kg", image: "" },
    { id: 21, name: "SnakeGourd", price: 60, unit: "kg", image: "" },
    { id: 22, name: "BitterGourd", price: 60, unit: "kg", image: bittergourd },

  ], 
  Greens: [
    { id: 23, name: "SiruKeerai", price: 30, unit: "Bunch", image: "" }, 
    { id: 24, name: "Araikeerai", price: 30, unit: "Bunch", image: "" }, 
    { id: 25, name: "Ponnanganni", price: 30, unit: "Bunch", image: "" },
    { id: 26, name: "PulichaiKeerai", price: 30, unit: "Bunch", image: "" },
    { id: 27, name: "Thandukeerai", price: 30, unit: "Bunch", image: "" },
    { id: 28, name: "MurungaiKeerai", price: 40, unit: "Bunch", image: "" },
  ], 
  Fruits: [
    { id: 29, name: "Watermelon", price: 180, unit: "kg", image: "" }, 
    { id: 30, name: "Banana", price: 60, unit: "dozen", image: "" },
    { id: 31, name: "Papaya", price: 85, unit: "kg", image: "" },  
    { id: 32, name: "Mango", price: 85, unit: "kg", image: "" },
    { id: 33, name: "Guava", price: 85, unit: "kg", image: "" },
    { id: 34, name: "Sapotta", price: 85, unit: "kg", image: "" },
    { id: 35, name: "Grapes", price: 85, unit: "kg", image: "" },
    { id: 36, name: "Muskmelon", price: 85, unit: "kg", image: "" },
    { id: 37, name: "Pineapple", price: 85, unit: "kg", image: "" },
    { id: 38, name: "Dragon Fruit", price: 85, unit: "kg", image: "" },
    { id: 39, name: "Lemon", price: 85, unit: "kg", image: "" },
    { id: 40, name: "JackFruit", price: 85, unit: "kg", image: "" },
  ], 
  Rices: [
    { id: 41, name: "Basmati Rice", price: 90, unit: "kg", image: "" }, 
    { id: 42, name: "Brown Rice", price: 120, unit: "kg", image: "" },
    { id: 43, name: "White Ponni", price: 120, unit: "kg", image: "" },
    { id: 44, name: "Samba", price: 120, unit: "kg", image: "" },
    { id: 45, name: "Matta", price: 120, unit: "kg", image: "" },
    { id: 46, name: "Idly Rice", price: 120, unit: "kg", image: "" },
    { id: 47, name: "Sona Masoori", price: 120, unit: "kg", image: "" },
    { id: 48, name: "Thooyamalli", price: 120, unit: "kg", image: "" },
    { id: 49, name: "Karuppukavuni", price: 120, unit: "kg", image: "" },

  ], 
  Millets: [
    { id: 50, name: "Ragi", price: 70, unit: "kg", image: "" }, 
    { id: 51, name: "Foxtail Millet", price: 85, unit: "kg", image: "" },
    { id: 52, name: "Ellu", price: 85, unit: "kg", image: "" },
    { id: 53, name: "Corn", price: 85, unit: "kg", image: "" },
    { id: 54, name: "Drychilli", price: 85, unit: "kg", image: "" },
    { id: 55, name: "Pachai Payaru", price: 85, unit: "kg", image: "" },
    { id: 56, name: "Kambu", price: 85, unit: "kg", image: "" },
    { id: 57, name: "Thinai", price: 85, unit: "kg", image: "" },
    { id: 58, name: "Varagu", price: 85, unit: "kg", image: "" },
    { id: 59, name: "Samai", price: 85, unit: "kg", image: "" },
    { id: 60, name: "Kuthiraivali", price: 85, unit: "kg", image: "" },  
    { id: 61, name: "Ullundhu Black", price: 85, unit: "kg", image: "" },  
    { id: 62, name: "Ullundhu White", price: 85, unit: "kg", image: "" },
  ], 
  DairyProducts: [
    { id: 63, name: "Milk", price: 50, unit: "litre", image: "" }, 
    { id: 64, name: "Curd", price: 60, unit: "kg", image: "" },
    { id: 65, name: "Butter", price: 250, unit: "kg", image: "" },
    { id: 66, name: "Ghee", price: 230, unit: "kg", image: "" },
    { id: 67, name: "Paneer", price: 300, unit: "kg", image: "" },
    { id: 68, name: "Cheese", price: 200, unit: "kg", image: "" },
    { id: 69, name: "ButterMilk", price: 150, unit: "litre", image: "" },
  ], 
  Eggs: [
    { id: 70, name: "NattuKozhi", price: 15, unit: "Piece", image: "" }, 
    { id: 71, name: "Duck", price: 20, unit: "Piece", image: "" },
  ], 
  Oils: [
    { id: 72, name: "Coconut Oil", price: 250, unit: "litre", image: "" }, 
    { id: 73, name: "Groundnut Oil", price: 230, unit: "litre", image: "" },
    { id: 74, name: "Sesame Oil", price: 300, unit: "litre", image: "" },
    { id: 75, name: "Sunflower Oil", price: 200, unit: "litre", image: "" },
  ],
};

export default function ProductPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("Vegetables");
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from DB
  const loadCart = async () => {
    const items: CartItem[] = await getAllItems();
    setCart(items);
  };

  useEffect(() => {
    loadCart();

    const handleCartChange = () => loadCart();
    window.addEventListener("cartChanged", handleCartChange);
    return () => window.removeEventListener("cartChanged", handleCartChange);
  }, []);

  const getQty = (id: number) => {
    const item = cart.find((i) => i.id === id);
    return item ? item.qty : 0;
  };

  const handleIncrease = async (product: Product) => {
    const existingItem = cart.find((i) => i.id === product.id);
    if (existingItem) {
      const updatedItem: CartItem = {
        ...existingItem,
        qty: existingItem.qty + 1,
        total: (existingItem.qty + 1) * product.price,
      };
      await addOrUpdateItem(updatedItem);
    } else {
      const newItem: CartItem = { ...product, qty: 1, total: product.price };
      await addOrUpdateItem(newItem);
    }
  };

  const handleDecrease = async (product: Product) => {
    const existingItem = cart.find((i) => i.id === product.id);
    if (!existingItem) return;

    if (existingItem.qty === 1) {
      await removeItem(product.id);
    } else {
      const updatedItem: CartItem = {
        ...existingItem,
        qty: existingItem.qty - 1,
        total: (existingItem.qty - 1) * product.price,
      };
      await addOrUpdateItem(updatedItem);
    }
  };

  const handleViewCart = () => router.push("/cart");

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="product-page">
      <div className="sidebar">
        <h2>Categories</h2>
        <ul>
          {Object.keys(productsData).map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="products">
        <h2 className="Selcat">{selectedCategory}</h2>
        <div className="product-grid">
          {productsData[selectedCategory].map((product) => {
            const qty = getQty(product.id);
            return (
              <div key={product.id} className="product-card">
                <Image src={ typeof product.image === "string" ? product.image.trim() !== "" ? product.image: fallbackImage : product.image} alt={product.name} width={200} height={200} style={{objectFit: "cover"}} />
                <h3>{product.name}</h3>
                <p>₹{product.price}/{product.unit}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrease(product)} disabled={qty === 0}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => handleIncrease(product)}>+</button>
                </div>
                {qty > 0 && <p className="total">Total: ₹{qty * product.price}</p>}
              </div>
            );
          })}
        </div>

        <div className="mini-cart-summary">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ₹{totalPrice}</p>
        </div>

        <button
          className="checkout-btn"
          onClick={handleViewCart}
          disabled={cart.length === 0}
        >
          View Cart ({totalItems})
        </button>
      </div>
    </div>
  );
}
