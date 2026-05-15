# 🧮 BOBVAT - GCC VAT Compliance Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **AI-powered bilingual (Arabic/English) VAT compliance assistant for Gulf SMEs**

BOBVAT is the first comprehensive VAT platform covering all 6 GCC countries with real-time data, precise calculations, and legal citations. Built specifically for Gulf businesses to simplify tax compliance.

![BOBVAT Platform](public/Home.png)

---

## 🌟 Key Features

### 🌍 Complete GCC Coverage

![GCC Countries Coverage](public/6%20countries.png)

- **UAE** (5% VAT) - Active
- **Saudi Arabia** (15% VAT) - Active
- **Bahrain** (10% VAT) - Active
- **Oman** (5% VAT) - Active
- **Qatar** (Pending) - Advisory mode
- **Kuwait** (Pending) - Advisory mode

### 🛠️ 10+ Professional Tools

1. **VAT Calculator** - Instant calculations with live rate lookups and legal citations
2. **Registration Checker** - Verify mandatory threshold status with revenue comparisons
3. **Invoice Validator** - Smart analytics to check VAT compliance on invoices
4. **Cross-Border Advisor** - B2B/B2C international transaction rules
5. **Penalty Calculator** - Estimate late filing/payment fines (includes UAE 2026 rules)
6. **Tax Consultant Chat** - Bilingual AI assistant with live web search
7. **Exempt/Zero-Rate Checker** - Verify tax-free product categories
8. **Kuwait/Qatar Readiness** - Prepare for upcoming VAT implementations
9. **Deadline Tracker** - Never miss monthly/quarterly filing dates
10. **Live News Feed** - Real-time regulatory updates and rate changes

### 🎯 Core Capabilities

- ✅ **Bilingual Support** - Full Arabic and English interface
- ✅ **Live Data Search** - Real-time database monitoring for latest regulations
- ✅ **Legal Citations** - Every calculation includes source references
- ✅ **Bank-Grade Accuracy** - Precision calculations for financial compliance
- ✅ **Smart Analytics** - Context-aware insights and recommendations
- ✅ **API Integration** - REST API for ERP/POS system integration

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x or higher
- **npm** or **yarn** or **pnpm**
- **Backend API** running on `http://localhost:8000` (required for full functionality)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bob-vat-frontend.git
cd bob-vat-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
bob-vat-frontend/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with Navbar & Footer
│   ├── page.tsx             # Homepage with hero & services
│   ├── calculator/          # VAT Calculator tool
│   ├── registration/        # Registration checker
│   ├── invoice/             # Invoice validator
│   ├── cross-border/        # Cross-border advisor
│   ├── penalty/             # Penalty calculator
│   ├── ask/                 # AI chat consultant
│   ├── exempt/              # Exempt/zero-rate checker
│   ├── readiness/           # Kuwait/Qatar readiness
│   ├── deadline/            # Deadline tracker
│   ├── news/                # Live news feed
│   ├── countries/           # GCC countries overview
│   ├── services/            # Services listing
│   └── about/               # About page
├── components/              # Reusable React components
│   ├── Navbar.tsx          # Navigation bar
│   └── Footer.tsx          # Footer with links
├── public/                  # Static assets
│   ├── logo.png            # BOBVAT logo
│   ├── hero-section-image.png
│   └── *.svg               # Icon assets
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
└── README.md               # This file
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API URL (default: http://localhost:8000)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### API Integration

All services connect to the backend API. Ensure the backend is running:

```bash
# Backend should be accessible at
http://localhost:8000

# API Documentation
http://localhost:8000/docs
```

---

## 🎨 Tech Stack

### Frontend
- **Framework**: Next.js 16.2.6 (App Router)
- **UI Library**: React 19.2.4
- **Language**: TypeScript 5.x
- **Styling**: Custom CSS with CSS Variables
- **Markdown**: react-markdown + remark-gfm

### Development Tools
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript strict mode
- **Package Manager**: npm

---

## 📊 Available Scripts

```bash
# Development
npm run dev          # Start dev server on localhost:3000

# Production
npm run build        # Create optimized production build
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint checks
```

---

## 🌐 Key Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero section and service overview |
| `/calculator` | VAT calculation tool with live rates |
| `/registration` | Check mandatory registration threshold |
| `/invoice` | Validate invoice VAT compliance |
| `/cross-border` | International transaction advisor |
| `/penalty` | Calculate late payment penalties |
| `/ask` | AI-powered tax consultant chat |
| `/exempt` | Check exempt/zero-rated categories |
| `/readiness` | Kuwait/Qatar implementation prep |
| `/deadline` | Track filing deadlines |
| `/news` | Live VAT news and updates |
| `/countries` | Detailed GCC country information |
| `/services` | Complete services listing |
| `/about` | About BOBVAT platform |

---

## 🎯 Features in Detail

### VAT Calculator

![VAT Calculator Tool](public/Calculate%20VAT.png)

- Real-time rate lookups for all 6 GCC countries
- Support for Standard, Exempt, Zero-Rated products
- Special categories: Food, Medical, Education
- Legal citations with every calculation
- Multi-currency support (AED, SAR, BHD, OMR, QAR, KWD)

### Registration Checker
- Compare revenue against mandatory thresholds
- Voluntary registration guidance
- Currency conversion support
- Deadline recommendations

### Invoice Validator
- Extract data from invoice text
- Verify VAT rate application
- Check required legal fields
- Highlight errors with correction suggestions

### Cross-Border Advisor
- B2B vs B2C transaction rules
- Import/Export VAT treatment
- Reverse charge mechanism guidance
- Zero-rating eligibility

### Penalty Calculator
- Late payment fee estimation
- Late filing penalty calculation
- UAE 14% annual penalty (April 2026)
- Reduction strategy recommendations

---

## 🔐 Security & Compliance

- No sensitive data stored on frontend
- All calculations verified with legal sources
- HTTPS recommended for production
- API authentication handled by backend
- CORS configured for secure API access

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- **Netlify**
- **AWS Amplify**
- **Google Cloud Run**
- **Docker** (create Dockerfile)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Documentation**: [API Docs](http://localhost:8000/docs)
- **Issues**: [GitHub Issues](https://github.com/yourusername/bob-vat-frontend/issues)
- **Email**: support@bobvat.com

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by AI analytics and live web search
- Designed for Gulf SMEs and tax professionals
- First platform to cover all 6 GCC countries

---

## 📈 Roadmap

- [ ] Mobile app (iOS/Android)
- [ ] Offline mode support
- [ ] Advanced reporting dashboard
- [ ] Multi-user team accounts
- [ ] Integration with popular accounting software
- [ ] Automated tax filing submission

---

**Made with ❤️ for Gulf businesses**

*BOBVAT - Breathe Easy This Tax Season, We'll Sort the Numbers*
