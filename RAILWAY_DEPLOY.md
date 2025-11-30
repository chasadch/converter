# Railway Deployment Guide

## Quick Deploy to Railway

### Prerequisites
- GitHub account
- Railway account (sign up at https://railway.app)
- Your code pushed to GitHub

### Deployment Steps

#### 1. Push Code to GitHub
```bash
git add .
git commit -m "feat: Add Railway deployment configuration"
git push origin main
```

#### 2. Deploy on Railway

**Option A: Via Railway Dashboard (Recommended)**
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will auto-detect the Dockerfile
6. Click "Deploy"

**Option B: Via Railway CLI**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up
```

#### 3. Configure Environment Variables

In Railway Dashboard → Variables, add:

```
VITE_SUPABASE_URL=https://boemtcdhdruvexwcegej.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZW10Y2RoZHJ1dmV4d2NlZ2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODc2NDIsImV4cCI6MjA3OTY2MzY0Mn0.IQZAe9UGYe9J53QTO8mG-NPgwIlQg_Vsruqo-TiD0C8
```

**Note:** Railway automatically sets the `PORT` variable.

#### 4. Update Supabase CORS

Once deployed, add your Railway domain to Supabase allowed CORS origins:

1. Go to Supabase Dashboard
2. Settings → API
3. Add your Railway URL (e.g., `https://your-app.railway.app`)

### Verify Deployment

Once deployed, test these endpoints:

- **Health Check:** `https://your-app.railway.app/health`
- **Frontend:** `https://your-app.railway.app/`
- **API Docs:** `https://your-app.railway.app/docs`

### Monitoring

Railway provides:
- **Logs:** Railway Dashboard → Deployments → Logs
- **Metrics:** CPU, Memory, Network usage
- **Custom Domain:** Settings → Domains

### Troubleshooting

**Build Fails:**
```bash
# Check logs in Railway dashboard
# Or via CLI:
railway logs
```

**Port Issues:**
- Railway automatically assigns PORT
- Dockerfile uses `${PORT:-7860}` fallback
- Health check: `/health` endpoint

**File Upload Issues:**
- Check Railway disk limits
- Consider using external storage (S3, Cloudinary)

### Cost Estimates

- **Starter:** $5/month (512MB RAM)
- **Developer:** $10/month (1GB RAM)
- **Pro:** $20/month (2GB RAM)

**Free Tier:**
- $5 credit/month
- Good for testing/development

### Rolling Back

```bash
# Via CLI
railway rollback

# Or in Dashboard
Deployments → Select previous version → Redeploy
```

### Custom Domain

1. Railway Dashboard → Settings → Domains
2. Click "Add Domain"
3. Enter your domain
4. Add CNAME record: `your-domain.com` → `your-app.railway.app`

---

## Project Structure

```
AllInOneConverter_Final/
├── backend/           # FastAPI backend
├── frontend/          # React frontend
├── Dockerfile         # Multi-stage build
├── railway.json       # Railway config
└── .railwayignore     # Deployment exclusions
```

## Support

- **Railway Docs:** https://docs.railway.app
- **Discord:** https://discord.gg/railway
- **Support:** support@railway.app
