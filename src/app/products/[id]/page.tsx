
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/currency";
import AddToCartButton from "@/components/AddtoCartbutton";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="section">
      <Link href="/products" className="text-link">
        ← Back to products
      </Link>

      <section className="product-details">
        <div className="details-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="details-content">
          <p className="eyebrow">{product.category}</p>

          <h1>{product.name}</h1>

          <p className="details-price">{formatPrice(product.price)}</p>

          <p className="details-description">{product.description}</p>

          <p className={product.available ? "stock available" : "stock unavailable"}>
            {product.available
              ? `${product.stock} units available`
              : "Currently unavailable"}
          </p>
              <AddToCartButton product={product} />
          
        </div>
      </section>
    </main>
  );
} 
