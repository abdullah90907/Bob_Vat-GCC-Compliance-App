"""
Configuration module for Bob-VAT
Contains GCC VAT data and environment variables
"""
import os
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

# Environment variables
QWEN_API_KEY = os.getenv("QWEN_API_KEY", "")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY", "")
APP_VERSION = os.getenv("APP_VERSION", "1.0.0")

# Qwen API Configuration
QWEN_BASE_URL = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
QWEN_MODEL = "qwen-plus-2025-07-28"

# GCC VAT Data (hardcoded reference data)
GCC_VAT_DATA: Dict[str, Dict[str, Any]] = {
    "UAE": {
        "country_code": "AE",
        "country_name_en": "United Arab Emirates",
        "country_name_ar": "الإمارات العربية المتحدة",
        "vat_rate": 5.0,
        "currency": "AED",
        "mandatory_threshold": 375000,
        "voluntary_threshold": 187500,
        "status": "ACTIVE",
        "status_ar": "نشط",
        "effective_date": "2018-01-01",
        "amendment_date": "2026-01-01",
        "penalty_change_date": "2026-04-14",
        "penalty_rate_annual": 14.0,
        "authority": "Federal Tax Authority (FTA)",
        "authority_ar": "الهيئة الاتحادية للضرائب",
        "website": "https://tax.gov.ae",
        "notes_en": "Penalty rate changes to 14% annual from April 14, 2026",
        "notes_ar": "تتغير نسبة الغرامة إلى 14٪ سنوياً اعتباراً من 14 أبريل 2026"
    },
    "KSA": {
        "country_code": "SA",
        "country_name_en": "Kingdom of Saudi Arabia",
        "country_name_ar": "المملكة العربية السعودية",
        "vat_rate": 15.0,
        "currency": "SAR",
        "mandatory_threshold": 375000,
        "voluntary_threshold": 187500,
        "status": "ACTIVE",
        "status_ar": "نشط",
        "effective_date": "2018-01-01",
        "rate_increase_date": "2020-07-01",
        "amendment_date": "2026-01-01",
        "authority": "Zakat, Tax and Customs Authority (ZATCA)",
        "authority_ar": "هيئة الزكاة والضريبة والجمارك",
        "website": "https://zatca.gov.sa",
        "notes_en": "Rate increased from 5% to 15% in July 2020. ZATCA amendments effective January 2026",
        "notes_ar": "زادت النسبة من 5٪ إلى 15٪ في يوليو 2020. تعديلات هيئة الزكاة والضريبة والجمارك سارية من يناير 2026"
    },
    "BAHRAIN": {
        "country_code": "BH",
        "country_name_en": "Kingdom of Bahrain",
        "country_name_ar": "مملكة البحرين",
        "vat_rate": 10.0,
        "currency": "BHD",
        "mandatory_threshold": 37500,
        "voluntary_threshold": 18750,
        "status": "ACTIVE",
        "status_ar": "نشط",
        "effective_date": "2019-01-01",
        "rate_increase_date": "2022-01-01",
        "authority": "National Bureau for Revenue (NBR)",
        "authority_ar": "الجهاز الوطني للإيرادات",
        "website": "https://www.nbr.gov.bh",
        "notes_en": "Rate raised from 5% to 10% in January 2022",
        "notes_ar": "رفعت النسبة من 5٪ إلى 10٪ في يناير 2022"
    },
    "OMAN": {
        "country_code": "OM",
        "country_name_en": "Sultanate of Oman",
        "country_name_ar": "سلطنة عمان",
        "vat_rate": 5.0,
        "currency": "OMR",
        "mandatory_threshold": 38500,
        "voluntary_threshold": 19250,
        "status": "ACTIVE",
        "status_ar": "نشط",
        "effective_date": "2021-04-16",
        "authority": "Oman Tax Authority (OTA)",
        "authority_ar": "جهاز الضرائب",
        "website": "https://tms.taxoman.gov.om",
        "notes_en": "VAT implemented in April 2021",
        "notes_ar": "تم تطبيق ضريبة القيمة المضافة في أبريل 2021"
    },
    "QATAR": {
        "country_code": "QA",
        "country_name_en": "State of Qatar",
        "country_name_ar": "دولة قطر",
        "vat_rate": 0.0,
        "currency": "QAR",
        "mandatory_threshold": None,
        "voluntary_threshold": None,
        "status": "PENDING",
        "status_ar": "قيد الانتظار",
        "effective_date": None,
        "authority": "General Tax Authority (GTA)",
        "authority_ar": "الهيئة العامة للضرائب",
        "website": "https://gta.gov.qa",
        "notes_en": "VAT expected soon. Businesses should prepare systems now before implementation",
        "notes_ar": "من المتوقع تطبيق ضريبة القيمة المضافة قريباً. يجب على الشركات تجهيز أنظمتها الآن قبل التطبيق"
    },
    "KUWAIT": {
        "country_code": "KW",
        "country_name_en": "State of Kuwait",
        "country_name_ar": "دولة الكويت",
        "vat_rate": 0.0,
        "currency": "KWD",
        "mandatory_threshold": None,
        "voluntary_threshold": None,
        "status": "PENDING",
        "status_ar": "قيد الانتظار",
        "effective_date": None,
        "authority": "Ministry of Finance",
        "authority_ar": "وزارة المالية",
        "website": "https://www.mof.gov.kw",
        "notes_en": "VAT under cabinet review. Businesses should prepare systems now before implementation",
        "notes_ar": "ضريبة القيمة المضافة قيد المراجعة من قبل مجلس الوزراء. يجب على الشركات تجهيز أنظمتها الآن قبل التطبيق"
    }
}

# Supported languages
SUPPORTED_LANGUAGES = ["en", "ar"]

# CORS settings
CORS_ORIGINS = ["*"]

# API settings
API_TIMEOUT = 30  # seconds
MAX_RETRIES = 3

# Made with Bob
