# Troubleshooting Guide - Video Download DNS Error

## Problem
❌ **Error**: "Failed to resolve 'www.youtube.com' ([Errno -5] No address associated with hostname)"

This means your server/container cannot resolve domain names (DNS failure).

---

## Solutions (Choose Based on Your Setup)

### 🐳 **Solution 1: Docker with DNS Configuration**

#### Option A: Using docker-compose (RECOMMENDED)
```bash
# Use the provided docker-compose.yml
docker-compose up -d
```

#### Option B: Docker run with DNS flags
```bash
docker run -p 7860:7860 \
  --dns 8.8.8.8 \
  --dns 8.8.4.4 \
  --dns 1.1.1.1 \
  allinone-converter
```

#### Option C: Configure Docker daemon globally
Edit `/etc/docker/daemon.json` (Linux/Mac) or Docker Desktop settings (Windows):
```json
{
  "dns": ["8.8.8.8", "8.8.4.4", "1.1.1.1"]
}
```

Then restart Docker:
```bash
# Linux
sudo systemctl restart docker

# Windows/Mac
# Restart Docker Desktop application
```

---

### 🪟 **Solution 2: Windows Local Development**

#### Check if backend is running locally (not in Docker):
```powershell
# Test DNS resolution
nslookup www.youtube.com

# If it fails, flush DNS cache
ipconfig /flushdns

# Reset network adapter
netsh winsock reset
netsh int ip reset

# Restart computer
```

#### Check Firewall:
1. Open **Windows Defender Firewall**
2. Click **Allow an app through firewall**
3. Ensure **Python** has both Private and Public network access

#### Check Antivirus:
- Temporarily disable antivirus to test
- Add Python to whitelist if it works

---

### 🌐 **Solution 3: Hugging Face Spaces**

If deploying to Hugging Face Spaces, the DNS should work automatically. However:

1. Check Space logs for network errors
2. Verify your Space has **internet access enabled** (some private spaces may have restrictions)
3. Try restarting the Space

---

### 🔧 **Solution 4: Network Proxy/VPN Issues**

If behind a corporate proxy:

#### Update requirements.txt to add:
```
urllib3[socks]
pysocks
```

#### Set environment variables:
```bash
export HTTP_PROXY="http://proxy.company.com:8080"
export HTTPS_PROXY="http://proxy.company.com:8080"
export NO_PROXY="localhost,127.0.0.1"
```

---

### 🧪 **Solution 5: Test Network Connectivity**

#### Run diagnostic script:
```python
# Create test_network.py
import socket
import requests

print("Testing DNS resolution...")
try:
    ip = socket.gethostbyname('www.youtube.com')
    print(f"✅ DNS works! YouTube IP: {ip}")
except Exception as e:
    print(f"❌ DNS failed: {e}")

print("\nTesting HTTPS connection...")
try:
    response = requests.get('https://www.youtube.com', timeout=10)
    print(f"✅ HTTPS works! Status: {response.status_code}")
except Exception as e:
    print(f"❌ HTTPS failed: {e}")

print("\nTesting yt-dlp...")
try:
    import yt_dlp
    ydl = yt_dlp.YoutubeDL({'quiet': True})
    info = ydl.extract_info('https://www.youtube.com/watch?v=dQw4w9WgXcQ', download=False)
    print(f"✅ yt-dlp works! Video title: {info.get('title', 'N/A')}")
except Exception as e:
    print(f"❌ yt-dlp failed: {e}")
```

Run it:
```bash
# In backend directory
python test_network.py
```

---

## Quick Fix Commands

### Docker
```bash
# Stop container
docker stop <container-id>

# Rebuild with DNS fix
docker-compose up --build -d

# Or use docker run with DNS
docker run -p 7860:7860 --dns 8.8.8.8 --dns 8.8.4.4 allinone-converter
```

### Local (Windows)
```powershell
# Quick network reset
ipconfig /flushdns
netsh winsock reset
# Then restart the application
```

---

## Still Not Working?

### Check these:
1. ✅ Firewall allows Python/uvicorn
2. ✅ No VPN blocking connections
3. ✅ Antivirus not blocking network
4. ✅ Internet connection is active
5. ✅ Router/ISP not blocking YouTube
6. ✅ System date/time is correct (affects SSL certificates)

### Get detailed logs:
```bash
# Run backend with verbose logging
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --log-level debug
```

### Test with alternative video URL:
Try a different video or platform to see if it's YouTube-specific:
- Instagram: `https://www.instagram.com/p/...`
- Twitter: `https://twitter.com/user/status/...`
- TikTok: `https://www.tiktok.com/@user/video/...`

---

## Prevention

### Add to your deployment checklist:
- [ ] DNS servers configured (8.8.8.8, 8.8.4.4)
- [ ] Firewall rules allow outbound HTTPS
- [ ] yt-dlp is up to date (`pip install --upgrade yt-dlp`)
- [ ] Network connectivity test passes
- [ ] Logs show successful DNS resolution

---

## Emergency Workaround

If you need video downloads working IMMEDIATELY and can't fix DNS:

### Option: Use a different server
Deploy to a platform with guaranteed internet access:
- ✅ Hugging Face Spaces (free, has internet)
- ✅ Railway.app (has internet)
- ✅ Render.com (has internet)
- ✅ Heroku (has internet)

### Option: Download locally and upload
1. Disable video download feature temporarily
2. Download videos manually on your computer
3. Use the file converter features instead

---

## Contact Support

If none of these work, provide these details:
1. Operating System and version
2. Docker version (if using Docker)
3. Output of `test_network.py` script
4. Full error logs
5. Are you behind a corporate firewall/proxy?

