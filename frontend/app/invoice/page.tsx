"use client";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://anique-1-bobvat-backend.hf.space";

export default function InvoiceValidatorPage() {
  const [country, setCountry] = useState("UAE");
  const [invoiceText, setInvoiceText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const renderBoldText = (text: string) => {
    if (!text) return null;
    const parts = text.split('**');
    return parts.map((part, index) => 
      index % 2 === 1 ? <strong key={index} style={{ color: "var(--text-dark)" }}>{part}</strong> : <span key={index}>{part}</span>
    );
  };

  const validateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (invoiceText.length < 10) {
      setError("Please paste a complete invoice text.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/validate-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoice_text: invoiceText,
          country,
          language: "en"
        }),
      });

      if (!res.ok) throw new Error("Failed to validate invoice");
      
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
            🧾 Compliance Tool
          </div>
          <h1>Invoice Validator</h1>
          <p>Paste the text of any invoice to check if VAT was applied correctly and all legal requirements are met.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="card" style={{ padding: "40px" }}>
            <form onSubmit={validateInvoice} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              <div>
                <label className="form-label">Country Issued</label>
                <select className="form-select" value={country} onChange={e => setCountry(e.target.value)}>
                  <option value="UAE">🇦🇪 United Arab Emirates</option>
                  <option value="KSA">🇸🇦 Saudi Arabia</option>
                  <option value="BAHRAIN">🇧🇭 Bahrain</option>
                  <option value="OMAN">🇴🇲 Oman</option>
                </select>
              </div>

              <div>
                <label className="form-label">Invoice Text</label>
                <textarea 
                  className="form-input" 
                  style={{ minHeight: "200px", resize: "vertical" }}
                  placeholder="Paste the raw text of the invoice here..." 
                  value={invoiceText} 
                  onChange={e => setInvoiceText(e.target.value)} 
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading || !invoiceText}>
                {loading ? "Analyzing Invoice..." : "Validate Invoice"}
              </button>
            </form>

            {error && (
              <div style={{ marginTop: "24px", padding: "16px", background: "rgba(239,68,68,0.1)", color: "#ef4444", borderRadius: "8px" }}>
                {error}
              </div>
            )}

            {result && (
              <div style={{ marginTop: "32px" }}>
                <div style={{ padding: "24px", background: result.is_valid ? "rgba(16,185,129,0.05)" : "rgba(239,68,68,0.05)", border: `2px solid ${result.is_valid ? "#10b981" : "#ef4444"}`, borderRadius: "16px", marginBottom: "24px" }}>
                  <h3 style={{ fontSize: "24px", color: result.is_valid ? "#10b981" : "#ef4444", marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
                    {result.is_valid ? "✅ Invoice is Compliant" : "⚠️ Compliance Issues Found"}
                  </h3>
                  <div style={{ color: "var(--text-mid)", lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                    {renderBoldText(result.summary)}
                  </div>
                </div>

                {result.issues && result.issues.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <h4 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--text-dark)" }}>Identified Issues</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {result.issues.map((issue: any, i: number) => (
                        <div key={i} style={{ padding: "16px", background: "white", borderRadius: "8px", borderLeft: `4px solid ${issue.severity === 'error' ? '#ef4444' : '#f59e0b'}` }}>
                          <span style={{ fontWeight: 700, color: "var(--text-dark)", display: "block", marginBottom: "4px" }}>{renderBoldText(issue.field)}</span>
                          <span style={{ color: "var(--text-mid)", fontSize: "14px" }}>{renderBoldText(issue.issue)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.corrections && result.corrections.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: "18px", marginBottom: "16px", color: "var(--text-dark)" }}>Suggested Corrections</h4>
                    <ul style={{ paddingLeft: "20px", color: "var(--text-mid)", lineHeight: 1.7 }}>
                      {result.corrections.map((corr: string, i: number) => (
                        <li key={i} style={{ marginBottom: "8px" }}>{renderBoldText(corr)}</li>
                      ))}
                    </ul>
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
