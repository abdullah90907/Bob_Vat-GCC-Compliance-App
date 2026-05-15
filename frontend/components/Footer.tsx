import Link from "next/link";

const services = [
  { label: "VAT Calculator", href: "/calculator" },
  { label: "Registration Check", href: "/services#registration" },
  { label: "Invoice Validator", href: "/services#invoice" },
  { label: "Cross-Border Advice", href: "/services#cross-border" },
  { label: "Penalty Calculator", href: "/services#penalty" },
  { label: "Ask Bob AI", href: "/ask" },
];

const resources = [
  { label: "GCC Countries", href: "/countries" },
  { label: "Latest VAT News", href: "/news" },
  { label: "About Bob-VAT", href: "/about" },
  { label: "API Docs", href: "https://anique-1-bobvat-backend.hf.space/docs", external: true },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
              <img src="/logo.png" alt="Logo" style={{ height: "36px", width: "auto" }} />
              <h3 style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontWeight: 800, letterSpacing: "-0.5px", textTransform: "uppercase", fontSize: "24px" }}>BobVAT</h3>
            </div>
            <p>
              AI-powered bilingual VAT compliance assistant for Gulf SMEs.
              Covering all 6 GCC countries with live data and precise calculations.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              {["🇦🇪", "🇸🇦", "🇧🇭", "🇴🇲", "🇶🇦", "🇰🇼"].map((flag, i) => (
                <span key={i} style={{ fontSize: "22px" }}>{flag}</span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              {resources.map((r) => (
                <li key={r.href}>
                  {r.external ? (
                    <a href={r.href} target="_blank" rel="noopener noreferrer">{r.label} ↗</a>
                  ) : (
                    <Link href={r.href}>{r.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-heading">GCC VAT Rates</h4>
            <ul className="footer-links">
              <li><span style={{ color: "#94a3b8" }}>🇦🇪 UAE — 5%</span></li>
              <li><span style={{ color: "#94a3b8" }}>🇸🇦 Saudi Arabia — 15%</span></li>
              <li><span style={{ color: "#94a3b8" }}>🇧🇭 Bahrain — 10%</span></li>
              <li><span style={{ color: "#94a3b8" }}>🇴🇲 Oman — 5%</span></li>
              <li><span style={{ color: "#8b5cf6" }}>🇶🇦 Qatar — Pending</span></li>
              <li><span style={{ color: "#8b5cf6" }}>🇰🇼 Kuwait — Pending</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <span>© {new Date().getFullYear()} BOBVAT. All rights reserved.</span>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            background: "rgba(255,255,255,0.05)", 
            padding: "6px 12px", 
            borderRadius: "50px",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "12px",
            fontWeight: 600,
            color: "#fb923c"
          }}>
            <span style={{ color: "#94a3b8" }}>Architected &amp; Built with</span>
            <span style={{ color: "white" }}>🚀 IBM Bob Agent</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
