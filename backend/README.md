# Backend Setup Guide

## Prerequisites
- Node.js 16+
- MongoDB (running on localhost:27017)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB:
```bash
# On Windows with MongoDB installed
mongod
```

3. Run the backend server:
```bash
npm start
```

Or in development mode with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Environment Variables

Create a `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/currencyguard
JWT_SECRET=your_jwt_secret_very_long_and_random_change_this_in_production
PORT=5000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Scanning
- `POST /api/scan` - Analyze currency note (requires auth)
- `GET /api/history` - Get scan history (requires auth)

## Testing

Register a user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","password":"password123"}'
```

Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

