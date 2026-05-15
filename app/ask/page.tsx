"use client";
import { useState, useRef, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Message {
  role: "bot" | "user";
  content: string;
  sources?: { title: string; url?: string; snippet?: string }[];
  confidence?: number;
  live_search?: boolean;
}

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "مرحباً! I'm Bob, your GCC VAT compliance assistant. Ask me anything about VAT in Arabic or English — I'll search the latest rules and give you a cited answer. 🤖\n\nTry asking: 'What is the VAT rate in UAE?' or 'هل أحتاج للتسجيل في ضريبة القيمة المضافة؟'",
    },
  ]);
  const [input, setInput] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const q = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          country: country || undefined,
          language: undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "API error");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: data.answer,
          sources: data.sources,
          confidence: data.confidence,
          live_search: data.live_search,
        },
      ]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Connection error";
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: `❌ Error: ${msg}. Please make sure the backend is running on port 8000.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "What is the VAT rate in Saudi Arabia?",
    "هل تخضع الصادرات لضريبة القيمة المضافة؟",
    "When does VAT registration become mandatory in UAE?",
    "What are zero-rated goods in Bahrain?",
    "Latest VAT news in GCC 2026",
  ];

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <div className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderColor: "rgba(255,255,255,0.3)", margin: "0 auto 16px" }}>
            🤖 AI Assistant
          </div>
          <h1>Ask Bob Anything</h1>
          <p>Bilingual VAT Q&A powered by Qwen AI + Live Tavily Search. Get cited, accurate answers instantly.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <div className="grid-2" style={{ gap: "32px", alignItems: "start" }}>

            {/* Chat Interface */}
            <div style={{ gridColumn: "1 / -1", maxWidth: "800px", margin: "0 auto", width: "100%" }}>

              {/* Country Filter */}
              <div className="card" style={{ marginBottom: "20px", padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                  <label style={{ fontWeight: 600, fontSize: "14px", color: "var(--text-mid)" }}>Country context:</label>
                  <select
                    className="form-select"
                    style={{ maxWidth: "240px", padding: "10px 14px" }}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">All GCC Countries</option>
                    <option value="UAE">🇦🇪 UAE</option>
                    <option value="KSA">🇸🇦 Saudi Arabia</option>
                    <option value="BAHRAIN">🇧🇭 Bahrain</option>
                    <option value="OMAN">🇴🇲 Oman</option>
                    <option value="QATAR">🇶🇦 Qatar</option>
                    <option value="KUWAIT">🇰🇼 Kuwait</option>
                  </select>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Bob will focus on the selected country</span>
                </div>
              </div>

              {/* Chat Window */}
              <div className="chat-container">
                <div className="chat-header">
                  <div className="chat-avatar">🤖</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "16px" }}>Bob — VAT AI Assistant</div>
                    <div style={{ fontSize: "12px", opacity: 0.8 }}>
                      {loading ? "Searching & thinking..." : "🟢 Online · Bilingual EN/AR"}
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: "12px", background: "rgba(255,255,255,0.15)", padding: "4px 12px", borderRadius: "50px" }}>
                    Powered by Qwen + Tavily
                  </div>
                </div>

                <div className="chat-messages">
                  {messages.map((msg, i) => (
                    <div key={i} className={`message ${msg.role}`}>
                      {msg.role === "bot" && (
                        <div style={{
                          width: "36px",
                          height: "36px",
                          background: "var(--primary)",
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "18px",
                          flexShrink: 0,
                        }}>🤖</div>
                      )}
                      <div>
                        <div className={`message-bubble ${msg.role}`} style={{ whiteSpace: "pre-wrap" }}>
                          {msg.content}
                        </div>
                        {msg.role === "bot" && (msg.confidence || msg.sources?.length) ? (
                          <div style={{ marginTop: "8px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {msg.confidence && (
                              <span className="badge badge-active" style={{ fontSize: "11px" }}>
                                ✓ {msg.confidence}% Confidence
                              </span>
                            )}
                            {msg.live_search && (
                              <span className="badge badge-blue" style={{ fontSize: "11px" }}>
                                🔍 Live Search Used
                              </span>
                            )}
                          </div>
                        ) : null}
                        {msg.sources && msg.sources.length > 0 && (
                          <div style={{ marginTop: "8px" }}>
                            <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600, marginBottom: "4px" }}>SOURCES:</div>
                            {msg.sources.slice(0, 2).map((src, j) => (
                              src.url ? (
                                <a
                                  key={j}
                                  href={src.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ display: "block", fontSize: "12px", color: "var(--primary)", textDecoration: "none", marginBottom: "2px" }}
                                >
                                  🔗 {src.title}
                                </a>
                              ) : (
                                <div key={j} style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "2px" }}>• {src.title}</div>
                              )
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="message">
                      <div style={{
                        width: "36px",
                        height: "36px",
                        background: "var(--primary)",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "18px",
                      }}>🤖</div>
                      <div className="message-bubble bot">
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <span className="loading-spinner" style={{ borderColor: "rgba(37,99,235,0.3)", borderTopColor: "var(--primary)" }} />
                          <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>Bob is searching and thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={sendMessage} className="chat-input-area">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ask anything about VAT... (English or العربية)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ margin: 0 }}
                    disabled={loading}
                    dir="auto"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !input.trim()}
                    style={{ flexShrink: 0, whiteSpace: "nowrap" }}
                  >
                    {loading ? <span className="loading-spinner" /> : "Send →"}
                  </button>
                </form>
              </div>

              {/* Suggestion chips */}
              <div style={{ marginTop: "16px" }}>
                <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "10px", fontWeight: 600 }}>
                  💡 Try asking:
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setInput(s)}
                      style={{
                        background: "white",
                        border: "1px solid var(--border)",
                        borderRadius: "50px",
                        padding: "8px 16px",
                        fontSize: "13px",
                        cursor: "pointer",
                        color: "var(--text-mid)",
                        transition: "all 0.2s",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--primary)";
                        (e.currentTarget as HTMLElement).style.color = "var(--primary)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                        (e.currentTarget as HTMLElement).style.color = "var(--text-mid)";
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
