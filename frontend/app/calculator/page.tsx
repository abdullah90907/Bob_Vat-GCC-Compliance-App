"use client";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://anique-1-bobvat-backend.hf.space";

const GCC_COUNTRIES = [
  { code: "UAE", name: "🇦🇪 UAE (5%)", currency: "AED" },
  { code: "KSA", name: "🇸🇦 Saudi Arabia (15%)", currency: "SAR" },
  { code: "BAHRAIN", name: "🇧🇭 Bahrain (10%)", currency: "BHD" },
  { code: "OMAN", name: "🇴🇲 Oman (5%)", currency: "OMR" },
  { code: "QATAR", name: "🇶🇦 Qatar (Pending)", currency: "QAR" },
  { code: "KUWAIT", name: "🇰🇼 Kuwait (Pending)", currency: "KWD" },
];

const PRODUCT_TYPES = [
  { value: "standard", label: "Standard" },
  { value: "exempt", label: "Exempt" },
  { value: "zero-rated", label: "Zero-Rated" },
  { value: "food", label: "Food & Beverages" },
  { value: "medical", label: "Medical/Healthcare" },
  { value: "education", label: "Education" },
];

interface CalcResult {
  net: number;
  vat_amount: number;
  gross: number;
  rate_applied: number;
  citation: string;
  confidence: number;
  is_pending_country: boolean;
  country_status: string;
  notes?: string;
}

export default function CalculatorPage() {
  const [form, setForm] = useState({
    amount: "",
    country: "UAE",
    product_type: "standard",
    language: "en",
  });
  const [result, setResult] = useState<CalcResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(form.amount),
          country: form.country,
          product_type: form.product_type,
          language: form.language,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Calculation failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to connect to API. Make sure the backend is running on port 8000.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const selectedCountry = GCC_COUNTRIES.find((c) => c.code === form.country);

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <div className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderColor: "rgba(255,255,255,0.3)", margin: "0 auto 16px" }}>
            🧮 VAT Calculator
          </div>
          <h1>GCC VAT Calculator</h1>
          <p>Instant, AI-powered VAT calculations with legal citations for all 6 GCC countries.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <div className="grid-2" style={{ gap: "40px", alignItems: "start" }}>

            {/* Form Card */}
            <div className="card">
              <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "24px", color: "var(--text-dark)" }}>
                Calculate VAT
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Amount *</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Enter amount (e.g. 1000)"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Country</label>
                  <select
                    className="form-select"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                  >
                    {GCC_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Product / Service Type</label>
                  <select
                    className="form-select"
                    value={form.product_type}
                    onChange={(e) => setForm({ ...form, product_type: e.target.value })}
                  >
                    {PRODUCT_TYPES.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Response Language</label>
                  <select
                    className="form-select"
                    value={form.language}
                    onChange={(e) => setForm({ ...form, language: e.target.value })}
                  >
                    <option value="en">English</option>
                    <option value="ar">العربية (Arabic)</option>
                  </select>
                </div>

                {error && (
                  <div style={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "12px",
                    padding: "14px 18px",
                    color: "var(--danger)",
                    fontSize: "14px",
                    marginBottom: "20px",
                  }}>
                    ⚠️ {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={loading}
                  style={{ justifyContent: "center", padding: "16px" }}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner" />
                      Calculating...
                    </>
                  ) : (
                    "🧮 Calculate VAT"
                  )}
                </button>
              </form>
            </div>

            {/* Result */}
            <div>
              {result ? (
                <div className="card" style={{ border: "2px solid rgba(37,99,235,0.15)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: 700 }}>Calculation Result</h2>
                    <span className="badge badge-active">
                      ✓ {result.confidence}% Confidence
                    </span>
                  </div>

                  {result.is_pending_country && (
                    <div style={{
                      background: "rgba(139,92,246,0.08)",
                      border: "1px solid rgba(139,92,246,0.2)",
                      borderRadius: "10px",
                      padding: "12px 16px",
                      color: "var(--pending)",
                      fontSize: "14px",
                      marginBottom: "20px",
                    }}>
                      ⚠️ This country has pending VAT status. Results are advisory only.
                    </div>
                  )}

                  <div className="result-card">
                    <div className="result-row">
                      <span className="result-label">Net Amount ({selectedCountry?.currency})</span>
                      <span className="result-value">{result.net.toFixed(2)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">VAT Rate Applied</span>
                      <span className="result-value">{result.rate_applied}%</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">VAT Amount ({selectedCountry?.currency})</span>
                      <span className="result-value" style={{ color: "var(--accent)" }}>{result.vat_amount.toFixed(2)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label" style={{ fontWeight: 700 }}>Total Gross ({selectedCountry?.currency})</span>
                      <span className="result-value large">{result.gross.toFixed(2)}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: "20px", padding: "16px", background: "#f8faff", borderRadius: "12px", border: "1px solid rgba(37,99,235,0.1)" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                      📜 Legal Citation
                    </div>
                    <p style={{ fontSize: "13px", color: "var(--text-mid)", lineHeight: 1.6 }}>{result.citation}</p>
                  </div>

                  {result.notes && (
                    <div style={{ marginTop: "12px", padding: "12px 16px", background: "#fff7ed", borderRadius: "10px", border: "1px solid rgba(249,115,22,0.15)" }}>
                      <p style={{ fontSize: "13px", color: "var(--accent)", lineHeight: 1.5 }}>ℹ️ {result.notes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="card" style={{ textAlign: "center", padding: "60px 40px" }}>
                  <div style={{ fontSize: "64px", marginBottom: "16px" }}>🧮</div>
                  <h3 style={{ color: "var(--text-mid)", fontWeight: 600, marginBottom: "8px" }}>
                    Ready to Calculate
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                    Fill in the form and hit Calculate. Bob will fetch live VAT rates and compute your amounts instantly.
                  </p>
                </div>
              )}

              {/* Quick Info */}
              <div className="card" style={{ marginTop: "24px" }}>
                <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>🌍 GCC VAT Rates Quick Reference</h4>
                {GCC_COUNTRIES.map((c) => (
                  <div key={c.code} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: "1px solid var(--border)",
                    fontSize: "14px",
                  }}>
                    <span style={{ color: "var(--text-mid)" }}>{c.name}</span>
                    <span style={{ color: "var(--text-light)", fontWeight: 500 }}>{c.currency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
