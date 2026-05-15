import Link from "next/link";
import type { Metadata } from "next";



const services = [
  {
    id: "calculator",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="16" y1="10" x2="16" y2="10.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="12" y1="10" x2="12" y2="10.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="8" y1="10" x2="8" y2="10.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line></svg>,
    title: "VAT Calculator",
    subtitle: "Calculate net, VAT, and gross amounts",
    desc: "Instant calculations across all 6 GCC countries. The platform automatically looks up the latest live rates (e.g., KSA 15%, UAE 5%) and provides full legal citations for the calculation.",
    href: "/calculator",
    actionLabel: "Try Calculator",
    color: "#2563eb",
    bg: "rgba(37,99,235,0.08)",
    features: ["Live rate lookups", "Standard/Exempt/Zero-Rated", "Legal citations", "Bank-grade accuracy"]
  },
  {
    id: "registration",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    title: "Registration Checker",
    subtitle: "Check your mandatory threshold status",
    desc: "Unsure if you need to register? Enter your annual revenue and the system will compare it against the latest local thresholds, giving you a clear Yes/No with the revenue gap and next steps.",
    href: "/registration",
    actionLabel: "Check Status",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    features: ["Revenue comparisons", "Mandatory/Voluntary limits", "Currency conversion", "Deadline guidance"]
  },
  {
    id: "invoice",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>,
    title: "Invoice Validator",
    subtitle: "Check invoices for VAT compliance",
    desc: "Paste the text of an invoice you received or created. The smart analytics engine extracts the data, checks if VAT was applied correctly, and verifies that all legally required fields are present.",
    href: "/invoice",
    actionLabel: "Validate Invoice",
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    features: ["Rate validation", "Required field check", "Error highlighting", "Correction suggestions"]
  },
  {
    id: "cross-border",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
    title: "Cross-Border Advisor",
    subtitle: "B2B and B2C international rules",
    desc: "Selling from UAE to Saudi Arabia? Get the exact VAT treatment (e.g., zero-rated exports vs standard) based on the transaction type and latest GCC treaty implementations.",
    href: "/cross-border",
    actionLabel: "Get Advice",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    features: ["B2B vs B2C distinction", "Import/Export rules", "Reverse charge mechanism", "Zero-rating guidance"]
  },
  {
    id: "penalty",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
    title: "Penalty Calculator",
    subtitle: "Estimate late filing/payment fines",
    desc: "Calculate estimated penalties for late tax payments. The platform knows the specific rules for each country, including the UAE's upcoming 14% annual penalty rate taking effect in April 2026.",
    href: "/penalty",
    actionLabel: "Calculate Penalty",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    features: ["Late payment fees", "Late filing fees", "New 2026 UAE rules", "Reduction strategies"]
  },
  {
    id: "ask",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
    title: "Tax Consultant Chat",
    subtitle: "Bilingual VAT expert assistant",
    desc: "For anything else, just consult our chat interface. Powered by advanced analytics and live database search, it answers complex VAT questions in both Arabic and English with cited sources.",
    href: "/ask",
    actionLabel: "Ask a Question",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
    features: ["Bilingual AR/EN", "Live web search", "Source citations", "Context aware"]
  },
  {
    id: "exempt",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
    title: "Exempt/Zero-Rate Checker",
    subtitle: "Verify tax-free product categories",
    desc: "Not sure if your product is exempt or zero-rated? Check specific categories like education, healthcare, food, and exports across different GCC jurisdictions.",
    href: "/exempt",
    actionLabel: "Check Status",
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    features: ["Category analysis", "Country-specific rules", "Healthcare & Education", "Export exemptions"]
  },
  {
    id: "readiness",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    title: "Kuwait/Qatar Readiness",
    subtitle: "Prepare for upcoming implementations",
    desc: "Get an advisory on the upcoming VAT implementations in Kuwait and Qatar. Learn how to prepare your IT systems, accounting practices, and legal structures before it goes live.",
    href: "/readiness",
    actionLabel: "Get Advisory",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    features: ["Implementation timelines", "System prep checklist", "Compliance roadmap", "Treaty analysis"]
  },
  {
    id: "deadline",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
    title: "Deadline Tracker",
    subtitle: "Never miss a filing date",
    desc: "Track VAT return deadlines for monthly or quarterly filing periods. Ask for the specific filing dates per country to avoid severe late filing penalties.",
    href: "/deadline",
    actionLabel: "Check Deadlines",
    color: "#dc2626",
    bg: "rgba(220,38,38,0.08)",
    features: ["Monthly/Quarterly tracking", "Country-specific dates", "Penalty avoidance", "Payment deadlines"]
  },
  {
    id: "news",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>,
    title: "Live News Feed",
    subtitle: "Real-time regulatory updates",
    desc: "Stay ahead of the curve with real-time news on GCC VAT regulations, rate changes, and new compliance mandates, powered by live web search.",
    href: "/news",
    actionLabel: "Read News",
    color: "#0891b2",
    bg: "rgba(8,145,178,0.08)",
    features: ["Real-time updates", "Rate changes", "Treaty announcements", "Official press releases"]
  }
];

const countries = [
  { flag: "🇦🇪", name: "UAE", rate: "5%", status: "ACTIVE", color: "#10b981" },
  { flag: "🇸🇦", name: "Saudi Arabia", rate: "15%", status: "ACTIVE", color: "#10b981" },
  { flag: "🇧🇭", name: "Bahrain", rate: "10%", status: "ACTIVE", color: "#10b981" },
  { flag: "🇴🇲", name: "Oman", rate: "5%", status: "ACTIVE", color: "#10b981" },
  { flag: "🇶🇦", name: "Qatar", rate: "Pending", status: "PENDING", color: "#8b5cf6" },
  { flag: "🇰🇼", name: "Kuwait", rate: "Pending", status: "PENDING", color: "#8b5cf6" },
];

const stats = [
  { value: "6", label: "GCC Countries", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> },
  { value: "10+", label: "Tax Tools", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> },
  { value: "AR/EN", label: "Bilingual", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> },
  { value: "Live", label: "Data Search", icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg> },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero-bg" style={{ minHeight: "100vh", paddingTop: "var(--nav-height)" }}>
        <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            {/* Hero Title */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(10px)",
              padding: "8px 20px",
              borderRadius: "50px",
              color: "white",
              fontWeight: 700,
              fontSize: "14px",
              marginBottom: "32px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              letterSpacing: "0.5px"
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              1st in Gulf to Complete All 6 GCC Countries
            </div>

            <h1 style={{
              fontSize: "clamp(42px, 7vw, 72px)",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.08,
              marginBottom: "24px",
              letterSpacing: "-1px",
            }}>
              Breathe Easy This Tax Season<br />
              We&apos;ll Sort the Numbers
            </h1>

            <p style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.7,
              marginBottom: "40px",
              maxWidth: "560px",
              margin: "0 auto 40px",
            }}>
              Precision accounting &amp; tax strategies tailored to boost your savings
            </p>

            {/* CTA Button */}
            <div className="hero-buttons" style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
              <Link href="/calculator" className="btn btn-primary btn-lg" style={{
                background: "linear-gradient(90deg, #fb923c, #ea580c)",
                boxShadow: "0 0 40px rgba(234,88,12,0.4)"
              }}>
                Get Your Free Consultation
              </Link>
            </div>

            {/* Hero Image */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <img 
                src="/hero-section-image.png" 
                alt="Taxora Robot and Floating Stats" 
                style={{ 
                  maxWidth: "100%", 
                  height: "auto", 
                  maxHeight: "500px",
                  objectFit: "contain"
                }} 
              />
            </div>
          </div>

          
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section style={{ background: "var(--primary)", padding: "32px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "24px" }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center", color: "white" }}>
                <div style={{ fontSize: "36px", marginBottom: "4px" }}>{s.icon}</div>
                <div style={{ fontSize: "28px", fontWeight: 900 }}>{s.value}</div>
                <div style={{ fontSize: "13px", opacity: 0.75, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "56px" }}>
            <div className="section-tag">Our Services</div>
            <h2 className="section-title">Everything You Need for VAT Compliance</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              From instant calculations to expert cross-border advice — our platform handles it all in Arabic and English.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {services.map((s, index) => (
              <div 
                key={s.id} 
                id={s.id} 
                className="card service-detail-card" 
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
                <div className="service-icon-wrapper" style={{ 
                  flexShrink: 0, 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "24px", 
                  background: s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: s.color
                }}>
                  <div style={{ transform: "scale(2.5)" }}>
                    {s.icon}
                  </div>
                </div>

                {/* Content Side */}
                <div style={{ flex: 1 }}>
                  <div style={{ color: s.color, fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                    {s.subtitle}
                  </div>
                  <h3 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-dark)", marginBottom: "16px" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "16px", color: "var(--text-mid)", lineHeight: 1.7, marginBottom: "24px" }}>
                    {s.desc}
                  </p>
                  
                  <div className="service-features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
                    {s.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-dark)", fontWeight: 500 }}>
                        <span style={{ color: s.color }}>✓</span> {f}
                      </div>
                    ))}
                  </div>

                  <Link href={s.href} className="btn" style={{ background: s.color, color: "white" }}>
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
              All BOBVAT services are available via our REST API. Integrate real-time VAT calculations and validation directly into your own ERP or POS system.
            </p>
            <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white btn-lg">
              View API Documentation
            </a>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "56px" }}>
            <div className="section-tag">How It Works</div>
            <h2 className="section-title">VAT Compliance in 3 Simple Steps</h2>
          </div>

          <div className="grid-3">
            {[
              {
                step: "01",
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>,
                title: "Select Your Country",
                desc: "Choose from UAE, Saudi Arabia, Bahrain, Oman, Qatar, or Kuwait. The platform applies the exact VAT rules for each.",
                color: "var(--primary)",
              },
              {
                step: "02",
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>,
                title: "Calculate or Ask",
                desc: "Enter your amounts, paste your invoice, or ask a question in English or Arabic. Get instant verified answers.",
                color: "var(--accent)",
              },
              {
                step: "03",
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
                title: "Get Instant Results",
                desc: "Receive accurate calculations with legal citations and actionable compliance recommendations.",
                color: "var(--success)",
              },
            ].map((step) => (
              <div key={step.step} style={{ textAlign: "center", padding: "32px 24px" }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: `${step.color}15`,
                  border: `3px solid ${step.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "32px",
                  margin: "0 auto 20px",
                  position: "relative",
                }}>
                  {step.icon}
                  <div style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: step.color,
                    color: "white",
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    fontSize: "11px",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {step.step}
                  </div>
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: 700, marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ color: "var(--text-light)", fontSize: "14px", lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GCC COUNTRIES ===== */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "56px" }}>
            <div className="section-tag">Coverage</div>
            <h2 className="section-title">All 6 GCC Countries Covered</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Real-time VAT data for every Gulf Cooperation Council nation.
            </p>
          </div>

          <div className="coverage-grid">
            {countries.map((c) => (
              <Link href="/countries" key={c.name} style={{ textDecoration: "none" }}>
                <div className="card" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div style={{ fontSize: "44px" }}>{c.flag}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "16px", color: "var(--text-dark)" }}>{c.name}</div>
                    <div style={{ fontSize: "24px", fontWeight: 900, color: c.status === "ACTIVE" ? "var(--primary)" : "var(--pending)" }}>
                      {c.rate}
                    </div>
                  </div>
                  <div>
                    <span className={`badge ${c.status === "ACTIVE" ? "badge-active" : "badge-pending"}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: "40px" }}>
            <Link href="/countries" className="btn btn-blue">
              View Detailed Country Data →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURES HIGHLIGHT ===== */}
      <section className="section hero-bg">
        <div className="container">
          <div className="features-grid">
            <div>
              <div className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderColor: "rgba(255,255,255,0.3)" }}>
                Why BOBVAT
              </div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "white", lineHeight: 1.15, margin: "16px 0 24px" }}>
                The Smartest VAT Platform for Gulf Businesses
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", lineHeight: 1.7, marginBottom: "36px" }}>
                Built specifically for Gulf SMEs. Our platform gives you accurate, legally cited answers — not just estimates.
              </p>

              {[
                "✅ Bilingual Arabic/English support",
                "✅ Live database for latest regulations",
                "✅ Legal citations with every calculation",
                "✅ Handles Kuwait & Qatar pending status",
                "✅ UAE 14% penalty rule (April 2026)",
                "✅ Bank-grade calculation accuracy",
              ].map((f) => (
                <div key={f} style={{ color: "white", fontSize: "15px", marginBottom: "12px", fontWeight: 500 }}>
                  {f}
                </div>
              ))}

              <div style={{ marginTop: "36px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link href="/calculator" className="btn btn-primary btn-lg">Start Calculating</Link>
                <Link href="/#services" className="btn btn-ghost btn-lg">All Services</Link>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>, title: "Live Search", desc: "Monitors databases in real-time to find the latest VAT rules and news." },
                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>, title: "Smart Analytics Engine", desc: "Provides accurate, context-aware insights in Arabic and English." },
                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>, title: "Legal Citations", desc: "Every answer includes the legal source so you can verify independently." },
                { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>, title: "Compliance Shield", desc: "Built-in validation prevents common VAT errors before they cost you money." },
              ].map((f) => (
                <div key={f.title} className="glass-card" style={{ display: "flex", gap: "16px" }}>
                  <div style={{ fontSize: "28px", flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "4px" }}>{f.title}</div>
                    <div style={{ fontSize: "13px", opacity: 0.8 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="section" style={{ background: "white" }}>
        <div className="container text-center">
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <h2 className="section-title">Ready to Simplify Your VAT?</h2>
            <p className="section-subtitle" style={{ margin: "0 auto 40px" }}>
              Join Gulf businesses that use BOBVAT for fast, accurate, and professional VAT compliance. Start for free today.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/calculator" className="btn btn-primary btn-lg">Calculate VAT</Link>
              <Link href="/ask" className="btn btn-blue btn-lg">Contact Expert</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
