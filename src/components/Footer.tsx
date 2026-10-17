
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-brand">Campus Tech</p>
        <p>Practical technology for student life.</p>
        <p className="footer-copy">
          © {new Date().getFullYear()} Campus Tech. Student project.
        </p>
      </div>
    </footer>
  );
}

