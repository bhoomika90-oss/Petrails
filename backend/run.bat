@echo off
echo ==========================================================
echo Starting PETRAILS Actuarial Intelligence Backend (Port 8000)
echo ==========================================================
"E:\anaconda\python.exe" -m uvicorn main:app --reload --port 8000
