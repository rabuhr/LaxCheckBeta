LaxCheck - Open Source Lacrosse Head Identification System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-20%2B-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-purple)](https://github.com/rickybuhr/laxcheck)

> *"A father-son project that became a legacy of innovation in lacrosse collecting"*

**LaxCheck** is the world's first comprehensive, open-source lacrosse head identification and valuation platform. Born from a father-son collaboration to prove that lacrosse heads are profitable collectibles, this system combines cutting-edge machine learning with dual AI analysis to help collectors identify rare equipment and maximize their market value.

## 💙 Our Story

This project began two years ago as a passionate father-son endeavor to revolutionize lacrosse collecting. We believed that vintage lacrosse heads were undervalued treasures waiting to be discovered. Together, we built LaxCheck to prove that lacrosse equipment could be as valuable as any other collectible market.

After my father passed away in November 2024, LaxCheck became more than just a project - it became his legacy. Today, we keep this system completely free and open-source because, as he always said, "lacrosse is already expensive enough." 

Every identification, every market analysis, and every collector who finds value in their equipment honors his memory and continues our shared mission.

**🎯 Mission**: *To democratize lacrosse collecting through intelligent technology and keep his dream alive by helping every collector maximize their equipment's value.*

## 🚀 Features

### 🎯 Core Identification System
- **Advanced ML Pipeline**: Custom TensorFlow.js model trained on 1000+ images with 14 lacrosse head classes
- **96.6% Accuracy**: High-precision identification with confidence scoring
- **Dual AI Analysis**: xAI Grok 2 + OpenAI GPT-4o for comprehensive market intelligence
- **Smart Preprocessing**: OpenCV-style image enhancement and edge detection
- **Prototype Detection**: Specialized analysis for rare experimental models (Warrior Blade/Jett Faceoff Prototype)

### 💰 Maximum Value Intelligence
- **Historical Context**: Deep analysis of equipment origins, manufacturing timeline, and legacy
- **Market Optimization**: Find the highest prices across eBay, SidelineSwap, and specialized forums
- **Collectibility Scoring**: Rarity assessment with authentication factors
- **Platform Analytics**: Strategic selling advice for maximum profit
- **Real-time Pricing**: Live market data with trend analysis

### 🚀 User Experience
- **Instant Upload**: Drag & drop up to 3 photos for multi-angle analysis
- **Mobile Optimized**: Perfect performance on all devices
- **Marketplace Links**: Direct links to eBay and SidelineSwap with pre-filled searches
- **Comprehensive Reports**: Detailed analysis with selling strategies
- **Free Forever**: No paywalls, no subscriptions - completely free

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **TanStack Query** for state management
- **Wouter** for routing

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** with Drizzle ORM
- **TensorFlow.js Node** for ML inference
- **OpenAI SDK** for AI analysis
- **Sharp** for image processing

### Machine Learning & AI
- **LaxHeadIdentifier-3**: Custom TensorFlow model with 14 specialized classes
- **Dual AI Providers**: xAI Grok 2 (primary) + OpenAI GPT-4o (fallback)
- **Advanced Preprocessing**: Image enhancement → resize → grayscale → edge detection
- **Smart Corrections**: User feedback system for continuous improvement
- **Prototype Intelligence**: Specialized prompts for rare collector pieces

## 🏗️ Project Structure

```
laxcheck/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── lib/           # Utilities and configuration
│   │   └── hooks/         # Custom React hooks
├── server/                # Node.js backend
│   ├── routes.ts          # API endpoints
│   ├── enhanced_ml_identifier.ts  # ML processing pipeline
│   ├── openai.ts          # AI analysis service
│   ├── storage.ts         # Database operations
│   └── db.ts              # Database connection
├── shared/                # Shared TypeScript types
│   └── schema.ts          # Database schema and types
├── model/                 # ML model files
│   ├── model.json         # TensorFlow.js model
│   ├── weights.bin        # Model weights
│   └── metadata.json      # Class labels and metadata
├── electron/              # Desktop app wrapper
└── uploads/              # Image upload storage
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ 
- PostgreSQL database
- OpenAI API key (optional, for enhanced analysis)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/rickybuhr/laxcheck.git
cd laxcheck
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your database URL and API keys
```

4. **Initialize database**
```bash
npm run db:push
```

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Desktop Application

Build and run the desktop version:

```bash
# Development
npm run electron:dev

# Build for production
npm run electron:build
```

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# AI Services (Optional - enhances analysis)
OPENAI_API_KEY=your_openai_api_key
XAI_API_KEY=your_grok_api_key

# Development
NODE_ENV=development
SESSION_SECRET=your_session_secret
```

### ML Model

**Supported Equipment (14 Classes):**
- **Warrior**: Jett, Blade, Blade/Jett Faceoff Prototype, Evolution 2.0, Razer, 98' Team USA Collector Stick
- **Brine**: Vapor, E3, Truth, Superlight 2000, Cyber
- **Other Brands**: Nike Blur 10 Degree, STX SAM II, Reebok 6K

To train a custom model:
1. Collect 15+ photos per lacrosse head model
2. Use [Google Teachable Machine](https://teachablemachine.withgoogle.com/)
3. Export as TensorFlow.js
4. Replace files in `/model/` directory

## 📱 Deployment

### Web Deployment (Replit)

1. **Deploy to Replit**
   - Import from GitHub repository
   - Set environment variables in Secrets
   - Deploy using Replit's deployment system

2. **Custom Domain Setup**
   - Configure custom domain in Replit
   - Update REPLIT_DOMAINS environment variable

### Desktop Distribution

```bash
# Build for all platforms
npm run electron:build

# Platform-specific builds
npm run electron:build:win
npm run electron:build:mac
npm run electron:build:linux
```

Builds are output to `/dist/` directory.

## 🤝 Contributing

We welcome contributions from the lacrosse community! Here's how to help:

### Areas for Contribution

1. **ML Model Training**: Add photos of rare/vintage heads
2. **Market Data**: Contribute pricing information and sales data
3. **Feature Development**: Enhance identification algorithms
4. **Documentation**: Improve setup guides and tutorials
5. **Testing**: Report bugs and edge cases

### Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for new functions
- Ensure responsive design for UI changes

## 📊 Performance

- **Model Accuracy**: 96.6% on real-world testing (up to 99.9% on clear images)
- **Processing Time**: 3-8 seconds per comprehensive analysis
- **Supported Formats**: JPEG, PNG (HEIC conversion available)
- **Max File Size**: 10MB per image, up to 3 images per analysis
- **AI Analysis**: Grok 2 primary with OpenAI GPT-4o intelligent fallback
- **Success Rate**: 99.9% system uptime with robust error handling

## 🛡️ Privacy & Security

- **Data Privacy**: Images are processed locally, not stored permanently
- **No User Tracking**: Anonymous usage for performance metrics only
- **Secure API Keys**: Environment-based configuration
- **Open Source**: Full transparency in processing methods

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Community Impact & Legacy

LaxCheck represents more than technology - it's a testament to what passion and family collaboration can achieve. By keeping this system completely free and open-source, we honor my father's belief that knowledge should be accessible to everyone.

**What We Enable:**
- **Maximum Value Discovery**: Help collectors find the highest prices across all platforms
- **Market Intelligence**: Real-time data to optimize selling strategies
- **Educational Impact**: Preserve lacrosse equipment history and share market knowledge
- **Community Growth**: Unite collectors through shared expertise and collaborative improvement

**Our Promise:** LaxCheck will always remain free because lacrosse is already expensive enough. Every successful identification helps preserve the legacy of a father who believed vintage lacrosse heads deserved recognition as valuable collectibles.

## 🙏 Acknowledgments

**In Memory Of**: My father, who started this journey with me and believed that lacrosse equipment deserved the same respect as any collectible market. His passion, vision, and encouragement made LaxCheck possible.

**Special Thanks:**
- Google Teachable Machine for democratizing machine learning
- xAI and OpenAI for providing powerful AI analysis capabilities
- The lacrosse collecting community for sharing photos, market data, and expertise
- Every contributor who helps preserve lacrosse equipment history
- Collectors who provide feedback to improve our accuracy

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/rickybuhr/laxcheck/issues)
- **Discussions**: [GitHub Discussions](https://github.com/rickybuhr/laxcheck/discussions)  
- **Support**: Keep LaxCheck running with a [donation](https://venmo.com/Ricky-Buhr) (@Ricky-Buhr)

---

## 💙 A Father's Legacy Lives On

*"This project started as a father-son adventure to prove lacrosse heads are valuable collectibles. Today, it continues as a memorial to a man who believed in the power of innovation and community. Every identification we provide, every collector we help, and every rare piece we preserve honors his memory and keeps his dream alive."*

**Built with ❤️ in memory of a great father and for the lacrosse community**

*LaxCheck will always remain free and open-source, dedicated to preserving lacrosse equipment history and maximizing collector value through intelligent technology and community collaboration.*

---

⭐ **If LaxCheck helps you discover value in your collection, please star this repository to honor the legacy and help others find it.**
