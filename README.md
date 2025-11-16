# sitemap.duyet.net

> **A modern, secure, accessible sitemap aggregator for all duyet.net domains**

[![CI/CD](https://github.com/duyet-website/sitemap.duyet.net/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/duyet-website/sitemap.duyet.net/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 🚀 Features

### Performance & Modern Stack
- ⚡ **Vite** - Lightning-fast build tool with HMR
- 🎨 **Bootstrap 5** - Latest responsive framework
- 📦 **Zero jQuery** - Pure vanilla JavaScript, modern ES6+
- 🔥 **Optimized Bundle** - Minified, tree-shaken, and compressed

### Security
- 🔒 **HTTPS Everywhere** - All links use secure protocols
- 🛡️ **Content Security Policy** - Strict CSP headers
- 🔐 **Subresource Integrity** - SRI hashes for external resources
- 🚫 **No Hardcoded Secrets** - Environment-based configuration
- ✅ **Security Headers** - HSTS, X-Frame-Options, etc.

### User Experience
- 🌓 **Dark Mode** - Automatic theme detection + manual toggle
- 🔍 **Smart Search** - Debounced, with loading states and error handling
- ♿ **Accessible** - ARIA labels, semantic HTML, keyboard navigation
- 📱 **Responsive** - Mobile-first design
- 🎯 **PWA Ready** - Service worker, offline support, installable

### SEO & Analytics
- 📊 **Google Analytics 4** - Privacy-focused tracking
- 🗺️ **sitemap.xml** - Search engine optimization
- 🤖 **robots.txt** - Crawler configuration
- 📈 **Open Graph** - Social media previews
- 🐦 **Twitter Cards** - Rich link previews

### Developer Experience
- 📝 **TypeScript-ready** - Type checking with JSDoc
- 🧹 **ESLint + Prettier** - Code quality and formatting
- 🔄 **GitHub Actions** - Automated CI/CD pipeline
- 📚 **Comprehensive Documentation**

## 🛠️ Tech Stack

- **Build Tool**: Vite 5
- **Framework**: Vanilla JavaScript (ES6+)
- **CSS Framework**: Bootstrap 5.3
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/duyet-website/sitemap.duyet.net.git
cd sitemap.duyet.net

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### Development

```bash
# Start development server with HMR
npm run dev

# The site will be available at http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## 📁 Project Structure

```
sitemap.duyet.net/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD
├── public/
│   ├── _headers                # Security headers
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt              # Crawler config
│   ├── sitemap.xml             # SEO sitemap
│   └── sw.js                   # Service worker
├── src/
│   ├── css/
│   │   └── main.css            # Custom styles
│   ├── js/
│   │   └── main.js             # Application logic
│   └── index.html              # Main HTML template
├── .env                        # Environment variables (not in git)
├── .env.example                # Environment template
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── package.json                # Dependencies and scripts
├── sitemap.json                # Sitemap data source
├── tsconfig.json               # TypeScript configuration
└── vite.config.js              # Vite configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# OpenSearchServer Configuration
VITE_OSS_SERVER=//oss.duyetdev.com
VITE_OSS_API_KEY=your_api_key_here

# Google Analytics (Optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Application
VITE_APP_NAME=sitemap.duyet.net
VITE_APP_VERSION=2.0.0
```

### Updating Sitemap

Edit `sitemap.json` to add or modify links:

```json
[
  {
    "node": "example.duyet.net",
    "url": "https://example.duyet.net",
    "sub": [
      { "node": "About", "url": "https://example.duyet.net/about" },
      { "node": "Contact", "url": "https://example.duyet.net/contact" }
    ]
  }
]
```

## 🚢 Deployment

### GitHub Pages

The project includes a GitHub Actions workflow that automatically builds and deploys to GitHub Pages on push to `main`.

### Manual Deployment

```bash
# Build for production
npm run build

# The dist/ folder contains the production-ready files
# Deploy the contents to your hosting service
```

### Netlify/Vercel

Simply connect your repository and these platforms will automatically detect the Vite configuration.

## 🔒 Security

This project follows security best practices:

- ✅ No hardcoded credentials
- ✅ Content Security Policy
- ✅ Subresource Integrity
- ✅ HTTPS enforcement
- ✅ Regular dependency updates
- ✅ Automated security audits in CI

**Found a security issue?** Please email security@duyet.net instead of opening a public issue.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Van-Duyet Le**

- Website: [duyet.net](https://duyet.net)
- GitHub: [@duyetdev](https://github.com/duyetdev)
- Email: me@duyet.net

## 🎯 What's New in v2.0.0

### Migrated from Grunt to Vite
- 10x faster builds
- Hot Module Replacement
- Modern JavaScript features
- Better developer experience

### Complete Rewrite
- Removed jQuery dependency (50KB saved)
- Modern vanilla JavaScript with ES6+
- Bootstrap 3 → Bootstrap 5
- Old Google Analytics → GA4

### Security Enhancements
- Moved API keys to environment variables
- Added Content Security Policy
- Implemented Subresource Integrity
- All HTTP links converted to HTTPS

### New Features
- Dark mode support
- PWA capabilities (offline support)
- Improved search with loading states
- Better error handling
- Full accessibility (WCAG 2.1)
- SEO optimizations

### Developer Experience
- ESLint + Prettier setup
- TypeScript-ready
- GitHub Actions CI/CD
- Automated security audits

---

**Version 2.0.0** - Built with ❤️ by Van-Duyet Le
