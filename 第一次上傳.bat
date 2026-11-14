@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 第一次上傳 khi-tshu 到 GitHub ...
git init
git add .
git commit -m "第一版 khi-tshu 蓋厝"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/0jerryqq-star/khi-tshu.git
git push -u origin main
echo.
echo 完成！如果上面沒有紅字錯誤，就可以去 Vercel 匯入了。
pause
