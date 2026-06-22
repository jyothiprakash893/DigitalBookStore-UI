# 📚 Digital Book Store - UI

A modern and responsive Angular 16 frontend application for a Digital Book Store.
Users can browse books, manage their cart, and complete purchases with JWT-based authentication.

🔗 **Repository:** https://github.com/jyothiprakash893/DigitalBookStore-UI

---

## 🛠️ Tech Stack

| Technology | Version |
|------------|---------|
| Angular | 16.2.x |
| TypeScript | 5.1.x |
| Bootstrap | 5.3.x |
| FontAwesome | 6.7.x |
| JWT Decode | 4.0.x |
| RxJS | 7.8.x |
| SASS | Latest |

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- ✅ Node.js v16 or v18 → [Download](https://nodejs.org/)
- ✅ npm v8+
- ✅ Angular CLI v16

```bash
npm install -g @angular/cli@16
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/jyothiprakash893/DigitalBookStore-UI.git
cd DigitalBookStore-UI
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm start
```

Open your browser and visit → **http://localhost:4200**

> ⚠️ Make sure your **backend server is running on http://localhost:8082** before starting the frontend.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run dev server with proxy |
| `npm run build` | Build for production |
| `npm run watch` | Build and watch for changes |
| `npm test` | Run unit tests |
| `npm run compodoc` | Generate documentation |

---

## 📦 Production Build

```bash
npm run build
```

- Output folder: `dist/digital-book-store-ui/`
- Files are minified, optimized and cache-busted
- Ready to deploy on any static hosting

---

## 🔗 API Proxy Configuration

During development, all `/api/*` requests are automatically proxied to the backend:
