// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret_very_long_and_random'; // ← change this!

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/currencyguard')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ────────────────────────────────────────────────
// Models
// ────────────────────────────────────────────────

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', UserSchema);

const ScanSchema = new mongoose.Schema({
  userId: String,
  imagePath: String,
  result: String,
  confidence: Number,
  denomination: String,
  features: Array,
  createdAt: { type: Date, default: Date.now },
});
const Scan = mongoose.model('Scan', ScanSchema);

// ────────────────────────────────────────────────
// Auth Middleware
// ────────────────────────────────────────────────

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ────────────────────────────────────────────────
// Routes
// ────────────────────────────────────────────────

app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// File upload + AI call
const upload = multer({ dest: 'uploads/' });

app.post('/api/scan', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const imagePath = req.file.path;

    // Call Python FastAPI AI service
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath), {
      filename: req.file.originalname || 'note.jpg',
      contentType: req.file.mimetype
    });

    const aiResponse = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!aiResponse.ok) {
      throw new Error(`AI service error: ${aiResponse.statusText}`);
    }

    const result = await aiResponse.json();

    // Save scan to MongoDB
    const scan = new Scan({
      userId: req.userId,
      imagePath,
      result: result.status,
      confidence: result.confidence,
      denomination: result.denomination,
      features: result.features,
    });
    await scan.save();

    // Optional: delete uploaded file after processing
    // fs.unlinkSync(imagePath);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/history', authMiddleware, async (req, res) => {
  try {
    const scans = await Scan.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(scans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});