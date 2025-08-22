# 🚀 KisanSafe Deployment Guide

## Quick Deploy Options

### 1. **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Add: GEMINI_API_KEY, OPENAI_API_KEY, HUGGING_FACE_API_KEY
```

### 2. **Netlify**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=.next
```

### 3. **Docker Deployment**
```bash
# Build Docker image
docker build -t kisansafe .

# Run container
docker run -p 3000:3000 --env-file .env.local kisansafe
```

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Get API keys:
   - **Gemini**: https://makersuite.google.com/app/apikey (Free)
   - **OpenAI**: https://platform.openai.com/api-keys ($5 credit)
   - **Hugging Face**: https://huggingface.co/settings/tokens (Free)

## Performance Optimizations

- ✅ Static generation for better SEO
- ✅ Image optimization enabled
- ✅ Code splitting implemented
- ✅ API route caching
- ✅ Gzip compression

## Security Features

- ✅ Environment variables secured
- ✅ Input sanitization
- ✅ XSS protection
- ✅ API rate limiting ready