@echo off
echo ========================================
echo Starting Levels of Consciousness Dev Server
echo ========================================
echo.
echo Server will be available at:
echo   http://localhost:3000
echo   http://localhost:3000/admin
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd /d "%~dp0"
npm run dev

pause
