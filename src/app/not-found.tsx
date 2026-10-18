
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section">
      <div className="confirmation-box">
        <div className="confirmation-icon" aria-hidden="true">?</div>
        <h1>Page not found</h1>
        <p>
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="confirmation-actions">
          <Link href="/" className="button button-primary">
            Go to home
          </Link>
          <Link href="/products" className="button button-outline">
            Browse products
          </Link>
        </div>
      </div>
    </main>
  );
}
