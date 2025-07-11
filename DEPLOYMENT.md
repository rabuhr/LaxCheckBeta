# LaxCheck Deployment Guide

## GitHub Repository Setup

This repository contains the complete LaxCheck lacrosse head identification system.

### Repository Structure
```
laxcheck/
├── client/src/           # React frontend
│   ├── App.tsx          # Main app component
│   ├── components/      # React components
│   ├── pages/          # Page components
│   └── ...
├── server/             # Node.js backend
├── model/              # TensorFlow ML model
├── shared/             # Shared types
└── README.md           # Project documentation
```

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database
- OpenAI API key (optional)
- xAI Grok API key (optional)

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

4. **Set up database**
```bash
npm run db:push
```

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string

Optional (for enhanced AI analysis):
- `OPENAI_API_KEY` - OpenAI API key for GPT-4 Vision
- `XAI_API_KEY` - xAI Grok API key for enhanced analysis

## Production Deployment

### Replit (Recommended)
1. Import repository into Replit
2. Add environment variables in Secrets
3. Run the project

### Docker
```bash
docker build -t laxcheck .
docker run -p 5000:5000 laxcheck
```

### Manual Deployment
1. Build the frontend: `npm run build`
2. Start the server: `npm start`

## Features

- **ML Identification**: 96.6% accuracy TensorFlow model
- **Dual AI Analysis**: Grok 2 + OpenAI GPT-4o integration
- **Real-time Pricing**: Market analysis and valuation
- **Mobile Support**: Full mobile photo upload support
- **14 Lacrosse Head Classes**: Comprehensive equipment database

## Support

For technical support or questions, please open an issue in this repository.

## License

MIT License - See LICENSE file for details.