"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/CartPage.css";
import { getAllItems, removeItem, addOrUpdateItem, CartItem } from "../DB/CartDB";

const CartPage: React.FC = () => {
  const router = useRouter(); // use Next.js router instead of useNavigate
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCart = async () => {
    const items = await getAllItems();
    setCartItems(items);
  };

  useEffect(() => {
    loadCart();
    const handleCartChange = () => loadCart();
    window.addEventListener("cartChanged", handleCartChange);

    return () => window.removeEventListener("cartChanged", handleCartChange);
  }, []);

  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Next.js navigation
    router.push("/checkout"); // You can pass state via context or URL params if needed
  };

  const handleRemoveItem = async (id: number) => {
    await removeItem(id);
    loadCart();
  };

  const handleIncrease = async (id: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      await addOrUpdateItem({
        ...item,
        qty: item.qty + 1,
        total: (item.qty + 1) * item.price,
      });
      loadCart();
    }
  };

  const handleDecrease = async (id: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    if (item.qty > 1) {
      await addOrUpdateItem({
        ...item,
        qty: item.qty - 1,
        total: (item.qty - 1) * item.price,
      });
    } else {
      await removeItem(id);
    }
    loadCart();
  };

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>
                  <button onClick={() => handleDecrease(item.id)}>-</button>
                  <span style={{ margin: "0 6px" }}>{item.qty}</span>
                  <button onClick={() => handleIncrease(item.id)}>+</button>
                  × ₹{item.price} = ₹{item.total}
                </span>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Grand Total: ₹{grandTotal}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
