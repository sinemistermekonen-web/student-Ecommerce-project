
"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import ProductCard from "@/components/productCard";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      return category === "All" || product.category === category;
    });

    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, sort]);

  return (
    <div>
      <div className="catalogue-controls">
        <div className="category-filters" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-button ${
                category === item ? "filter-active" : ""
              }`}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="sort-control">
          Sort by
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="default">Featured order</option>
            <option value="low-high">Price: low to high</option>
            <option value="high-low">Price: high to low</option>
          </select>
        </label>
      </div>

      <p className="results-count">
        {filteredProducts.length} products found
      </p>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}
