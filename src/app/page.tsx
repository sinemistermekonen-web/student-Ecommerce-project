
import Link from "next/link";
import ProductCard from "@/components/productCard";
import { products } from "@/data/products";

export default function HomePage() {
  const featuredProducts = products.filter(
    (product) => product.featured && product.available
  );

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">CAMPUS TECH STORE</p>

          <h1>Technology for your student life.</h1>

          <p>
            Find practical electronics for your classes,
            coding projects, and everyday campus life.
          </p>

          <Link href="/products" className="button button-primary">
            Explore products
          </Link>
        </div>

        <div className="hero-decoration" aria-hidden="true">
          <span>01</span>
          <span>STUDY</span>
          <span>CREATE</span>
          <span>BUILD</span>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR SELECTION</p>
            <h2>Featured products</h2>
            <p>Useful technology for your everyday studies.</p>
          </div>

          <Link href="/products" className="text-link">
            View all products →
          </Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
