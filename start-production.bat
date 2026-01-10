@echo off
echo Starting StackWeb in Production Mode...
echo.
set NODE_ENV=production
set PORT=5000
node dist/index.cjs
