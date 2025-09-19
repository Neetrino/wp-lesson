#!/bin/bash

# WordPress Academy - Deploy to GitHub Script
# Этот скрипт загружает проект на GitHub репозиторий

echo "🚀 WordPress Academy - Deploy to GitHub"
echo "========================================"

# Проверяем, что мы в правильной директории
if [ ! -f "index.html" ]; then
    echo "❌ Ошибка: index.html не найден. Убедитесь, что вы находитесь в папке проекта."
    exit 1
fi

echo "✅ Найден файл index.html"

# Инициализируем Git репозиторий
echo "📁 Инициализация Git репозитория..."
git init

# Добавляем удаленный репозиторий
echo "🔗 Добавление удаленного репозитория..."
git remote add origin https://github.com/Neetrino/wp-lesson.git

# Проверяем статус Git
echo "📊 Проверка статуса Git..."
git status

# Добавляем все файлы
echo "📦 Добавление файлов в Git..."
git add .

# Создаем коммит
echo "💾 Создание коммита..."
git commit -m "Initial commit: WordPress Academy website

✨ Features:
- Modern responsive design with animations
- Interactive CTA section with WhatsApp integration
- Contact form with Google Maps integration
- FAQ section with smooth animations
- Tutor profiles with skills and portfolio
- Course modules and pricing information
- Mobile-first responsive approach
- SEO optimized structure

🎨 Design:
- Color scheme: #070E61, #FF7500, #16B7EC
- Clean white background
- Rounded buttons with hover effects
- Modern typography with Inter font
- Smooth animations and transitions

📱 Sections:
- Hero section with call-to-action
- Course modules (3 weeks, 3 modules)
- About WordPress information
- Tutor profiles (2 instructors)
- FAQ with interactive questions
- Pricing (35,000 AMD/month)
- Contact form with registration
- CTA section with WhatsApp/call buttons

🛠 Technologies:
- HTML5 semantic markup
- CSS3 with modern animations
- Vanilla JavaScript
- Font Awesome icons
- Google Fonts (Inter)
- Google Maps integration

📞 Contact:
- Phone: +374 44 34 30 00
- WhatsApp: +374 44 34 30 00
- Email: info@wordpress-academy.am
- Telegram: @wordpress_academy"

# Переименовываем основную ветку
echo "🌿 Настройка основной ветки..."
git branch -M main

# Загружаем на GitHub
echo "🚀 Загрузка на GitHub..."
git push -u origin main

echo ""
echo "🎉 Успешно! Проект загружен на GitHub!"
echo "🔗 Репозиторий: https://github.com/Neetrino/wp-lesson.git"
echo ""
echo "📋 Что было загружено:"
echo "  ✅ index.html - Главная страница"
echo "  ✅ styles.css - CSS стили с анимациями"
echo "  ✅ script.js - JavaScript функциональность"
echo "  ✅ README.md - Документация проекта"
echo "  ✅ .gitignore - Исключения для Git"
echo "  ✅ PLAN.md - План разработки"
echo "  ✅ PROGRESS.md - Отслеживание прогресса"
echo "  ✅ Lesson plan.md - План уроков"
echo "  ✅ Instraction.md - Требования"
echo "  ✅ tech.md - Техническая информация"
echo ""
echo "🌐 Ваш сайт готов к использованию!"
echo "💡 Для просмотра откройте index.html в браузере"
