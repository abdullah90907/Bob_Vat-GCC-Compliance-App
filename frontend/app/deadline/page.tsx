"use client";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://anique-1-bobvat-backend.hf.space";

export default function DeadlinePage() {
  const [country, setCountry] = useState("UAE");
  const [period, setPeriod] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const checkDeadline = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/deadline`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          period,
          country,
          language: "en"
        }),
      });

      if (!res.ok) throw new Error("Failed to get deadline info");
      
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
            📅 Compliance Tool
          </div>
          <h1>Deadline Tracker</h1>
          <p>Never miss a filing date. Verify official VAT return deadlines per country to avoid penalties.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="card" style={{ padding: "40px" }}>
            <form onSubmit={checkDeadline} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
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
                  <label className="form-label">Filing Period</label>
                  <select className="form-select" value={period} onChange={e => setPeriod(e.target.value)}>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? "Fetching Deadlines..." : "Check Deadlines"}
              </button>
            </form>

            {error && (
              <div style={{ marginTop: "24px", padding: "16px", background: "rgba(239,68,68,0.1)", color: "#ef4444", borderRadius: "8px" }}>
                {error}
              </div>
            )}

            {result && (
              <div style={{ marginTop: "32px", padding: "32px", background: "white", borderRadius: "16px", borderLeft: "4px solid #dc2626", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "20px", color: "#dc2626", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  {result.deadline_rule}
                </h3>
                <div className="markdown-content" style={{ marginBottom: "24px" }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result.explanation}
                  </ReactMarkdown>
                </div>
                
                <div style={{ padding: "16px", background: "rgba(239,68,68,0.05)", borderLeft: "4px solid #ef4444", borderRadius: "0 8px 8px 0", marginBottom: "24px" }}>
                  <span style={{ fontWeight: 700, color: "#ef4444", display: "block", marginBottom: "4px" }}>⚠️ Important Warning</span>
                  <span style={{ color: "var(--text-dark)", fontSize: "14px" }}>{result.penalty_warning}</span>
                </div>

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
