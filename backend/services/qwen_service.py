"""
Qwen LLM service for VAT analysis and responses
"""
import logging
from typing import Dict, Any, Optional
from openai import AsyncOpenAI
from config import QWEN_API_KEY, QWEN_BASE_URL, QWEN_MODEL
from prompts.templates import SYSTEM_PROMPT

logger = logging.getLogger(__name__)


class QwenService:
    """Service for interacting with Qwen LLM via OpenAI-compatible API"""
    
    def __init__(self):
        """Initialize Qwen client"""
        if not QWEN_API_KEY:
            logger.warning("QWEN_API_KEY not set. LLM functionality will be disabled.")
            self.client = None
        else:
            self.client = AsyncOpenAI(
                api_key=QWEN_API_KEY,
                base_url=QWEN_BASE_URL
            )
    
    async def generate_response(
        self,
        prompt: str,
        system_prompt: str = SYSTEM_PROMPT,
        temperature: float = 0.7,
        max_tokens: int = 2000
    ) -> Dict[str, Any]:
        """
        Generate a response from Qwen
        
        Args:
            prompt: User prompt
            system_prompt: System instructions
            temperature: Sampling temperature
            max_tokens: Maximum tokens to generate
        
        Returns:
            Dictionary containing response and metadata
        """
        if not self.client:
            logger.error("Qwen client not initialized")
            return {
                "success": False,
                "content": "",
                "error": "Qwen API key not configured"
            }
        
        try:
            logger.info("Generating Qwen response")
            response = await self.client.chat.completions.create(
                model=QWEN_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                temperature=temperature,
                max_tokens=max_tokens
            )
            
            content = response.choices[0].message.content
            
            # Build response with usage data if available
            result = {
                "success": True,
                "content": content,
                "model": response.model
            }
            
            # Add usage data only if available
            if response.usage:
                result["usage"] = {
                    "prompt_tokens": response.usage.prompt_tokens,
                    "completion_tokens": response.usage.completion_tokens,
                    "total_tokens": response.usage.total_tokens
                }
            
            return result
        
        except Exception as e:
            logger.error(f"Qwen API error: {str(e)}")
            return {
                "success": False,
                "content": "",
                "error": str(e)
            }
    
    async def detect_language(self, text: str) -> str:
        """
        Detect language of input text
        
        Args:
            text: Input text
        
        Returns:
            Language code ('en' or 'ar')
        """
        # Simple heuristic: check for Arabic characters
        arabic_chars = sum(1 for c in text if '\u0600' <= c <= '\u06FF')
        total_chars = len([c for c in text if c.isalpha()])
        
        if total_chars == 0:
            return "en"
        
        # If more than 30% Arabic characters, consider it Arabic
        if arabic_chars / total_chars > 0.3:
            return "ar"
        
        return "en"
    
    async def calculate_vat(
        self,
        amount: float,
        vat_rate: float,
        country: str,
        product_type: str,
        context: str,
        language: str
    ) -> Dict[str, Any]:
        """
        Calculate VAT with explanation
        
        Args:
            amount: Base amount
            vat_rate: VAT rate percentage
            country: Country name
            product_type: Product type
            context: Additional context from Tavily
            language: Response language
        
        Returns:
            Calculation results with explanation
        """
        from prompts.templates import CALCULATE_PROMPT
        
        prompt = CALCULATE_PROMPT.format(
            amount=amount,
            country=country,
            product_type=product_type,
            vat_rate=vat_rate,
            status="ACTIVE" if vat_rate > 0 else "PENDING",
            context=context,
            language="Arabic" if language == "ar" else "English"
        )
        
        response = await self.generate_response(prompt, temperature=0.3)
        
        if not response["success"]:
            return response
        
        # Parse calculation from response
        net = amount
        vat_amount = round(amount * (vat_rate / 100), 2)
        gross = round(net + vat_amount, 2)
        
        return {
            "success": True,
            "net": net,
            "vat_amount": vat_amount,
            "gross": gross,
            "explanation": response["content"]
        }
    
    async def check_registration(
        self,
        revenue: float,
        threshold: Optional[float],
        country: str,
        currency: str,
        business_type: str,
        context: str,
        language: str
    ) -> Dict[str, Any]:
        """
        Check VAT registration requirements
        
        Args:
            revenue: Annual revenue
            threshold: Registration threshold
            country: Country name
            currency: Currency code
            business_type: Type of business
            context: Additional context
            language: Response language
        
        Returns:
            Registration check results
        """
        from prompts.templates import REGISTRATION_PROMPT
        
        prompt = REGISTRATION_PROMPT.format(
            revenue=revenue,
            currency=currency,
            country=country,
            mandatory_threshold=threshold if threshold else "N/A (VAT pending)",
            voluntary_threshold=threshold / 2 if threshold else "N/A",
            status="ACTIVE" if threshold else "PENDING",
            business_type=business_type,
            context=context,
            language="Arabic" if language == "ar" else "English"
        )
        
        response = await self.generate_response(prompt, temperature=0.3)
        
        if not response["success"]:
            return response
        
        must_register = False
        revenue_gap = 0
        
        if threshold:
            must_register = revenue >= threshold
            revenue_gap = threshold - revenue
        
        return {
            "success": True,
            "must_register": must_register,
            "revenue_gap": revenue_gap,
            "explanation": response["content"]
        }
    
    async def answer_question(
        self,
        question: str,
        context: str,
        gcc_data: str,
        detected_language: str
    ) -> Dict[str, Any]:
        """
        Answer natural language question
        
        Args:
            question: User's question
            context: Context from Tavily search
            gcc_data: GCC VAT data
            detected_language: Detected language
        
        Returns:
            Answer with sources
        """
        from prompts.templates import ASK_PROMPT
        
        prompt = ASK_PROMPT.format(
            question=question,
            context=context,
            gcc_data=gcc_data
        )
        
        response = await self.generate_response(prompt, temperature=0.5)
        
        return {
            "success": response["success"],
            "answer": response.get("content", ""),
            "error": response.get("error")
        }
    
    async def validate_invoice(
        self,
        invoice_text: str,
        country: str,
        vat_rate: float,
        language: str
    ) -> Dict[str, Any]:
        """
        Validate invoice for VAT compliance
        
        Args:
            invoice_text: Invoice content
            country: Country code
            vat_rate: Expected VAT rate
            language: Response language
        
        Returns:
            Validation results
        """
        from prompts.templates import INVOICE_VALIDATION_PROMPT
        
        prompt = INVOICE_VALIDATION_PROMPT.format(
            invoice_text=invoice_text,
            country=country,
            vat_rate=vat_rate,
            status="ACTIVE" if vat_rate > 0 else "PENDING",
            language="Arabic" if language == "ar" else "English"
        )
        
        response = await self.generate_response(prompt, temperature=0.3)
        
        return {
            "success": response["success"],
            "validation": response.get("content", ""),
            "error": response.get("error")
        }
    
    async def analyze_cross_border(
        self,
        from_country: str,
        to_country: str,
        transaction_type: str,
        context: str,
        language: str
    ) -> Dict[str, Any]:
        """
        Analyze cross-border VAT treatment
        
        Args:
            from_country: Origin country
            to_country: Destination country
            transaction_type: Transaction type
            context: Additional context
            language: Response language
        
        Returns:
            Cross-border analysis
        """
        from prompts.templates import CROSS_BORDER_PROMPT
        
        prompt = CROSS_BORDER_PROMPT.format(
            from_country=from_country,
            to_country=to_country,
            transaction_type=transaction_type,
            context=context,
            language="Arabic" if language == "ar" else "English"
        )
        
        response = await self.generate_response(prompt, temperature=0.4)
        
        return {
            "success": response["success"],
            "analysis": response.get("content", ""),
            "error": response.get("error")
        }
    
    async def calculate_penalty(
        self,
        country: str,
        days_late: int,
        vat_owed: float,
        currency: str,
        offense_type: str,
        penalty_rate: float,
        context: str,
        language: str
    ) -> Dict[str, Any]:
        """
        Calculate VAT penalty
        
        Args:
            country: Country code
            days_late: Number of days late
            vat_owed: VAT amount owed
            currency: Currency code
            offense_type: Type of offense
            penalty_rate: Annual penalty rate
            context: Additional context
            language: Response language
        
        Returns:
            Penalty calculation
        """
        from prompts.templates import PENALTY_PROMPT
        
        # Calculate penalty
        daily_rate = penalty_rate / 365
        penalty_amount = round(vat_owed * (daily_rate / 100) * days_late, 2)
        
        prompt = PENALTY_PROMPT.format(
            country=country,
            days_late=days_late,
            vat_owed=vat_owed,
            currency=currency,
            offense_type=offense_type,
            penalty_rate=penalty_rate,
            context=context,
            language="Arabic" if language == "ar" else "English"
        )
        
        response = await self.generate_response(prompt, temperature=0.3)
        
        return {
            "success": response["success"],
            "penalty_amount": penalty_amount,
            "explanation": response.get("content", ""),
            "error": response.get("error")
        }


# Global instance
qwen_service = QwenService()

# Made with Bob
