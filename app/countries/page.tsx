"use client";
import { useState, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface CountryInfo {
  country_code: string;
  country_name_en: string;
  country_name_ar: string;
  vat_rate: number;
  currency: string;
  mandatory_threshold: number | null;
  voluntary_threshold: number | null;
  status: string;
  status_ar: string;
  authority: string;
  authority_ar: string;
  website: string;
  notes_en: string;
  notes_ar: string;
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Record<string, CountryInfo>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/countries`);
        if (!res.ok) throw new Error("Failed to fetch country data");
        const data = await res.json();
        setCountries(data.countries);
        setLastUpdated(new Date(data.last_updated).toLocaleString());
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Connection error";
        setError(msg);
        
        // Fallback data if backend is not running
        setCountries({
          UAE: {
            country_code: "AE", country_name_en: "United Arab Emirates", country_name_ar: "الإمارات العربية المتحدة",
            vat_rate: 5, currency: "AED", mandatory_threshold: 375000, voluntary_threshold: 187500,
            status: "ACTIVE", status_ar: "نشط", authority: "Federal Tax Authority (FTA)", authority_ar: "الهيئة الاتحادية للضرائب",
            website: "https://tax.gov.ae", notes_en: "Penalty rate changes to 14% annual from April 14, 2026", notes_ar: ""
          },
          KSA: {
            country_code: "SA", country_name_en: "Kingdom of Saudi Arabia", country_name_ar: "المملكة العربية السعودية",
            vat_rate: 15, currency: "SAR", mandatory_threshold: 375000, voluntary_threshold: 187500,
            status: "ACTIVE", status_ar: "نشط", authority: "Zakat, Tax and Customs Authority (ZATCA)", authority_ar: "هيئة الزكاة والضريبة والجمارك",
            website: "https://zatca.gov.sa", notes_en: "Rate increased from 5% to 15% in July 2020.", notes_ar: ""
          }
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCountries();
  }, []);

  const formatThreshold = (val: number | null, currency: string) => {
    if (val === null) return "N/A";
    return `${val.toLocaleString()} ${currency}`;
  };

  const activeCountries = Object.values(countries).filter(c => c.status === "ACTIVE");
  const pendingCountries = Object.values(countries).filter(c => c.status === "PENDING");

  return (
    <>
      <div className="page-header">
        <div className="container">
          <div className="section-tag" style={{ background: "rgba(255,255,255,0.15)", color: "white", borderColor: "rgba(255,255,255,0.3)", margin: "0 auto 16px" }}>
            🌍 GCC Coverage
          </div>
          <h1>VAT Data by Country</h1>
          <p>Complete directory of VAT rates, thresholds, and tax authorities across the Gulf.</p>
        </div>
      </div>

      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          
          {loading ? (
            <div className="text-center py-20" style={{ padding: "80px 0" }}>
              <span className="loading-spinner" style={{ borderColor: "rgba(37,99,235,0.3)", borderTopColor: "var(--primary)", width: "40px", height: "40px", borderWidth: "4px" }} />
              <p style={{ marginTop: "16px", color: "var(--text-mid)", fontWeight: 500 }}>Loading VAT data...</p>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", color: "#c2410c", padding: "16px", borderRadius: "12px", marginBottom: "32px", display: "flex", gap: "12px", alignItems: "center" }}>
                  <span>⚠️</span>
                  <span><strong>Note:</strong> Could not connect to API backend ({error}). Showing fallback data. Ensure the FastAPI server is running on port 8000.</span>
                </div>
              )}

              {/* Active Countries Table */}
              <div style={{ marginBottom: "48px" }}>
                <h2 style={{ fontSize: "24px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ width: "12px", height: "12px", background: "var(--success)", borderRadius: "50%", display: "inline-block" }}></span>
                  Active VAT Implementations
                </h2>
                
                <div style={{ overflowX: "auto", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
                  <table className="countries-table">
                    <thead>
                      <tr>
                        <th>Country</th>
                        <th>Rate</th>
                        <th>Mandatory Threshold</th>
                        <th>Tax Authority</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeCountries.map((c) => (
                        <tr key={c.country_code}>
                          <td>
                            <div style={{ fontWeight: 700, color: "var(--text-dark)" }}>{c.country_name_en}</div>
                            <div style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "2px" }}>{c.country_name_ar}</div>
                          </td>
                          <td>
                            <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--primary)" }}>{c.vat_rate}%</div>
                          </td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{formatThreshold(c.mandatory_threshold, c.currency)}</div>
                            <div style={{ fontSize: "12px", color: "var(--text-light)" }}>Voluntary: {formatThreshold(c.voluntary_threshold, c.currency)}</div>
                          </td>
                          <td>
                            <a href={c.website} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}>
                              {c.authority} ↗
                            </a>
                          </td>
                          <td>
                            <span className="badge badge-active">Active</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pending Countries Table */}
              {pendingCountries.length > 0 && (
                <div>
                  <h2 style={{ fontSize: "24px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ width: "12px", height: "12px", background: "var(--pending)", borderRadius: "50%", display: "inline-block" }}></span>
                    Pending Implementations
                  </h2>
                  
                  <div className="grid-2">
                    {pendingCountries.map((c) => (
                      <div key={c.country_code} className="card" style={{ borderTop: "4px solid var(--pending)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                          <div>
                            <h3 style={{ fontSize: "20px" }}>{c.country_name_en}</h3>
                            <div style={{ color: "var(--text-light)", fontSize: "14px" }}>{c.country_name_ar}</div>
                          </div>
                          <span className="badge badge-pending">Pending</span>
                        </div>
                        
                        <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "12px", marginBottom: "16px" }}>
                          <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "4px", textTransform: "uppercase", fontWeight: 700 }}>Authority</div>
                          <div style={{ fontWeight: 500 }}><a href={c.website} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)", textDecoration: "none" }}>{c.authority} ↗</a></div>
                        </div>
                        
                        <div style={{ padding: "16px", background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: "12px" }}>
                          <p style={{ margin: 0, fontSize: "14px", color: "var(--text-dark)", lineHeight: 1.6 }}>
                            <strong>Notes:</strong> {c.notes_en}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {lastUpdated && (
                <div style={{ textAlign: "center", marginTop: "40px", fontSize: "13px", color: "var(--text-muted)" }}>
                  Data provided by Bob-VAT API. Last updated: {lastUpdated}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
