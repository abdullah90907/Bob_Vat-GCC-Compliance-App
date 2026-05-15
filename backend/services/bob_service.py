"""
IBM Bob service for formatting and enhancing responses
"""
import logging
import json
from typing import Dict, Any, List
from datetime import datetime
from models.schemas import NewsArticle

logger = logging.getLogger(__name__)


class BobService:
    """Service for IBM Bob-style response formatting and enhancement"""
    
    @staticmethod
    def extract_confidence_score(text: str) -> int:
        """
        Extract confidence score from response text
        
        Args:
            text: Response text
        
        Returns:
            Confidence score (0-100)
        """
        # Look for patterns like "Confidence: 85/100" or "مستوى الثقة: 90/100"
        import re
        
        patterns = [
            r'[Cc]onfidence[:\s]+(\d+)',
            r'مستوى الثقة[:\s]+(\d+)',
            r'(\d+)/100'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                score = int(match.group(1))
                return min(max(score, 0), 100)  # Clamp between 0-100
        
        # Default confidence based on content quality
        return 75
    
    @staticmethod
    def extract_citation(text: str) -> str:
        """
        Extract source citation from response text
        
        Args:
            text: Response text
        
        Returns:
            Citation string
        """
        import re
        
        patterns = [
            r'[Ss]ource[:\s]+([^\n]+)',
            r'المصدر[:\s]+([^\n]+)',
            r'[Cc]itation[:\s]+([^\n]+)'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(1).strip()
        
        return "Based on GCC VAT regulations"
    
    @staticmethod
    def should_verify(text: str, confidence: int) -> bool:
        """
        Determine if user should verify with authority
        
        Args:
            text: Response text
            confidence: Confidence score
        
        Returns:
            Whether verification is recommended
        """
        verify_keywords = [
            "verify", "confirm", "check with", "consult",
            "تحقق", "راجع", "استشر"
        ]
        
        # Low confidence or contains verify keywords
        if confidence < 70:
            return True
        
        text_lower = text.lower()
        return any(keyword in text_lower for keyword in verify_keywords)
    
    @staticmethod
    def format_calculation_response(
        net: float,
        vat_amount: float,
        gross: float,
        rate: float,
        explanation: str,
        country: str,
        language: str,
        is_pending: bool
    ) -> Dict[str, Any]:
        """
        Format VAT calculation response in Bob style
        
        Args:
            net: Net amount
            vat_amount: VAT amount
            gross: Gross amount
            rate: VAT rate
            explanation: Explanation text
            country: Country code
            language: Response language
            is_pending: Whether country VAT is pending
        
        Returns:
            Formatted response dictionary
        """
        confidence = BobService.extract_confidence_score(explanation)
        citation = BobService.extract_citation(explanation)
        
        return {
            "net": net,
            "vat_amount": vat_amount,
            "gross": gross,
            "rate_applied": rate,
            "citation": citation,
            "confidence": confidence,
            "language": language,
            "last_updated": datetime.utcnow().isoformat() + "Z",
            "is_pending_country": is_pending,
            "country_status": "PENDING" if is_pending else "ACTIVE",
            "notes": explanation if is_pending else None
        }
    
    @staticmethod
    def format_registration_response(
        must_register: bool,
        threshold: float | None,
        revenue_gap: float,
        explanation: str,
        is_pending: bool
    ) -> Dict[str, Any]:
        """
        Format registration check response
        
        Args:
            must_register: Whether registration is mandatory
            threshold: Registration threshold (None for pending countries)
            revenue_gap: Gap to threshold
            explanation: Explanation text
            is_pending: Whether country VAT is pending
        
        Returns:
            Formatted response dictionary
        """
        confidence = BobService.extract_confidence_score(explanation)
        citation = BobService.extract_citation(explanation)
        
        deadline_hint = None
        if must_register and not is_pending:
            deadline_hint = "Register within 30 days of exceeding threshold"
        elif is_pending:
            deadline_hint = "Monitor for VAT implementation announcement"
        
        return {
            "must_register": must_register,
            "threshold": threshold,
            "revenue_gap": revenue_gap,
            "explanation": explanation,
            "deadline_hint": deadline_hint,
            "confidence": confidence,
            "citation": citation,
            "is_pending_country": is_pending
        }
    
    @staticmethod
    def format_ask_response(
        answer: str,
        detected_language: str,
        sources: List[Dict[str, Any]],
        live_search: bool
    ) -> Dict[str, Any]:
        """
        Format natural language Q&A response
        
        Args:
            answer: Answer text
            detected_language: Detected language
            sources: Source list
            live_search: Whether live search was used
        
        Returns:
            Formatted response dictionary
        """
        confidence = BobService.extract_confidence_score(answer)
        verify_flag = BobService.should_verify(answer, confidence)
        
        return {
            "answer": answer,
            "detected_language": detected_language,
            "sources": sources,
            "confidence": confidence,
            "last_updated": datetime.utcnow().isoformat() + "Z",
            "verify_flag": verify_flag,
            "live_search": live_search
        }
    
    @staticmethod
    def format_invoice_validation(
        validation_text: str,
        language: str
    ) -> Dict[str, Any]:
        """
        Format invoice validation response
        
        Args:
            validation_text: Validation text from LLM
            language: Response language
        
        Returns:
            Formatted validation response
        """
        # Parse validation text for issues
        issues = []
        corrections = []
        
        # Simple parsing - look for error/warning indicators
        lines = validation_text.split('\n')
        for line in lines:
            line_lower = line.lower()
            if any(word in line_lower for word in ['error', 'incorrect', 'missing', 'خطأ', 'غير صحيح', 'مفقود']):
                issues.append({
                    "field": "general",
                    "issue": line.strip(),
                    "severity": "error"
                })
            elif any(word in line_lower for word in ['warning', 'should', 'recommend', 'تحذير', 'يجب', 'ينصح']):
                issues.append({
                    "field": "general",
                    "issue": line.strip(),
                    "severity": "warning"
                })
            elif any(word in line_lower for word in ['correct', 'fix', 'change', 'صحح', 'غير']):
                corrections.append(line.strip())
        
        is_valid = len([i for i in issues if i["severity"] == "error"]) == 0
        confidence = BobService.extract_confidence_score(validation_text)
        
        return {
            "is_valid": is_valid,
            "issues": issues,
            "corrections": corrections,
            "confidence": confidence,
            "summary": validation_text
        }
    
    @staticmethod
    def format_cross_border_response(
        analysis_text: str,
        language: str
    ) -> Dict[str, Any]:
        """
        Format cross-border analysis response
        
        Args:
            analysis_text: Analysis text from LLM
            language: Response language
        
        Returns:
            Formatted cross-border response
        """
        confidence = BobService.extract_confidence_score(analysis_text)
        
        # Determine if zero-rated
        zero_rated_keywords = ['zero-rated', 'zero rate', '0%', 'معفى', 'صفر']
        is_zero_rated = any(keyword in analysis_text.lower() for keyword in zero_rated_keywords)
        
        # Extract recommendations
        recommendations = []
        lines = analysis_text.split('\n')
        for line in lines:
            if any(word in line.lower() for word in ['recommend', 'should', 'must', 'ينصح', 'يجب']):
                recommendations.append(line.strip())
        
        return {
            "vat_treatment": "Zero-rated" if is_zero_rated else "Standard-rated",
            "explanation": analysis_text,
            "is_zero_rated": is_zero_rated,
            "sources": [],
            "confidence": confidence,
            "recommendations": recommendations[:5]  # Top 5
        }
    
    @staticmethod
    def format_penalty_response(
        penalty_amount: float,
        explanation_text: str,
        language: str
    ) -> Dict[str, Any]:
        """
        Format penalty calculation response
        
        Args:
            penalty_amount: Calculated penalty
            explanation_text: Explanation from LLM
            language: Response language
        
        Returns:
            Formatted penalty response
        """
        confidence = BobService.extract_confidence_score(explanation_text)
        legal_basis = BobService.extract_citation(explanation_text)
        
        # Extract recommendations
        recommendations = []
        lines = explanation_text.split('\n')
        for line in lines:
            if any(word in line.lower() for word in ['recommend', 'avoid', 'prevent', 'ينصح', 'تجنب']):
                recommendations.append(line.strip())
        
        return {
            "penalty_amount": penalty_amount,
            "calculation_breakdown": explanation_text,
            "legal_basis": legal_basis,
            "confidence": confidence,
            "recommendations": recommendations[:5]
        }
    
    @staticmethod
    def format_news_articles(
        search_results: Dict[str, Any]
    ) -> List[NewsArticle]:
        """
        Format news articles from search results
        
        Args:
            search_results: Tavily search results
        
        Returns:
            List of formatted news articles as NewsArticle objects
        """
        articles = []
        
        if not search_results.get("success"):
            return articles
        
        for result in search_results.get("results", []):
            article = NewsArticle(
                title=result.get("title", ""),
                summary=result.get("content", "")[:300] + "..." if result.get("content") else "",
                source=result.get("url", "").split('/')[2] if result.get("url") else "Unknown",
                date=result.get("published_date"),
                url=result.get("url"),
                relevance_score=result.get("score")
            )
            articles.append(article)
        
        return articles


# Global instance
bob_service = BobService()

# Made with Bob
