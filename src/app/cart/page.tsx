
"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cartContext";
import { formatPrice } from "@/lib/currency";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="section">
        <div className="page-heading">
          <p className="eyebrow">YOUR CART</p>
          <h1>Your cart is empty</h1>
          <p>Add some products from the catalogue to get started.</p>
        </div>

        <Link href="/products" className="button button-primary">
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="page-heading">
        <p className="eyebrow">YOUR CART</p>
        <h1>Shopping cart</h1>
        <p>Review your selected items before checking out.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <article key={item.product.id} className="cart-item">
              <div className="cart-item-image">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  sizes="100px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="cart-item-details">
                <Link
                  href={`/products/${item.product.id}`}
                  className="cart-item-name"
                >
                  {item.product.name}
                </Link>

                <p className="cart-item-price">
                  {formatPrice(item.product.price)}
                </p>

                <div className="quantity-control">
                  <button
                    type="button"
                    className="quantity-button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    aria-label={`Decrease quantity of ${item.product.name}`}
                  >
                    −
                  </button>

                  <span className="quantity-value" aria-live="polite">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    className="quantity-button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    disabled={item.quantity >= item.product.stock}
                    aria-label={`Increase quantity of ${item.product.name}`}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-end">
                <p className="cart-item-line-total">
                  {formatPrice(item.product.price * item.quantity)}
                </p>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeItem(item.product.id)}
                  aria-label={`Remove ${item.product.name} from cart`}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <Link href="/checkout" className="button button-primary">
            Proceed to checkout
          </Link>

          <button
            type="button"
            className="button button-outline"
            onClick={clearCart}
          >
            Clear cart
          </button>
        </aside>
      </div>
    </main>
  );
}
