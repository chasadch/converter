@echo off
echo ==========================================
echo Network Connectivity Test
echo ==========================================
echo.

cd backend

echo Activating virtual environment...
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate
) else (
    echo Warning: Virtual environment not found. Using system Python.
)

echo.
echo Running network diagnostics...
echo.

python test_network.py

echo.
echo ==========================================
echo Test Complete
echo ==========================================
echo.
echo If tests failed, see TROUBLESHOOTING.md
echo.
pause


