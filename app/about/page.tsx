import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Bob-VAT | GCC Hackathon 2026",
  description: "Learn about Bob-VAT, an AI-powered VAT compliance assistant built for the GCC Hackathon 2026 using IBM Bob, Qwen AI, and Tavily Search.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="page-header" style={{ padding: "120px 0 80px" }}>
        <div className="container text-center">
          <div className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderColor: "rgba(255,255,255,0.3)", margin: "0 auto 16px" }}>
            🏗️ Built with AI
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", marginBottom: "20px" }}>About Bob-VAT</h1>
          <p style={{ fontSize: "18px", opacity: 0.85, maxWidth: "700px", margin: "0 auto" }}>
            The story behind the ultimate GCC VAT compliance platform.
          </p>
        </div>
      </div>

      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            
            <div style={{ marginBottom: "64px" }}>
              <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "var(--text-dark)" }}>
                The Problem We Solved
              </h2>
              <p style={{ fontSize: "18px", color: "var(--text-mid)", lineHeight: 1.8, marginBottom: "16px" }}>
                VAT compliance in the GCC is complex. With 6 different countries at various stages of implementation (from established systems like the UAE to pending rollouts in Qatar and Kuwait), keeping up with the regulations is a massive headache for businesses.
              </p>
              <p style={{ fontSize: "18px", color: "var(--text-mid)", lineHeight: 1.8 }}>
                Small and Medium Enterprises (SMEs) often cannot afford expensive tax consultants, leading to calculation errors, invalid invoices, and severe penalties (like the UAE's new 14% penalty rate taking effect in 2026).
              </p>
            </div>

            <div className="card" style={{ marginBottom: "64px", background: "linear-gradient(135deg, #f0f7ff 0%, #e8f2ff 100%)", border: "1px solid rgba(37,99,235,0.2)" }}>
              <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "20px", color: "var(--primary-dark)" }}>
                The Solution: Bob-VAT
              </h2>
              <p style={{ fontSize: "16px", color: "var(--text-dark)", lineHeight: 1.7, marginBottom: "24px" }}>
                Bob-VAT is an AI-powered, bilingual (Arabic & English) compliance assistant that acts as a virtual tax consultant. It doesn't just calculate numbers; it understands the law. By combining advanced Large Language Models with real-time web search capabilities, Bob-VAT provides accurate, legally-cited guidance for any VAT scenario.
              </p>
              
              <div className="grid-2">
                <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>🤖</div>
                  <h4 style={{ fontWeight: 700, marginBottom: "4px" }}>Qwen-Plus LLM</h4>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>Powers our bilingual reasoning, invoice parsing, and natural language understanding.</p>
                </div>
                <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>🔍</div>
                  <h4 style={{ fontWeight: 700, marginBottom: "4px" }}>Tavily Search</h4>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>Provides real-time access to the latest tax authority updates, news, and rate changes.</p>
                </div>
                <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚡</div>
                  <h4 style={{ fontWeight: 700, marginBottom: "4px" }}>FastAPI Backend</h4>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>A robust, async Python backend managing data validation and service orchestration.</p>
                </div>
                <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚛️</div>
                  <h4 style={{ fontWeight: 700, marginBottom: "4px" }}>Next.js Frontend</h4>
                  <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>A stunning, responsive user interface inspired by premium financial tools.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "24px", color: "var(--text-dark)" }}>
                Built with IBM Bob
              </h2>
              <p style={{ fontSize: "18px", color: "var(--text-mid)", lineHeight: 1.8, marginBottom: "24px" }}>
                The core of this application—including the complex backend logic, API integrations, and frontend structure—was rapidly prototyped and generated using <strong>IBM Bob</strong>, an advanced AI development assistant.
              </p>
              
              <div style={{ background: "#f8fafc", padding: "32px", borderRadius: "16px", border: "1px solid var(--border)" }}>
                <h4 style={{ fontWeight: 700, fontSize: "18px", marginBottom: "16px" }}>What IBM Bob did:</h4>
                <ul style={{ paddingLeft: "20px", color: "var(--text-mid)", lineHeight: 1.8 }}>
                  <li style={{ marginBottom: "8px" }}>Generated the complete FastAPI architecture with Pydantic schemas.</li>
                  <li style={{ marginBottom: "8px" }}>Implemented the Qwen and Tavily service integrations.</li>
                  <li style={{ marginBottom: "8px" }}>Created the comprehensive Next.js frontend with modern CSS styling.</li>
                  <li>Ensured seamless communication between the client and server.</li>
                </ul>
                
                <div style={{ marginTop: "24px", textAlign: "center" }}>
                  <a href="http://localhost:8000/api/bob-demo" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white" style={{ background: "var(--text-dark)", color: "white" }}>
                    View Bob Generated Specs (API)
                  </a>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "64px", textAlign: "center" }}>
              <Link href="/" className="btn btn-primary btn-lg">
                Return Home
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
