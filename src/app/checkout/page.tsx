
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
import { formatPrice } from "@/lib/currency";

type FormErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <main className="section">
        <div className="page-heading">
          <p className="eyebrow">CHECKOUT</p>
          <h1>Your cart is empty</h1>
          <p>
            You need items in your cart before you can checkout.
          </p>
        </div>
        <a href="/products" className="button button-primary">
          Browse products
        </a>
      </main>
    );
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[\d\s\-+()]{7,}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!address.trim()) {
      newErrors.address = "Delivery address is required.";
    }

    if (!city.trim()) {
      newErrors.city = "City is required.";
    }

    return newErrors;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    const order = {
      id: `ORD-${Date.now()}`,
      customer: { fullName, email, phone, address, city },
      items: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      subtotal,
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem("campus-tech-order", JSON.stringify(order));
    clearCart();
    router.push("/order-success");
  }

  return (
    <main className="section">
      <div className="page-heading">
        <p className="eyebrow">CHECKOUT</p>
        <h1>Complete your order</h1>
        <p>Fill in your delivery details to submit your order.</p>
      </div>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2>Delivery information</h2>

          <div className="form-group">
            <label htmlFor="fullName">
              Full name <span className="required">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" className="field-error">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email address <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="field-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone number <span className="required">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="field-error">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">
              Delivery address <span className="required">*</span>
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "address-error" : undefined}
            />
            {errors.address && (
              <p id="address-error" className="field-error">
                {errors.address}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="city">
              City <span className="required">*</span>
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "city-error" : undefined}
            />
            {errors.city && (
              <p id="city-error" className="field-error">
                {errors.city}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="button button-primary"
            disabled={submitting}
          >
            {submitting ? "Submitting…" : "Place order"}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order summary</h2>

          <ul className="checkout-items">
            {items.map((item) => (
              <li key={item.product.id} className="checkout-item-row">
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
