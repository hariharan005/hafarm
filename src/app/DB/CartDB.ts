// src/DB/CartDB.ts
import { openDB, DBSchema, IDBPDatabase } from "idb";

// ------------------
// Define Cart Item Type
// ------------------
export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  total: number;
}

// ------------------
// Define Database Schema
// ------------------
interface CartDBSchema extends DBSchema {
  cart: {
    key: number;
    value: CartItem;
  };
}

const DB_NAME = "CartDatabase";
const STORE_NAME = "cart";

let dbPromise: Promise<IDBPDatabase<CartDBSchema>>;

// ------------------
// Get or create DB
// ------------------
export async function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<CartDBSchema>(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      },
    });
  }
  return dbPromise;
}

// ------------------
// Trigger cart change event
// ------------------
const triggerCartChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cartChanged"));
  }
};

// ------------------
// CRUD Functions
// ------------------
export async function addOrUpdateItem(item: CartItem) {
  const db = await getDB();
  await db.put(STORE_NAME, item);
  triggerCartChange();
}

export async function removeItem(id: number) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
  triggerCartChange();
}

export async function getAllItems(): Promise<CartItem[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function clearCart() {
  const db = await getDB();
  await db.clear(STORE_NAME);
  triggerCartChange();
}
