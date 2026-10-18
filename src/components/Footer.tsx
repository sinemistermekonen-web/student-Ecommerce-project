
"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-brand">Campus Tech</p>
        <p>Practical technology for student life.</p>
        <p className="footer-copy">
          © {year} Campus Tech. Student project.
        </p>
      </div>
    </footer>
  );
}
