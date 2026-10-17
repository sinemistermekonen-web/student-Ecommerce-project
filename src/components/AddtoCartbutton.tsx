
"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/cartContext";

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const { addItem } = useCart();
  const [message, setMessage] = useState("");

  const unavailable = !product.available || product.stock < 1;

  function handleAdd() {
    addItem(product);
    setMessage(`${product.name} added to your cart.`);
  }

  return (
    <div>
      <button
        type="button"
        className="button button-primary"
        disabled={unavailable}
        onClick={handleAdd}
      >
        {unavailable ? "Out of stock" : "Add to cart"}
      </button>

      <p aria-live="polite" role="status">
        {message}
      </p>
    </div>
  );
}
