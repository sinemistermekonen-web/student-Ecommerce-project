
export default function Loading() {
  return (
    <main className="section">
      <div className="page-heading">
        <div className="skeleton skeleton-eyebrow" />
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
      </div>

      <div className="product-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="product-card skeleton-card">
            <div className="skeleton skeleton-image" />
            <div className="product-card-content">
              <div className="skeleton skeleton-category" />
              <div className="skeleton skeleton-name" />
              <div className="skeleton skeleton-price" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
