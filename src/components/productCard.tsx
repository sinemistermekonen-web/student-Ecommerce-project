
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/currency";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link
        href={`/products/${product.id}`}
        className="product-image-link"
        aria-label={`View ${product.name}`}
      >
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
            style={{ objectFit: "contain" }}
          />
        </div>
      </Link>

      <div className="product-card-content">
        <p className="product-category">{product.category}</p>

        <h3>
          <Link href={`/products/${product.id}`}>
            {product.name}
          </Link>
        </h3>

        <p className="product-price">
          {formatPrice(product.price)}
        </p>

        <p className={product.available ? "stock available" : "stock unavailable"}>
          {product.available ? "In stock" : "Out of stock"}
        </p>

        <Link
          href={`/products/${product.id}`}
          className="button button-outline"
        >
          View product
        </Link>
      </div>
    </article>
  );
}
