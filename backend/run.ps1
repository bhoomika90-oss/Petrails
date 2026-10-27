Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Starting PETRAILS Actuarial Intelligence Backend (Port 8000)" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

& "$PSScriptRoot\venv\Scripts\python.exe" -m uvicorn main:app --reload --port 8000
