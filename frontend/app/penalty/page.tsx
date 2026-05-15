"use client";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://anique-1-bobvat-backend.hf.space";

export default function PenaltyPage() {
  const [country, setCountry] = useState("UAE");
  const [vatOwed, setVatOwed] = useState("");
  const [daysLate, setDaysLate] = useState("");
  const [offenseType, setOffenseType] = useState("late_payment");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const calculatePenalty = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/penalty`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country,
          vat_owed: parseFloat(vatOwed),
          days_late: parseInt(daysLate, 10),
          offense_type: offenseType,
          language: "en"
        }),
      });

      if (!res.ok) throw new Error("Failed to calculate penalty");
      
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
            ⚠️ Compliance Tool
          </div>
          <h1>Penalty Calculator</h1>
          <p>Estimate potential fines for late VAT filings or payments based on the latest regional tax laws.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="card" style={{ padding: "40px" }}>
            <form onSubmit={calculatePenalty} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              <div className="grid-2">
                <div>
                  <label className="form-label">Country</label>
                  <select className="form-select" value={country} onChange={e => setCountry(e.target.value)}>
                    <option value="UAE">🇦🇪 United Arab Emirates</option>
                    <option value="KSA">🇸🇦 Saudi Arabia</option>
                    <option value="BAHRAIN">🇧🇭 Bahrain</option>
                    <option value="OMAN">🇴🇲 Oman</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Offense Type</label>
                  <select className="form-select" value={offenseType} onChange={e => setOffenseType(e.target.value)}>
                    <option value="late_payment">Late Payment</option>
                    <option value="late_filing">Late Return Filing</option>
                  </select>
                </div>
              </div>

              <div className="grid-2">
                <div>
                  <label className="form-label">Original VAT Owed</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="e.g. 5000" 
                    value={vatOwed} 
                    onChange={e => setVatOwed(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label className="form-label">Days Late</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="e.g. 15" 
                    value={daysLate} 
                    onChange={e => setDaysLate(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading || !vatOwed || !daysLate}>
                {loading ? "Calculating..." : "Estimate Penalty"}
              </button>
            </form>

            {error && (
              <div style={{ marginTop: "24px", padding: "16px", background: "rgba(239,68,68,0.1)", color: "#ef4444", borderRadius: "8px" }}>
                {error}
              </div>
            )}

            {result && (
              <div style={{ marginTop: "32px", padding: "32px", background: "white", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                  <div style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                    Estimated Penalty Amount
                  </div>
                  <div style={{ fontSize: "48px", fontWeight: 800, color: "#ef4444", lineHeight: 1 }}>
                    {result.penalty_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                
                <div style={{ padding: "20px", background: "var(--off-white)", borderRadius: "12px", marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "16px", color: "var(--text-dark)", marginBottom: "12px" }}>Calculation Breakdown</h4>
                  <div className="markdown-content" style={{ margin: 0 }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {result.calculation_breakdown}
                    </ReactMarkdown>
                  </div>
                </div>

                <div style={{ padding: "20px", background: "rgba(37,99,235,0.05)", borderLeft: "4px solid #2563eb", borderRadius: "0 12px 12px 0", marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "16px", color: "#1d4ed8", marginBottom: "8px" }}>Legal Basis</h4>
                  <div className="markdown-content" style={{ margin: 0, fontSize: "14px" }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {result.legal_basis}
                    </ReactMarkdown>
                  </div>
                </div>

                {result.recommendations && result.recommendations.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: "16px", color: "var(--text-dark)", marginBottom: "12px" }}>Recommendations</h4>
                    <ul style={{ paddingLeft: "20px", color: "var(--text-mid)", lineHeight: 1.6, margin: 0 }}>
                      {result.recommendations.map((rec: string, i: number) => (
                        <li key={i} style={{ marginBottom: "8px" }}>
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: ({node, ...props}) => <span {...props} /> }}>
                            {rec}
                          </ReactMarkdown>
                        </li>
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
