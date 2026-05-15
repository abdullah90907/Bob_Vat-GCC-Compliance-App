"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "VAT Calculator", href: "/calculator" },
  { label: "Countries", href: "/countries" },
  { label: "News", href: "/news" },
  { label: "Ask Bob", href: "/ask" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isLight = !isHome || scrolled;

  return (
    <nav className={`navbar ${isLight ? "scrolled" : "transparent"}`}>
      <div className="nav-inner">
        {/* Logo */}
        <Link href="/" className="nav-logo" style={{ color: isLight ? "var(--primary-dark)" : "white" }}>
          <img src="/logo.png" alt="Logo" style={{ height: "36px", width: "auto" }} />
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, letterSpacing: "-0.5px", textTransform: "uppercase", fontSize: "24px" }}>BobVAT</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link"
                style={{
                  color: isLight
                    ? pathname === link.href ? "var(--primary)" : "var(--text-mid)"
                    : "white",
                  background: pathname === link.href && isLight ? "rgba(37,99,235,0.08)" : "transparent",
                  fontWeight: pathname === link.href ? 600 : 500,
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href="/calculator"
          className="btn btn-sm"
          style={{ 
            display: "flex", 
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.95)",
            color: "#0f172a",
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.5)",
            fontWeight: 700
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="3" ry="3"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
            <line x1="16" y1="14" x2="16" y2="14.01"></line>
            <line x1="16" y1="10" x2="16" y2="10.01"></line>
            <line x1="16" y1="18" x2="16" y2="18.01"></line>
            <line x1="12" y1="14" x2="12" y2="14.01"></line>
            <line x1="12" y1="10" x2="12" y2="10.01"></line>
            <line x1="12" y1="18" x2="12" y2="18.01"></line>
            <line x1="8" y1="14" x2="8" y2="14.01"></line>
            <line x1="8" y1="10" x2="8" y2="10.01"></line>
            <line x1="8" y1="18" x2="8" y2="18.01"></line>
          </svg>
          Calculate
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: isLight ? "var(--text-dark)" : "white",
          }}
          className="mobile-menu-btn"
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "white",
            borderTop: "1px solid var(--border)",
            padding: "16px 24px 24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: pathname === link.href ? "var(--primary)" : "var(--text-mid)",
                padding: "12px 16px",
                marginBottom: "4px",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/calculator"
            className="btn w-full"
            onClick={() => setMenuOpen(false)}
            style={{ 
              marginTop: "12px", 
              justifyContent: "center",
              background: "#0f172a",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="3" ry="3"></rect>
              <line x1="8" y1="6" x2="16" y2="6"></line>
              <line x1="16" y1="14" x2="16" y2="14.01"></line>
              <line x1="16" y1="10" x2="16" y2="10.01"></line>
              <line x1="16" y1="18" x2="16" y2="18.01"></line>
              <line x1="12" y1="14" x2="12" y2="14.01"></line>
              <line x1="12" y1="10" x2="12" y2="10.01"></line>
              <line x1="12" y1="18" x2="12" y2="18.01"></line>
              <line x1="8" y1="14" x2="8" y2="14.01"></line>
              <line x1="8" y1="10" x2="8" y2="10.01"></line>
              <line x1="8" y1="18" x2="8" y2="18.01"></line>
            </svg>
            Calculate
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
