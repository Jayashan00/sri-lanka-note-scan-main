# CurrencyGuard.ai - Complete Setup Guide

## Overview
This project has three main components:
1. **Frontend** - React + TypeScript with Vite
2. **Backend** - Node.js/Express with MongoDB
3. **AI Service** - Python/FastAPI for currency detection

## Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB (running locally or remote)
- npm or yarn

## Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Ensure MongoDB is running:
```bash
# On Windows
mongod
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

## AI Backend Setup

1. Navigate to AI backend folder:
```bash
cd ai_backend
```

2. Create a Python virtual environment:
```bash
python -m venv venv
# Activate it
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the AI service:
```bash
python app.py
```

The AI service will run on `http://localhost:8000`

## Running Everything Together

Open three terminals:

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm start
```

**Terminal 3 - AI Backend:**
```bash
cd ai_backend
python app.py
```

## Features

✅ **Authentication** - Register and login users
✅ **Currency Scanning** - Upload images for analysis
✅ **Detection Results** - Get confidence scores and feature analysis
✅ **Scan History** - Track all previous scans
✅ **Dashboard** - View statistics and results

## Key Fixes Applied

### Frontend
- ✅ Removed non-existent Supabase imports
- ✅ Fixed Auth.tsx to use backend authentication
- ✅ Fixed Dashboard.tsx to use backend API instead of Supabase
- ✅ Fixed AuthContext to properly manage user state and tokens
- ✅ Added proper error handling and toast notifications

### Backend
- ✅ Completed server.js with all routes
- ✅ Added proper MongoDB connection handling
- ✅ Implemented JWT authentication
- ✅ Added file upload and AI service integration
- ✅ Created package.json with dependencies

### AI Backend
- ✅ Added complete error handling
- ✅ Model loading with graceful fallback to mock predictions
- ✅ Image preprocessing pipeline
- ✅ Feature extraction
- ✅ Health check endpoint
- ✅ Created requirements.txt with dependencies

## Testing the API

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Check AI Service Health
```bash
curl http://localhost:8000/health
```

## Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is installed and running
- Check that port 27017 is available

**Frontend not connecting to backend:**
- Ensure backend is running on port 5000
- Check CORS settings in backend

**AI Service errors:**
- Verify Python 3.8+ is installed
- Install dependencies with: `pip install -r requirements.txt`
- Check TensorFlow compatibility with your system

**Port conflicts:**
- Frontend: 5173
- Backend: 5000
- AI: 8000

If ports are in use, you can change them in:
- Frontend: `vite.config.ts`
- Backend: `server.js` (PORT variable)
- AI: `app.py` (uvicorn.run port parameter)

## Production Notes

Before deploying:
1. Change JWT_SECRET in backend/.env
2. Update MongoDB URI to production database
3. Set NODE_ENV=production
4. Configure appropriate CORS origins
5. Use environment variables for sensitive data

