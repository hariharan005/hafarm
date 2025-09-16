"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../../../public/Logo.png"; // adjust path if needed
import "../styles/Header.css";
import { getAllItems, addOrUpdateItem, removeItem } from "../DB/CartDB";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  total: number;
}

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Contact", path: "/contact" },
  { name: "Journey", path: "/journey" },
  { name: "Blog", path: "/blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Load cart items
  useEffect(() => {
    const loadCart = async () => {
      const items = await getAllItems();
      setCartItems(items);
    };
    loadCart();

    const handleCartChange = () => loadCart();
    window.addEventListener("cartChanged", handleCartChange);

    return () => window.removeEventListener("cartChanged", handleCartChange);
  }, []);

  // Close menu/cart when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setCartOpen(false);
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const grandTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handleIncrease = async (item: CartItem) => {
    const updatedItem = { ...item, qty: item.qty + 1, total: (item.qty + 1) * item.price };
    await addOrUpdateItem(updatedItem);
  };

  const handleDecrease = async (item: CartItem) => {
    if (item.qty === 1) {
      await removeItem(item.id);
    } else {
      const updatedItem = { ...item, qty: item.qty - 1, total: (item.qty - 1) * item.price };
      await addOrUpdateItem(updatedItem);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    router.push("/cart"); // Always use absolute path
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="header-left">
        <Link href="/" className="logo-container" aria-label="HA Farm home">
          <img src={Logo.src} alt="HA Farm logo" className="logo" />
        </Link>
        <span className="header-brand-name">HA Farm</span>
      </div>

      {/* Hamburger */}
      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        type="button"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* Nav */}
      <nav id="site-nav" className={`nav ${menuOpen ? "active" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`nav-link ${pathname === item.path ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Cart */}
      <div className="cart-container">
        <button className="cart-icon-btn" onClick={() => setCartOpen((v) => !v)}>
          <FaShoppingCart size={24} />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </button>
        {cartOpen && (
          <div className="mini-cart-dropdown">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      <span>{item.name}</span>
                      <span>
                        <button onClick={() => handleDecrease(item)} disabled={item.qty === 0}>
                          -
                        </button>
                        {item.qty}
                        <button onClick={() => handleIncrease(item)}>+</button>
                        = ₹{item.total}
                      </span>
                    </li>
                  ))}
                </ul>
                <p>Grand Total: ₹{grandTotal}</p>
                <button className="checkout-btn" onClick={handleCheckout}>
                  View Cart
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
