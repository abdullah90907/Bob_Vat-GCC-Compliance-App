"""
Pydantic models for request/response validation
"""
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, field_validator
from datetime import datetime


# Request Models

class CalculateRequest(BaseModel):
    """Request model for VAT calculation"""
    amount: float = Field(..., gt=0, description="Amount to calculate VAT on")
    country: str = Field(..., description="GCC country code (UAE, KSA, BAHRAIN, OMAN, QATAR, KUWAIT)")
    product_type: str = Field(default="standard", description="Product type (standard, exempt, zero-rated, etc.)")
    language: str = Field(default="en", description="Response language (en or ar)")

    @field_validator('country')
    @classmethod
    def validate_country(cls, v: str) -> str:
        valid_countries = ["UAE", "KSA", "BAHRAIN", "OMAN", "QATAR", "KUWAIT"]
        v_upper = v.upper()
        if v_upper not in valid_countries:
            raise ValueError(f"Country must be one of: {', '.join(valid_countries)}")
        return v_upper

    @field_validator('language')
    @classmethod
    def validate_language(cls, v: str) -> str:
        if v not in ["en", "ar"]:
            raise ValueError("Language must be 'en' or 'ar'")
        return v


class RegistrationCheckRequest(BaseModel):
    """Request model for VAT registration check"""
    annual_revenue: float = Field(..., gt=0, description="Annual revenue amount")
    currency: str = Field(..., description="Currency code (AED, SAR, BHD, OMR, QAR, KWD)")
    country: str = Field(..., description="GCC country code")
    business_type: str = Field(default="general", description="Type of business")
    language: str = Field(default="en", description="Response language")

    @field_validator('country')
    @classmethod
    def validate_country(cls, v: str) -> str:
        valid_countries = ["UAE", "KSA", "BAHRAIN", "OMAN", "QATAR", "KUWAIT"]
        v_upper = v.upper()
        if v_upper not in valid_countries:
            raise ValueError(f"Country must be one of: {', '.join(valid_countries)}")
        return v_upper


class AskRequest(BaseModel):
    """Request model for natural language questions"""
    question: str = Field(..., min_length=1, description="User's question")
    country: Optional[str] = Field(None, description="Specific country context")
    language: Optional[str] = Field(None, description="Preferred response language")


class InvoiceValidateRequest(BaseModel):
    """Request model for invoice validation"""
    invoice_text: str = Field(..., min_length=10, description="Invoice text content")
    country: str = Field(..., description="Country where invoice was issued")
    language: str = Field(default="en", description="Response language")

    @field_validator('country')
    @classmethod
    def validate_country(cls, v: str) -> str:
        valid_countries = ["UAE", "KSA", "BAHRAIN", "OMAN", "QATAR", "KUWAIT"]
        v_upper = v.upper()
        if v_upper not in valid_countries:
            raise ValueError(f"Country must be one of: {', '.join(valid_countries)}")
        return v_upper


class CrossBorderRequest(BaseModel):
    """Request model for cross-border VAT advice"""
    from_country: str = Field(..., description="Origin country")
    to_country: str = Field(..., description="Destination country")
    transaction_type: str = Field(default="B2B", description="Transaction type (B2B, B2C, export, import)")
    language: str = Field(default="en", description="Response language")

    @field_validator('from_country', 'to_country')
    @classmethod
    def validate_country(cls, v: str) -> str:
        valid_countries = ["UAE", "KSA", "BAHRAIN", "OMAN", "QATAR", "KUWAIT"]
        v_upper = v.upper()
        if v_upper not in valid_countries:
            raise ValueError(f"Country must be one of: {', '.join(valid_countries)}")
        return v_upper


class PenaltyRequest(BaseModel):
    """Request model for penalty calculation"""
    country: str = Field(..., description="Country code")
    days_late: int = Field(..., ge=0, description="Number of days late")
    vat_owed: float = Field(..., gt=0, description="VAT amount owed")
    offense_type: str = Field(default="late_payment", description="Type of offense (late_payment, late_filing, etc.)")
    language: str = Field(default="en", description="Response language")

    @field_validator('country')
    @classmethod
    def validate_country(cls, v: str) -> str:
        valid_countries = ["UAE", "KSA", "BAHRAIN", "OMAN", "QATAR", "KUWAIT"]
        v_upper = v.upper()
        if v_upper not in valid_countries:
            raise ValueError(f"Country must be one of: {', '.join(valid_countries)}")
        return v_upper


class ExemptCheckRequest(BaseModel):
    """Request model for exempt/zero-rate checker"""
    country: str = Field(..., description="Country code")
    product: str = Field(..., description="Product or service description")
    language: str = Field(default="en", description="Response language")

    @field_validator('country')
    @classmethod
    def validate_country(cls, v: str) -> str:
        valid_countries = ["UAE", "KSA", "BAHRAIN", "OMAN", "QATAR", "KUWAIT"]
        v_upper = v.upper()
        if v_upper not in valid_countries:
            raise ValueError(f"Country must be one of: {', '.join(valid_countries)}")
        return v_upper


class ReadinessRequest(BaseModel):
    """Request model for Kuwait/Qatar readiness"""
    country: str = Field(..., description="Country code (QATAR or KUWAIT)")
    language: str = Field(default="en", description="Response language")

    @field_validator('country')
    @classmethod
    def validate_country(cls, v: str) -> str:
        valid_countries = ["QATAR", "KUWAIT"]
        v_upper = v.upper()
        if v_upper not in valid_countries:
            raise ValueError(f"Country must be one of: {', '.join(valid_countries)}")
        return v_upper


class DeadlineRequest(BaseModel):
    """Request model for deadline tracker"""
    country: str = Field(..., description="Country code")
    period: str = Field(..., description="Filing period (monthly or quarterly)")
    language: str = Field(default="en", description="Response language")

    @field_validator('country')
    @classmethod
    def validate_country(cls, v: str) -> str:
        valid_countries = ["UAE", "KSA", "BAHRAIN", "OMAN", "QATAR", "KUWAIT"]
        v_upper = v.upper()
        if v_upper not in valid_countries:
            raise ValueError(f"Country must be one of: {', '.join(valid_countries)}")
        return v_upper


# Response Models

class CalculateResponse(BaseModel):
    """Response model for VAT calculation"""
    net: float = Field(..., description="Net amount (before VAT)")
    vat_amount: float = Field(..., description="VAT amount")
    gross: float = Field(..., description="Gross amount (including VAT)")
    rate_applied: float = Field(..., description="VAT rate applied (%)")
    citation: str = Field(..., description="Legal citation or source")
    confidence: int = Field(..., ge=0, le=100, description="Confidence score (0-100)")
    language: str = Field(..., description="Response language")
    last_updated: str = Field(..., description="Last update timestamp")
    is_pending_country: bool = Field(..., description="Whether country VAT is pending")
    country_status: str = Field(..., description="Country VAT status")
    notes: Optional[str] = Field(None, description="Additional notes")


class RegistrationCheckResponse(BaseModel):
    """Response model for registration check"""
    must_register: bool = Field(..., description="Whether registration is mandatory")
    threshold: Optional[float] = Field(None, description="Registration threshold")
    revenue_gap: Optional[float] = Field(None, description="Gap to threshold (negative if above)")
    explanation: str = Field(..., description="Detailed explanation")
    deadline_hint: Optional[str] = Field(None, description="Registration deadline guidance")
    confidence: int = Field(..., ge=0, le=100, description="Confidence score")
    citation: str = Field(..., description="Source citation")
    is_pending_country: bool = Field(..., description="Whether country VAT is pending")


class Source(BaseModel):
    """Source citation model"""
    title: str
    url: Optional[str] = None
    date: Optional[str] = None
    snippet: Optional[str] = None


class AskResponse(BaseModel):
    """Response model for natural language questions"""
    answer: str = Field(..., description="Answer to the question")
    detected_language: str = Field(..., description="Detected language of question")
    sources: List[Source] = Field(default_factory=list, description="Source citations")
    confidence: int = Field(..., ge=0, le=100, description="Confidence score")
    last_updated: str = Field(..., description="Timestamp")
    verify_flag: bool = Field(default=False, description="Whether user should verify with authority")
    live_search: bool = Field(default=True, description="Whether live search was used")


class InvoiceIssue(BaseModel):
    """Model for invoice validation issues"""
    field: str = Field(..., description="Field with issue")
    issue: str = Field(..., description="Description of issue")
    severity: str = Field(..., description="Severity level (error, warning, info)")


class InvoiceValidateResponse(BaseModel):
    """Response model for invoice validation"""
    is_valid: bool = Field(..., description="Whether invoice is valid")
    issues: List[InvoiceIssue] = Field(default_factory=list, description="List of issues found")
    corrections: List[str] = Field(default_factory=list, description="Suggested corrections")
    confidence: int = Field(..., ge=0, le=100, description="Confidence score")
    summary: str = Field(..., description="Validation summary")


class CrossBorderResponse(BaseModel):
    """Response model for cross-border advice"""
    vat_treatment: str = Field(..., description="VAT treatment description")
    explanation: str = Field(..., description="Detailed explanation")
    is_zero_rated: bool = Field(..., description="Whether transaction is zero-rated")
    sources: List[Source] = Field(default_factory=list, description="Source citations")
    confidence: int = Field(..., ge=0, le=100, description="Confidence score")
    recommendations: List[str] = Field(default_factory=list, description="Recommendations")


class PenaltyResponse(BaseModel):
    """Response model for penalty calculation"""
    penalty_amount: float = Field(..., description="Calculated penalty amount")
    calculation_breakdown: str = Field(..., description="Breakdown of calculation")
    legal_basis: str = Field(..., description="Legal basis for penalty")
    confidence: int = Field(..., ge=0, le=100, description="Confidence score")
    recommendations: List[str] = Field(default_factory=list, description="Recommendations")


class ExemptCheckResponse(BaseModel):
    """Response model for exempt/zero-rate checker"""
    status: str = Field(..., description="Tax status (Standard, Zero-Rated, Exempt, Out of Scope)")
    explanation: str = Field(..., description="Detailed explanation")
    sources: List[Source] = Field(default_factory=list, description="Source citations")
    confidence: int = Field(..., ge=0, le=100, description="Confidence score")


class ReadinessResponse(BaseModel):
    """Response model for Kuwait/Qatar readiness advisory"""
    status_summary: str = Field(..., description="High-level status summary")
    advisory: str = Field(..., description="Detailed readiness advisory")
    checklist: List[str] = Field(default_factory=list, description="Preparation checklist items")
    sources: List[Source] = Field(default_factory=list, description="Source citations")
    confidence: int = Field(..., ge=0, le=100, description="Confidence score")


class DeadlineResponse(BaseModel):
    """Response model for deadline tracker"""
    deadline_rule: str = Field(..., description="General rule for deadline (e.g., '28th of following month')")
    explanation: str = Field(..., description="Detailed explanation and edge cases")
    penalty_warning: str = Field(..., description="Warning about late filing penalties")
    sources: List[Source] = Field(default_factory=list, description="Source citations")
    confidence: int = Field(..., ge=0, le=100, description="Confidence score")


class NewsArticle(BaseModel):
    """Model for news article"""
    title: str
    summary: str
    source: str
    date: Optional[str] = None
    url: Optional[str] = None
    relevance_score: Optional[float] = None


class NewsResponse(BaseModel):
    """Response model for news feed"""
    articles: List[NewsArticle] = Field(..., description="List of news articles")
    last_updated: str = Field(..., description="Timestamp")
    search_query: str = Field(..., description="Search query used")


class CountryInfo(BaseModel):
    """Model for country VAT information"""
    country_code: str
    country_name_en: str
    country_name_ar: str
    vat_rate: float
    currency: str
    mandatory_threshold: Optional[float]
    voluntary_threshold: Optional[float]
    status: str
    status_ar: str
    authority: str
    authority_ar: str
    website: str
    notes_en: str
    notes_ar: str


class CountriesResponse(BaseModel):
    """Response model for countries endpoint"""
    countries: Dict[str, CountryInfo]
    last_updated: str


class HealthResponse(BaseModel):
    """Response model for health check"""
    status: str
    timestamp: str
    version: str
    services: Dict[str, str] = Field(default_factory=dict)


class BobDemoResponse(BaseModel):
    """Response model for Bob demo endpoint"""
    title: str
    description: str
    files_generated: List[str]
    time_saved_estimate: str
    bob_reasoning: List[str]
    features_implemented: List[str]
    tech_stack: List[str]

# Made with Bob
