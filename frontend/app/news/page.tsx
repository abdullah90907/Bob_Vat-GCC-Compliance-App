"use client";
import { useState, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://anique-1-bobvat-backend.hf.space";

interface NewsArticle {
  title: string;
  summary: string;
  source: string;
  url?: string;
  date?: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/news`);
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setArticles(data.articles);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Connection error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderColor: "rgba(255,255,255,0.3)", margin: "0 auto 16px" }}>
            📰 Live Updates
          </div>
          <h1>Latest GCC VAT News</h1>
          <p>Real-time news updates powered by Tavily Search.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          
          {loading ? (
            <div className="text-center py-20" style={{ padding: "80px 0" }}>
              <span className="loading-spinner" style={{ borderColor: "rgba(37,99,235,0.3)", borderTopColor: "var(--primary)", width: "40px", height: "40px", borderWidth: "4px" }} />
              <p style={{ marginTop: "16px", color: "var(--text-mid)", fontWeight: 500 }}>Searching the web for latest news...</p>
            </div>
          ) : error ? (
            <div className="card text-center" style={{ padding: "64px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
              <h3 style={{ color: "var(--danger)", marginBottom: "8px" }}>Failed to Load News</h3>
              <p style={{ color: "var(--text-muted)", maxWidth: "500px", margin: "0 auto" }}>
                {error}. Make sure the FastAPI backend is running on port 8000 and the Tavily API key is configured.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "900px", margin: "0 auto" }}>
              {articles.length === 0 ? (
                <div className="card text-center">No news articles found.</div>
              ) : (
                articles.map((article, i) => (
                  <a 
                    key={i} 
                    href={article.url || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit", display: "block" }}
                  >
                    <div className="news-card">
                      <div className="news-card-body">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                          <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "1px" }}>
                            {article.source}
                          </span>
                          {article.date && (
                            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                              {article.date}
                            </span>
                          )}
                        </div>
                        
                        <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-dark)", marginBottom: "12px", lineHeight: 1.4 }}>
                          {article.title}
                        </h2>
                        
                        <p style={{ color: "var(--text-mid)", lineHeight: 1.6, fontSize: "15px", margin: 0 }}>
                          {article.summary}
                        </p>
                        
                        <div style={{ marginTop: "16px", color: "var(--primary)", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                          Read Full Article →
                        </div>
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
