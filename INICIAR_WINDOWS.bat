@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py servidor.py
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (python servidor.py) else (start "" "Abrir_sin_instalar.html")
)
