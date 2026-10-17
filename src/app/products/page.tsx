
import ProductList from "@/components/productList";
import { products } from "@/data/products";

export const metadata = {
  title: "Products | Campus Tech",
  description: "Browse electronics and accessories for students.",
};

export default function ProductsPage() {
  return (
    <main className="section">
      <div className="page-heading">
        <p className="eyebrow">THE CATALOGUE</p>
        <h1>All products</h1>
        <p>
          Browse practical electronics for your studies and everyday work.
        </p>
      </div>

      <ProductList products={products} />
    </main>
  );
}
