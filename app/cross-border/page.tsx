"use client";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function CrossBorderPage() {
  const [fromCountry, setFromCountry] = useState("UAE");
  const [toCountry, setToCountry] = useState("KSA");
  const [transactionType, setTransactionType] = useState("B2B");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const getAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fromCountry === toCountry) {
      setError("Origin and Destination countries must be different.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/cross-border`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_country: fromCountry,
          to_country: toCountry,
          transaction_type: transactionType,
          language: "en"
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch advice");
      
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderColor: "rgba(255,255,255,0.3)", margin: "0 auto 16px" }}>
            🌍 Compliance Tool
          </div>
          <h1>Cross-Border Advisor</h1>
          <p>Navigate complex GCC intra-trade rules, including zero-rating and the reverse charge mechanism.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="card" style={{ padding: "40px" }}>
            <form onSubmit={getAdvice} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              <div className="grid-2">
                <div>
                  <label className="form-label">Origin Country (From)</label>
                  <select className="form-select" value={fromCountry} onChange={e => setFromCountry(e.target.value)}>
                    <option value="UAE">🇦🇪 United Arab Emirates</option>
                    <option value="KSA">🇸🇦 Saudi Arabia</option>
                    <option value="BAHRAIN">🇧🇭 Bahrain</option>
                    <option value="OMAN">🇴🇲 Oman</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Destination Country (To)</label>
                  <select className="form-select" value={toCountry} onChange={e => setToCountry(e.target.value)}>
                    <option value="UAE">🇦🇪 United Arab Emirates</option>
                    <option value="KSA">🇸🇦 Saudi Arabia</option>
                    <option value="BAHRAIN">🇧🇭 Bahrain</option>
                    <option value="OMAN">🇴🇲 Oman</option>
                    <option value="QATAR">🇶🇦 Qatar (Pending)</option>
                    <option value="KUWAIT">🇰🇼 Kuwait (Pending)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">Transaction Type</label>
                <select className="form-select" value={transactionType} onChange={e => setTransactionType(e.target.value)}>
                  <option value="B2B">Business to Business (B2B)</option>
                  <option value="B2C">Business to Consumer (B2C)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? "Analyzing Rules..." : "Get VAT Treatment Advice"}
              </button>
            </form>

            {error && (
              <div style={{ marginTop: "24px", padding: "16px", background: "rgba(239,68,68,0.1)", color: "#ef4444", borderRadius: "8px" }}>
                {error}
              </div>
            )}

            {result && (
              <div style={{ marginTop: "32px", padding: "32px", background: "white", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ display: "inline-block", padding: "6px 16px", background: result.is_zero_rated ? "rgba(16,185,129,0.1)" : "rgba(37,99,235,0.1)", color: result.is_zero_rated ? "#10b981" : "#2563eb", borderRadius: "50px", fontSize: "14px", fontWeight: 700, marginBottom: "16px" }}>
                  {result.is_zero_rated ? "🟢 Zero-Rated (0%)" : "🔵 Standard VAT Applies / Reverse Charge"}
                </div>
                
                <h3 style={{ fontSize: "22px", color: "var(--text-dark)", marginBottom: "16px" }}>
                  {result.vat_treatment}
                </h3>
                
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result.explanation}
                  </ReactMarkdown>
                </div>

                {result.recommendations && result.recommendations.length > 0 && (
                  <div style={{ padding: "20px", background: "var(--off-white)", borderRadius: "12px", marginBottom: "24px" }}>
                    <h4 style={{ fontSize: "16px", color: "var(--text-dark)", marginBottom: "12px" }}>Recommended Actions:</h4>
                    <ul style={{ paddingLeft: "20px", color: "var(--text-mid)", lineHeight: 1.6, margin: 0 }}>
                      {result.recommendations.map((rec: string, i: number) => (
                        <li key={i} style={{ marginBottom: "8px" }}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {result.sources && result.sources.length > 0 && (
                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600, marginBottom: "8px" }}>SOURCES:</div>
                    {result.sources.map((src: any, i: number) => (
                      <div key={i} style={{ fontSize: "12px", marginBottom: "4px" }}>
                        <a href={src.url} target="_blank" rel="noreferrer" style={{ color: "var(--primary)", textDecoration: "none" }}>🔗 {src.title}</a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
