
export default function Loading() {
  return (
    <main className="section">
      <div className="skeleton skeleton-back-link" />

      <section className="product-details">
        <div className="skeleton skeleton-detail-image" />

        <div className="details-content">
          <div className="skeleton skeleton-category" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-price" />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-button" />
        </div>
      </section>
    </main>
  );
}
