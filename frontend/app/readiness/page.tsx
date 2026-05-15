"use client";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://anique-1-bobvat-backend.hf.space";

export default function ReadinessPage() {
  const [country, setCountry] = useState("QATAR");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const getAdvisory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/readiness`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country,
          language: "en"
        }),
      });

      if (!res.ok) throw new Error("Failed to get advisory");
      
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
            ⏳ Strategic Tool
          </div>
          <h1>Kuwait/Qatar Readiness Advisory</h1>
          <p>Get a comprehensive guide on upcoming VAT implementations to prepare your business systems before they go live.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="card" style={{ padding: "40px" }}>
            <form onSubmit={getAdvisory} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              <div>
                <label className="form-label">Select Pending Country</label>
                <div style={{ display: "flex", gap: "16px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "16px", background: country === "QATAR" ? "rgba(139,92,246,0.1)" : "white", border: `2px solid ${country === "QATAR" ? "#8b5cf6" : "var(--border)"}`, borderRadius: "12px", flex: 1 }}>
                    <input type="radio" name="country" value="QATAR" checked={country === "QATAR"} onChange={() => setCountry("QATAR")} />
                    <span style={{ fontSize: "18px" }}>🇶🇦 Qatar</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "16px", background: country === "KUWAIT" ? "rgba(139,92,246,0.1)" : "white", border: `2px solid ${country === "KUWAIT" ? "#8b5cf6" : "var(--border)"}`, borderRadius: "12px", flex: 1 }}>
                    <input type="radio" name="country" value="KUWAIT" checked={country === "KUWAIT"} onChange={() => setCountry("KUWAIT")} />
                    <span style={{ fontSize: "18px" }}>🇰🇼 Kuwait</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? "Generating Report..." : "Get Implementation Advisory"}
              </button>
            </form>

            {error && (
              <div style={{ marginTop: "24px", padding: "16px", background: "rgba(239,68,68,0.1)", color: "#ef4444", borderRadius: "8px" }}>
                {error}
              </div>
            )}

            {result && (
              <div style={{ marginTop: "32px", padding: "32px", background: "white", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "20px", color: "#7c3aed", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  {result.status_summary}
                </h3>
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result.advisory}
                  </ReactMarkdown>
                </div>
                
                {result.checklist && result.checklist.length > 0 && (
                  <div style={{ padding: "20px", background: "var(--off-white)", borderRadius: "12px", marginBottom: "24px" }}>
                    <h4 style={{ fontSize: "16px", color: "var(--text-dark)", marginBottom: "12px" }}>Preparation Checklist:</h4>
                    <ul style={{ paddingLeft: "20px", color: "var(--text-mid)", lineHeight: 1.6, margin: 0 }}>
                      {result.checklist.map((item: string, i: number) => (
                        <li key={i} style={{ marginBottom: "8px" }}>
                          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: ({node, ...props}) => <span {...props} /> }}>
                            {item}
                          </ReactMarkdown>
                        </li>
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
