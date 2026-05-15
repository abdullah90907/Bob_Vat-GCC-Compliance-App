import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bob-VAT Services | GCC VAT Compliance",
  description: "Explore all Bob-VAT AI services including Calculator, Registration Check, Invoice Validator, Cross-Border Advisor, and Penalty Calculator.",
};

const serviceCards = [
  {
    id: "calculator",
    icon: "🧮",
    title: "VAT Calculator",
    subtitle: "Calculate net, VAT, and gross amounts",
    desc: "Instant calculations across all 6 GCC countries. Bob automatically looks up the latest live rates (e.g., KSA 15%, UAE 5%) and provides full legal citations for the calculation.",
    color: "#2563eb",
    bg: "rgba(37,99,235,0.08)",
    actionLabel: "Try Calculator",
    actionHref: "/calculator",
    features: ["Live rate lookups", "Standard/Exempt/Zero-Rated", "Legal citations", "Confidence scoring"]
  },
  {
    id: "registration",
    icon: "📋",
    title: "Registration Checker",
    subtitle: "Check your mandatory threshold status",
    desc: "Unsure if you need to register? Enter your annual revenue and Bob will compare it against the latest local thresholds, giving you a clear Yes/No with the revenue gap and next steps.",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    actionLabel: "Check Status",
    actionHref: "/ask",
    features: ["Revenue comparisons", "Mandatory/Voluntary limits", "Currency conversion", "Deadline guidance"]
  },
  {
    id: "invoice",
    icon: "🧾",
    title: "Invoice Validator",
    subtitle: "Check invoices for VAT compliance",
    desc: "Paste the text of an invoice you received or created. Bob uses Qwen AI to extract the data, check if VAT was applied correctly, and verify that all legally required fields are present.",
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    actionLabel: "Validate Invoice",
    actionHref: "/ask",
    features: ["Rate validation", "Required field check", "Error highlighting", "Correction suggestions"]
  },
  {
    id: "cross-border",
    icon: "🌍",
    title: "Cross-Border Advisor",
    subtitle: "B2B and B2C international rules",
    desc: "Selling from UAE to Saudi Arabia? Bob explains the exact VAT treatment (e.g., zero-rated exports vs standard) based on the transaction type and latest GCC treaty implementations.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    actionLabel: "Get Advice",
    actionHref: "/ask",
    features: ["B2B vs B2C distinction", "Import/Export rules", "Reverse charge mechanism", "Zero-rating guidance"]
  },
  {
    id: "penalty",
    icon: "⚠️",
    title: "Penalty Calculator",
    subtitle: "Estimate late filing/payment fines",
    desc: "Calculate estimated penalties for late tax payments. Bob knows the specific rules for each country, including the UAE's upcoming 14% annual penalty rate taking effect in April 2026.",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    actionLabel: "Calculate Penalty",
    actionHref: "/ask",
    features: ["Late payment fees", "Late filing fees", "New 2026 UAE rules", "Reduction strategies"]
  },
  {
    id: "ask",
    icon: "🤖",
    title: "Ask Bob AI",
    subtitle: "Bilingual VAT assistant",
    desc: "For anything else, just ask Bob. Using Qwen's advanced LLM and Tavily's live search, Bob can answer complex VAT questions in both Arabic and English with cited sources.",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
    actionLabel: "Ask a Question",
    actionHref: "/ask",
    features: ["Bilingual AR/EN", "Live web search", "Source citations", "Context aware"]
  }
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <div className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderColor: "rgba(255,255,255,0.3)", margin: "0 auto 16px" }}>
            ⚡ Our Capabilities
          </div>
          <h1>Bob-VAT Services</h1>
          <p>A complete suite of AI-powered tools to automate VAT compliance for Gulf SMEs.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {serviceCards.map((s, index) => (
              <div 
                key={s.id} 
                id={s.id} 
                className="card" 
                style={{ 
                  display: "flex", 
                  gap: "32px", 
                  padding: "40px",
                  alignItems: "center",
                  flexDirection: index % 2 !== 0 ? "row-reverse" : "row",
                  borderTop: `4px solid ${s.color}`
                }}
              >
                {/* Icon Side */}
                <div style={{ 
                  flexShrink: 0, 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "24px", 
                  background: s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "56px"
                }}>
                  {s.icon}
                </div>

                {/* Content Side */}
                <div style={{ flex: 1 }}>
                  <div style={{ color: s.color, fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                    {s.subtitle}
                  </div>
                  <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-dark)", marginBottom: "16px" }}>
                    {s.title}
                  </h2>
                  <p style={{ fontSize: "16px", color: "var(--text-mid)", lineHeight: 1.7, marginBottom: "24px" }}>
                    {s.desc}
                  </p>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
                    {s.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-dark)", fontWeight: 500 }}>
                        <span style={{ color: s.color }}>✓</span> {f}
                      </div>
                    ))}
                  </div>

                  <Link href={s.actionHref} className="btn" style={{ background: s.color, color: "white" }}>
                    {s.actionLabel} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Integration Banner */}
          <div className="card" style={{ marginTop: "64px", background: "linear-gradient(135deg, #1a56db, #2563eb)", color: "white", textAlign: "center", padding: "64px 24px" }}>
            <h2 style={{ fontSize: "32px", marginBottom: "16px" }}>Need API Access?</h2>
            <p style={{ fontSize: "18px", opacity: 0.9, maxWidth: "600px", margin: "0 auto 32px" }}>
              All Bob-VAT services are available via our REST API. Integrate real-time VAT calculations and validation directly into your own ERP or POS system.
            </p>
            <a href="https://anique-1-bobvat-backend.hf.space/docs" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white btn-lg">
              View API Documentation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
