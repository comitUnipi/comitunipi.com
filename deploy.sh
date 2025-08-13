#!/bin/bash

set -e

echo "Reset repo & Pull branch main..."
git reset --hard HEAD
git pull origin main

echo "Install dependencies PHP (Composer)..."
composer install --ignore-platform-req=ext-fileinfo --no-dev --optimize-autoloader
composer dump-autoload --optimize

echo "Migration database..."
php artisan migrate --force

echo "Clear Laravel cache..."
php artisan optimize:clear

echo "Rebuild Laravel cache..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Install dependencies JS (npm)..."
npm ci

echo "Build SSR..."
npm run build:ssr

echo "Menghapus hasil build sebelumnya di folder tujuan..."
rm -rf ../favicon ../build ../images ../robots.txt

echo "Memindahkan hasil build ke folder parent..."
cd public/
cp -r build/ ../../
cp -r favicon/ ../../
cp -r images/ ../../
cp robots.txt ../../

echo "✅Update selesai."
