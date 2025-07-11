# Contributing to LaxCheck

Thank you for your interest in contributing to LaxCheck! This project exists to help the lacrosse community fight equipment scams and preserve lacrosse history through accurate identification technology.

## 🎯 Ways to Contribute

### 1. ML Model Training Data
- **Submit Photos**: High-quality photos of lacrosse heads for training
- **Verify Classifications**: Help validate ML predictions
- **Add New Classes**: Contribute photos for rare or missing head models
- **Improve Accuracy**: Report incorrect identifications with correct labels

### 2. Market Data & Pricing
- **Sales Data**: Historical sales prices from legitimate marketplaces
- **Condition Guidelines**: Help define accurate condition assessment criteria
- **Rarity Information**: Production numbers, years, and collectible insights
- **Market Trends**: Regional pricing variations and market dynamics

### 3. Code Contributions
- **Bug Fixes**: Resolve issues and improve stability
- **Feature Development**: Enhance identification algorithms and user experience
- **Performance Optimization**: Improve processing speed and accuracy
- **Mobile Support**: Enhance mobile/tablet compatibility

### 4. Documentation
- **Setup Guides**: Improve installation and deployment instructions
- **API Documentation**: Document endpoints and data structures
- **User Tutorials**: Create guides for using the identification system
- **Developer Docs**: Technical documentation for contributors

## 🛠️ Development Setup

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Git
- Code editor (VS Code recommended)

### Local Development

1. **Fork and Clone**
```bash
git clone https://github.com/yourusername/laxcheck.git
cd laxcheck
git remote add upstream https://github.com/original/laxcheck.git
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Database Setup**
```bash
npm run db:push
```

5. **Start Development**
```bash
npm run dev
```

### Code Structure

```
laxcheck/
├── client/               # React frontend
├── server/              # Node.js backend  
├── shared/              # Shared types
├── model/               # ML model files
└── electron/            # Desktop app
```

## 📋 Contribution Guidelines

### Code Quality
- **TypeScript**: Use TypeScript for all new code
- **Formatting**: Follow existing code style (Prettier/ESLint)
- **Testing**: Add tests for new features when applicable
- **Documentation**: Include JSDoc comments for new functions

### Commit Standards
- **Format**: Use conventional commit format
- **Messages**: Clear, descriptive commit messages
- **Scope**: Keep commits focused and atomic

Examples:
```bash
feat(ml): add support for STX Sabre identification
fix(api): resolve image upload timeout issue
docs(readme): update installation instructions
```

### Pull Request Process

1. **Branch Strategy**
   - Create feature branches from `main`
   - Use descriptive branch names: `feature/add-stx-sabre-support`

2. **Development Process**
   - Make your changes
   - Test thoroughly
   - Update documentation if needed
   - Ensure all tests pass

3. **Pull Request**
   - Clear title and description
   - Reference related issues
   - Include screenshots for UI changes
   - Request review from maintainers

### Code Review Criteria
- **Functionality**: Code works as intended
- **Performance**: No significant performance regression
- **Security**: No security vulnerabilities
- **Compatibility**: Works across target platforms
- **Documentation**: Adequate documentation for changes

## 🔬 ML Model Contributions

### Photo Submission Guidelines

**Quality Requirements:**
- High resolution (1024x1024+ preferred)
- Good lighting and contrast
- Clear view of lacrosse head
- Minimal background distractions
- Multiple angles per head model

**Submission Process:**
1. Organize photos by head model
2. Include metadata (year, condition, etc.)
3. Submit via GitHub issue or pull request
4. Provide verification/authentication if available

**Naming Convention:**
```
brand_model_condition_angle_uniqueid.jpg
warrior_blade_used_front_001.jpg
brine_edge_new_side_002.jpg
```

### Training Data Standards
- Minimum 15 photos per class
- Balanced representation of conditions
- Diverse lighting and backgrounds
- Verified authenticity when possible

## 🏷️ Issue Management

### Bug Reports
- **Template**: Use the bug report template
- **Details**: Include steps to reproduce
- **Environment**: Specify browser, OS, device
- **Screenshots**: Include relevant screenshots

### Feature Requests
- **Template**: Use the feature request template
- **Use Case**: Describe the problem being solved
- **Implementation**: Suggest technical approach if known
- **Impact**: Explain benefit to community

### Discussion Topics
- Use GitHub Discussions for open-ended topics
- Include relevant tags and categories
- Be respectful and constructive

## 🌍 Community Guidelines

### Communication
- **Respectful**: Treat all contributors with respect
- **Constructive**: Provide helpful feedback
- **Inclusive**: Welcome contributors of all skill levels
- **Patient**: Remember this is volunteer work

### Community Standards
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)
- Help newcomers get started
- Share knowledge and resources
- Credit other contributors appropriately

### Collaboration Opportunities
- **Mentorship**: Help new contributors learn
- **Code Review**: Review pull requests from others
- **Testing**: Help test new features and bug fixes
- **Documentation**: Improve and maintain docs

## 🚀 Release Process

### Versioning
- Follow semantic versioning (MAJOR.MINOR.PATCH)
- Tag releases with version numbers
- Maintain changelog for each release

### Deployment
- **Staging**: Test changes in staging environment
- **Production**: Deploy to production after thorough testing
- **Rollback**: Have rollback plan for critical issues

## 🎖️ Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special recognition for major features or improvements

## 📞 Getting Help

- **Discord**: Join our community Discord (coming soon)
- **GitHub Discussions**: Ask questions and get help
- **Issues**: Report bugs and request features
- **Email**: Contact maintainers directly for sensitive issues

## 📜 Legal

By contributing to LaxCheck, you agree that your contributions will be licensed under the same MIT License that covers the project. You also confirm that you have the right to contribute your work.

---

**Thank you for helping make lacrosse equipment identification better for everyone!**

*Your contributions help preserve lacrosse history and protect collectors from fraudulent sales.*