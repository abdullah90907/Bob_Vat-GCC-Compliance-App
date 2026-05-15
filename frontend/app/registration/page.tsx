"use client";
import { useState } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://anique-1-bobvat-backend.hf.space";

export default function RegistrationPage() {
  const [country, setCountry] = useState("UAE");
  const [revenue, setRevenue] = useState("");
  const [currency, setCurrency] = useState("AED");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  // Helper to parse simple **bold** markdown
  const renderBoldText = (text: string) => {
    if (!text) return null;
    const parts = text.split('**');
    return parts.map((part, index) => 
      index % 2 === 1 ? <strong key={index} style={{ color: "var(--text-dark)" }}>{part}</strong> : <span key={index}>{part}</span>
    );
  };

  const checkRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/check-registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          annual_revenue: parseFloat(revenue),
          currency,
          country,
          business_type: "general",
          language: "en"
        }),
      });

      if (!res.ok) throw new Error("Failed to check registration status");
      
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
            📋 Compliance Tool
          </div>
          <h1>Registration Checker</h1>
          <p>Find out instantly if VAT registration is mandatory for your business based on current GCC thresholds.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="card" style={{ padding: "40px" }}>
            <form onSubmit={checkRegistration} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              <div className="grid-2">
                <div>
                  <label className="form-label">Country</label>
                  <select className="form-select" value={country} onChange={e => {
                    setCountry(e.target.value);
                    setCurrency(e.target.value === "UAE" ? "AED" : e.target.value === "KSA" ? "SAR" : e.target.value === "BAHRAIN" ? "BHD" : e.target.value === "OMAN" ? "OMR" : e.target.value === "QATAR" ? "QAR" : "KWD");
                  }}>
                    <option value="UAE">🇦🇪 United Arab Emirates</option>
                    <option value="KSA">🇸🇦 Saudi Arabia</option>
                    <option value="BAHRAIN">🇧🇭 Bahrain</option>
                    <option value="OMAN">🇴🇲 Oman</option>
                    <option value="QATAR">🇶🇦 Qatar</option>
                    <option value="KUWAIT">🇰🇼 Kuwait</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Currency</label>
                  <input type="text" className="form-input" value={currency} readOnly style={{ background: "#f3f4f6" }} />
                </div>
              </div>

              <div>
                <label className="form-label">Annual Revenue (12 months rolling)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="e.g. 500000" 
                  value={revenue} 
                  onChange={e => setRevenue(e.target.value)} 
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading || !revenue}>
                {loading ? "Checking..." : "Check Registration Status"}
              </button>
            </form>

            {error && (
              <div style={{ marginTop: "24px", padding: "16px", background: "rgba(239,68,68,0.1)", color: "#ef4444", borderRadius: "8px" }}>
                {error}
              </div>
            )}

            {result && (
              <div style={{ marginTop: "32px", padding: "32px", background: result.must_register ? "rgba(239,68,68,0.05)" : "rgba(16,185,129,0.05)", border: `2px solid ${result.must_register ? "#ef4444" : "#10b981"}`, borderRadius: "16px" }}>
                <h3 style={{ fontSize: "24px", color: result.must_register ? "#ef4444" : "#10b981", marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
                  {result.must_register ? "⚠️ Registration Mandatory" : "✅ Registration Not Mandatory"}
                </h3>
                
                <p style={{ fontSize: "16px", color: "var(--text-mid)", lineHeight: 1.7, marginBottom: "24px", whiteSpace: "pre-wrap" }}>
                  {renderBoldText(result.explanation)}
                </p>

                {result.threshold && (
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "16px", background: "white", borderRadius: "8px", marginBottom: "16px" }}>
                    <span style={{ fontWeight: 600 }}>Threshold Limit:</span>
                    <span style={{ fontWeight: 700 }}>{result.threshold.toLocaleString()} {currency}</span>
                  </div>
                )}

                {result.revenue_gap !== null && (
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "16px", background: "white", borderRadius: "8px" }}>
                    <span style={{ fontWeight: 600 }}>Gap to Threshold:</span>
                    <span style={{ fontWeight: 700, color: result.revenue_gap > 0 ? "#ef4444" : "#10b981" }}>
                      {result.revenue_gap > 0 ? "+" : ""}{result.revenue_gap.toLocaleString()} {currency}
                    </span>
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
