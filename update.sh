#!/bin/bash

set -e

echo "Reset repo..."
git reset --hard HEAD

echo "Pull branch main..."
git pull origin main

echo "Install dependencies PHP (Composer)..."
composer install --ignore-platform-req=ext-fileinfo

echo "Install dependencies JS (npm)..."
npm install

echo "Build SSR..."
npm run build:ssr

echo "Menghapus hasil build sebelumnya di folder tujuan..."
rm -rf ../favicon ../build ../images ../robots.txt

echo "Memindahkan hasil build ke folder parent..."
cd public/
cp -r build/ ../../
cp -r favicon/ ../../
cp -r images/ ../../
cp -r robots.txt ../../

echo "✅Update selesai."
