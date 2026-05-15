"use client";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://anique-1-bobvat-backend.hf.space";

export default function ExemptCheckerPage() {
  const [country, setCountry] = useState("UAE");
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const checkStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/exempt-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          country,
          language: "en"
        }),
      });

      if (!res.ok) throw new Error("Failed to check status");
      
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
            🛡️ Compliance Tool
          </div>
          <h1>Exempt & Zero-Rate Checker</h1>
          <p>Verify if your product or service is tax-free under current GCC jurisdictions.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="card" style={{ padding: "40px" }}>
            <form onSubmit={checkStatus} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
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
                  <label className="form-label">Product / Service / Sector</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Healthcare, Basic Food, Exports..." 
                    value={product} 
                    onChange={e => setProduct(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading || !product}>
                {loading ? "Checking Tax Law..." : "Verify Status"}
              </button>
            </form>

            {error && (
              <div style={{ marginTop: "24px", padding: "16px", background: "rgba(239,68,68,0.1)", color: "#ef4444", borderRadius: "8px" }}>
                {error}
              </div>
            )}

            {result && (
              <div style={{ marginTop: "32px", padding: "32px", background: "white", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontSize: "20px", color: "var(--primary-dark)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Status: {result.status}
                </h3>
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {result.explanation}
                  </ReactMarkdown>
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
