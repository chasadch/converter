#!/usr/bin/env python3
"""
Network Connectivity Test Script
Run this to diagnose DNS and internet connectivity issues
"""

import socket
import sys

def test_dns():
    """Test DNS resolution"""
    print("=" * 60)
    print("TEST 1: DNS Resolution")
    print("=" * 60)
    
    domains = [
        'www.youtube.com',
        'www.google.com',
        'www.cloudflare.com',
    ]
    
    success = True
    for domain in domains:
        try:
            ip = socket.gethostbyname(domain)
            print(f"✅ {domain:30} -> {ip}")
        except socket.gaierror as e:
            print(f"❌ {domain:30} -> FAILED: {e}")
            success = False
    
    return success

def test_https():
    """Test HTTPS connectivity"""
    print("\n" + "=" * 60)
    print("TEST 2: HTTPS Connectivity")
    print("=" * 60)
    
    try:
        import requests
    except ImportError:
        print("❌ 'requests' library not installed. Run: pip install requests")
        return False
    
    urls = [
        'https://www.youtube.com',
        'https://www.google.com',
        'https://api.github.com',
    ]
    
    success = True
    for url in urls:
        try:
            response = requests.get(url, timeout=10)
            status = response.status_code
            print(f"✅ {url:40} -> Status {status}")
        except Exception as e:
            print(f"❌ {url:40} -> FAILED: {e}")
            success = False
    
    return success

def test_ytdlp():
    """Test yt-dlp functionality"""
    print("\n" + "=" * 60)
    print("TEST 3: yt-dlp Video Info Extraction")
    print("=" * 60)
    
    try:
        import yt_dlp
    except ImportError:
        print("❌ 'yt-dlp' library not installed. Run: pip install yt-dlp")
        return False
    
    test_url = 'https://www.youtube.com/watch?v=jNQXAC9IVRw'  # "Me at the zoo" - first YouTube video
    
    try:
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': False,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(test_url, download=False)
            title = info.get('title', 'N/A')
            duration = info.get('duration', 0)
            uploader = info.get('uploader', 'N/A')
            
            print(f"✅ Video info extracted successfully!")
            print(f"   Title:    {title}")
            print(f"   Uploader: {uploader}")
            print(f"   Duration: {duration}s")
            return True
            
    except Exception as e:
        print(f"❌ yt-dlp test FAILED: {e}")
        return False

def test_ffmpeg():
    """Test FFmpeg availability"""
    print("\n" + "=" * 60)
    print("TEST 4: FFmpeg Availability")
    print("=" * 60)
    
    import shutil
    import subprocess
    
    ffmpeg_path = shutil.which('ffmpeg')
    if ffmpeg_path:
        print(f"✅ FFmpeg found at: {ffmpeg_path}")
        try:
            result = subprocess.run(
                ['ffmpeg', '-version'],
                capture_output=True,
                text=True,
                timeout=5
            )
            version_line = result.stdout.split('\n')[0]
            print(f"   Version: {version_line}")
            return True
        except Exception as e:
            print(f"⚠️  FFmpeg found but cannot execute: {e}")
            return False
    else:
        print("❌ FFmpeg not found in PATH")
        return False

def get_system_info():
    """Get system information"""
    print("\n" + "=" * 60)
    print("SYSTEM INFORMATION")
    print("=" * 60)
    
    import platform
    import os
    
    print(f"OS:              {platform.system()} {platform.release()}")
    print(f"Python:          {platform.python_version()}")
    print(f"Architecture:    {platform.machine()}")
    print(f"Hostname:        {socket.gethostname()}")
    
    # Check if running in Docker
    if os.path.exists('/.dockerenv'):
        print(f"Environment:     🐳 Docker Container")
    else:
        print(f"Environment:     💻 Host System")
    
    # Check DNS servers
    try:
        with open('/etc/resolv.conf', 'r') as f:
            dns_lines = [line.strip() for line in f if line.startswith('nameserver')]
            if dns_lines:
                print(f"\nConfigured DNS Servers:")
                for line in dns_lines:
                    print(f"  {line}")
    except:
        print(f"\nDNS Config:      Not accessible (Windows or permissions)")

def main():
    """Run all tests"""
    print("\n🔍 NETWORK CONNECTIVITY DIAGNOSTIC TOOL")
    print("=" * 60)
    print("This script tests if your system can download videos\n")
    
    get_system_info()
    
    results = {
        'DNS Resolution': test_dns(),
        'HTTPS Connectivity': test_https(),
        'yt-dlp Functionality': test_ytdlp(),
        'FFmpeg Availability': test_ffmpeg(),
    }
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    
    all_passed = True
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name:25} {status}")
        if not result:
            all_passed = False
    
    print("\n" + "=" * 60)
    
    if all_passed:
        print("🎉 ALL TESTS PASSED! Video downloading should work.")
        print("=" * 60)
        return 0
    else:
        print("⚠️  SOME TESTS FAILED!")
        print("=" * 60)
        print("\n📖 Solutions:")
        
        if not results['DNS Resolution']:
            print("\n🔧 DNS Fix (Docker):")
            print("   docker run --dns 8.8.8.8 --dns 8.8.4.4 ...")
            print("   Or use the provided docker-compose.yml")
            
        if not results['HTTPS Connectivity']:
            print("\n🔧 Network Fix:")
            print("   - Check firewall settings")
            print("   - Disable VPN temporarily")
            print("   - Check antivirus settings")
            
        if not results['yt-dlp Functionality']:
            print("\n🔧 yt-dlp Fix:")
            print("   pip install --upgrade yt-dlp")
            
        if not results['FFmpeg Availability']:
            print("\n🔧 FFmpeg Fix:")
            print("   - Linux: sudo apt install ffmpeg")
            print("   - Windows: Download from https://ffmpeg.org")
            print("   - Mac: brew install ffmpeg")
        
        print("\n📚 See TROUBLESHOOTING.md for detailed solutions")
        print("=" * 60)
        return 1

if __name__ == '__main__':
    sys.exit(main())

