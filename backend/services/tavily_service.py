"""
Tavily search service for live VAT information
"""
import logging
from typing import List, Dict, Any, Optional
from tavily import TavilyClient
from config import TAVILY_API_KEY

logger = logging.getLogger(__name__)


class TavilyService:
    """Service for performing live searches using Tavily API"""
    
    def __init__(self):
        """Initialize Tavily client"""
        if not TAVILY_API_KEY:
            logger.warning("TAVILY_API_KEY not set. Live search will be disabled.")
            self.client = None
        else:
            self.client = TavilyClient(api_key=TAVILY_API_KEY)
    
    async def search(
        self,
        query: str,
        max_results: int = 5,
        search_depth: str = "advanced"
    ) -> Dict[str, Any]:
        """
        Perform a search using Tavily
        
        Args:
            query: Search query string
            max_results: Maximum number of results to return
            search_depth: Search depth ("basic" or "advanced")
        
        Returns:
            Dictionary containing search results and metadata
        """
        if not self.client:
            logger.warning("Tavily client not initialized. Returning empty results.")
            return {
                "success": False,
                "results": [],
                "error": "Tavily API key not configured"
            }
        
        try:
            logger.info(f"Performing Tavily search: {query}")
            # Tavily search parameters
            search_params = {
                "query": query,
                "max_results": max_results,
                "include_answer": True,
                "include_raw_content": False
            }
            
            # Add search_depth only if it's a valid value
            if search_depth in ["basic", "advanced"]:
                search_params["search_depth"] = search_depth
            
            response = self.client.search(**search_params)
            
            results = []
            if response and "results" in response:
                for item in response["results"]:
                    results.append({
                        "title": item.get("title", ""),
                        "url": item.get("url", ""),
                        "content": item.get("content", ""),
                        "score": item.get("score", 0.0),
                        "published_date": item.get("published_date")
                    })
            
            return {
                "success": True,
                "results": results,
                "answer": response.get("answer", ""),
                "query": query
            }
        
        except Exception as e:
            logger.error(f"Tavily search error: {str(e)}")
            return {
                "success": False,
                "results": [],
                "error": str(e)
            }
    
    async def search_vat_rate(
        self,
        country: str,
        product_type: str = "standard"
    ) -> Dict[str, Any]:
        """
        Search for current VAT rate information
        
        Args:
            country: Country name or code
            product_type: Type of product/service
        
        Returns:
            Search results with VAT rate information
        """
        query = f"{country} VAT rate {product_type} 2026 official"
        return await self.search(query, max_results=3)
    
    async def search_registration_threshold(
        self,
        country: str
    ) -> Dict[str, Any]:
        """
        Search for VAT registration threshold updates
        
        Args:
            country: Country name or code
        
        Returns:
            Search results with threshold information
        """
        query = f"{country} VAT registration threshold 2026 updates mandatory"
        return await self.search(query, max_results=3)
    
    async def search_gcc_vat_news(self) -> Dict[str, Any]:
        """
        Search for latest GCC VAT news
        
        Returns:
            Search results with latest VAT news
        """
        query = "GCC VAT news 2026 latest updates UAE KSA Bahrain Oman"
        return await self.search(query, max_results=10, search_depth="advanced")
    
    async def search_cross_border_rules(
        self,
        from_country: str,
        to_country: str,
        transaction_type: str = "export"
    ) -> Dict[str, Any]:
        """
        Search for cross-border VAT rules
        
        Args:
            from_country: Origin country
            to_country: Destination country
            transaction_type: Type of transaction
        
        Returns:
            Search results with cross-border rules
        """
        query = f"{from_country} to {to_country} VAT {transaction_type} rules 2026 GCC"
        return await self.search(query, max_results=5)
    
    async def search_penalty_rules(
        self,
        country: str
    ) -> Dict[str, Any]:
        """
        Search for VAT penalty rules
        
        Args:
            country: Country name or code
        
        Returns:
            Search results with penalty information
        """
        query = f"{country} VAT penalty late payment filing 2026 rules"
        return await self.search(query, max_results=3)
    
    async def search_exempt_zero_rated(
        self,
        country: str,
        product_category: str
    ) -> Dict[str, Any]:
        """
        Search for exempt or zero-rated products
        
        Args:
            country: Country name or code
            product_category: Product category (education, healthcare, food, etc.)
        
        Returns:
            Search results with exemption information
        """
        query = f"{country} VAT exempt zero-rated {product_category} 2026"
        return await self.search(query, max_results=5)
    
    def format_results_for_context(
        self,
        search_results: Dict[str, Any]
    ) -> str:
        """
        Format search results into context string for LLM
        
        Args:
            search_results: Results from Tavily search
        
        Returns:
            Formatted context string
        """
        if not search_results.get("success"):
            return "No live search results available."
        
        context_parts = []
        
        # Add answer if available
        if search_results.get("answer"):
            context_parts.append(f"Summary: {search_results['answer']}\n")
        
        # Add individual results
        results = search_results.get("results", [])
        for i, result in enumerate(results[:5], 1):
            context_parts.append(
                f"Source {i}:\n"
                f"Title: {result.get('title', 'N/A')}\n"
                f"Content: {result.get('content', 'N/A')[:500]}...\n"
                f"URL: {result.get('url', 'N/A')}\n"
            )
        
        return "\n".join(context_parts) if context_parts else "No relevant information found."


# Global instance
tavily_service = TavilyService()

# Made with Bob
