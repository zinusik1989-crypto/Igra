@echo off
cd /d "%~dp0"

set "NODE_DIR=C:\Program Files\nodejs"
if exist "%NODE_DIR%\npm.cmd" (
  set "PATH=%NODE_DIR%;%PATH%"
)

where npm >nul 2>&1
if errorlevel 1 (
  echo.
  echo ERROR: Node.js not found.
  echo Install from https://nodejs.org/ then restart terminal.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)

echo.
echo Starting dev server...
echo Open in browser: http://127.0.0.1:5173/
echo Stop server: Ctrl+C
echo.

start "" cmd /c "timeout /t 3 /nobreak >nul & start http://127.0.0.1:5173/"
call npm run dev
pause
