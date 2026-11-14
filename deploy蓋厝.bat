@echo off
chcp 65001 >nul
cd /d "%~dp0"
git remote set-url origin https://github.com/0jerryqq-star/khi-tshu.git
git add .
git commit -m "更新 %date% %time%"
git push
pause
