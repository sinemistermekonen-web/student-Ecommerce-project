
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/currency";

type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  items: OrderItem[];
  subtotal: number;
  createdAt: string;
};

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("campus-tech-order");

      if (raw) {
        setOrder(JSON.parse(raw) as Order);
        sessionStorage.removeItem("campus-tech-order");
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  if (!order) {
    return (
      <main className="section">
        <div className="page-heading">
          <p className="eyebrow">ORDER</p>
          <h1>No order found</h1>
          <p>It looks like you haven&apos;t placed an order yet.</p>
        </div>

        <Link href="/products" className="button button-primary">
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="confirmation-box">
        <div className="confirmation-icon" aria-hidden="true">✓</div>

        <p className="eyebrow">ORDER CONFIRMED</p>
        <h1>Thank you, {order.customer.fullName}!</h1>
        <p className="confirmation-ref">
          Reference: <strong>{order.id}</strong>
        </p>
        <p>
          We have received your order. A summary has been shown below.
        </p>
      </div>

      <section className="confirmation-details">
        <div className="confirmation-section">
          <h2>Delivery details</h2>
          <p>{order.customer.fullName}</p>
          <p>{order.customer.email}</p>
          <p>{order.customer.phone}</p>
          <p>{order.customer.address}</p>
          <p>{order.customer.city}</p>
        </div>

        <div className="confirmation-section">
          <h2>Items ordered</h2>

          <ul className="checkout-items">
            {order.items.map((item) => (
              <li key={item.productId} className="checkout-item-row">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
        </div>
      </section>

      <div className="confirmation-actions">
        <Link href="/" className="button button-primary">
          Back to home
        </Link>
        <Link href="/products" className="button button-outline">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
