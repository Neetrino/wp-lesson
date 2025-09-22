#!/bin/bash

# Neetrino Academy - Deploy to GitHub Script
# Этот скрипт загружает проект на GitHub репозиторий

echo "🚀 Neetrino Academy - Deploy to GitHub"
echo "========================================"

# Проверяем, что мы в правильной директории
if [ ! -f "index.html" ]; then
    echo "❌ Ошибка: index.html не найден. Убедитесь, что вы находитесь в папке проекта."
    exit 1
fi

# Инициализируем git репозиторий (если еще не инициализирован)
if [ ! -d ".git" ]; then
    echo "📁 Инициализация Git репозитория..."
    git init
fi

# Добавляем все файлы
echo "📦 Добавление файлов в Git..."
git add .

# Создаем коммит
echo "💾 Создание коммита..."
git commit -m "Initial commit: Neetrino Academy website

✨ Features:
- Modern responsive design with animations
- Interactive CTA section with WhatsApp integration
- Contact form with Google Maps integration
- FAQ section with accordion functionality
- Professional tutor profiles
- Course information and pricing
- Mobile-friendly navigation
- Armenian language support

🎨 Design:
- Clean, modern UI with 3-column grid layout
- Hover effects and smooth transitions
- Professional color scheme
- Responsive design for all devices

📱 Sections:
- Hero section with course overview
- Course program (3 modules)
- Why study with us (9 benefits)
- Professional tutors
- Pricing information
- Contact information with map
- FAQ section
- Footer with social links

🔧 Technical:
- Pure HTML, CSS, JavaScript
- Font Awesome icons
- Google Fonts (Inter)
- Mobile-first responsive design
- Cross-browser compatible"

# Проверяем, есть ли удаленный репозиторий
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "⚠️  Удаленный репозиторий не настроен."
    echo "📝 Для настройки выполните:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/neetrino-academy.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    echo "🔗 Или создайте репозиторий на GitHub и следуйте инструкциям."
else
    echo "🚀 Загрузка на GitHub..."
    git branch -M main
    git push -u origin main
    echo "✅ Проект успешно загружен на GitHub!"
fi

echo ""
echo "🎉 Готово! Ваш сайт Neetrino Academy готов к использованию."
echo "📄 Откройте index.html в браузере для просмотра."