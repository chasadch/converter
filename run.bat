@echo off
echo ==========================================
echo All-in-One Converter Setup & Launcher
echo ==========================================

echo.
echo [1/4] Checking Backend Environment...
if not exist "backend\venv" (
    echo Creating Python virtual environment...
    cd backend
    python -m venv venv
    cd ..
)

echo.
echo [2/4] Installing Backend Dependencies...
cd backend
call venv\Scripts\activate
pip install -r requirements.txt
cd ..

echo.
echo [3/4] Installing Frontend Dependencies...
if not exist "frontend\node_modules" (
    echo Installing Node modules...
    cd frontend
    call npm install
    cd ..
)

echo.
echo [4/4] Starting Servers...
echo Starting Backend on port 8000...
start "Backend Server" cmd /k "cd backend && call venv\Scripts\activate && uvicorn main:app --reload --host 0.0.0.0 --port 8000"

echo Starting Frontend on port 5173...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo Application Started!
echo Open http://localhost:5173 in your browser.
echo ==========================================
pause
