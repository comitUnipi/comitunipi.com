# Contributing Guide

Thank you for considering contributing to this project! Your contributions are valuable and help improve the project for everyone. Please follow the guidelines below to get started.

---

## Requirements & Setup

### Prerequisites

Before contributing, make sure you have the following installed:

| Requirement | Minimum Version  |
| ----------- | ---------------- |
| PHP         | 8.2+             |
| Composer    | 2.5+             |
| Node.js     | 18+              |
| NPM / Yarn  | Latest           |
| Database    | MySQL 8 / SQLite |

> This project uses **Laravel 12**, which requires **PHP 8.2 or higher**.  
> The frontend is built using **Inertia.js with React**, powered by **Vite**.

---

## Getting Started

### Installing depedencies

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install PHP dependencies
composer install

# Install JS dependencies
npm ci

# Copy .env file
cp .env.example .env

# Generate app key
php artisan key:generate

# Run database migrations
php artisan migrate

# Start Laravel server
php artisan serve

# Start Vite dev server
npm run dev

# or you can start server with
composer run dev
```

## Contribution Workflow

1. Fork the repository.
2. Clone your fork locally:
   ```
   git clone https://github.com/your-username/your-repo.git
   ```
3. Create a new feature branch:
   ```
   git checkout -b feature/your-feature-name
   ```
4. Make your changes and commit:
   ```
   git commit -m "your detailed description of your changes."
   ``
   ```
5. Push the branch:
   ```
   git push origin feature/your-feature-name
   ```
6. Create a Pull Request (PR) to the main branch of the original repository.

## Running Tests

Run backend tests using:

```
php artisan test tests/Feature
```

For frontend changes, manually test your features in the browser. Check browser dev tools for any console warnings or errors.

## Branch Naming Convention

Use clear and descriptive names:

- feature/add-support
- fix/typo-in-navbar
- refact/form-validation-logic

## Code of Conduct

Please be respectful and inclusive. By contributing, you agree to follow the [CODE OF CONDUCT](./CODE_OF_CONDUCT.md)

## Thank You!

### Semangat COMIT, Salam Teknologi
