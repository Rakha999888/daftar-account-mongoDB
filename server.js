require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // untuk membaca JSON dari frontend
app.use(express.static(path.join(__dirname, 'public'))); // untuk file statis

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🟢 Terhubung ke MongoDB Atlas'))
  .catch(err => console.error('🔴 Gagal koneksi:', err));

// Skema User
const userSchema = new mongoose.Schema({
  nama: { 
    type: String, 
    required: [true, 'Nama harus diisi'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email harus diisi'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Email tidak valid']
  },
  password: {
    type: String,
    required: [true, 'Password harus diisi'],
    minlength: [6, 'Password minimal 6 karakter'],
    select: false // Menyembunyikan password dari query
  }
});

// Hash password sebelum disimpan
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method untuk membandingkan password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method untuk generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const User = mongoose.model('User', userSchema);

// 🔐 REGISTER: Simpan data saat registrasi
app.post('/register', async (req, res) => {
  const { nama, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: '❌ Email sudah terdaftar' 
      });
    }

    const userBaru = new User({ nama, email, password });
    await userBaru.save();
    
    // Generate token
    const token = userBaru.generateAuthToken();
    
    // Sembunyikan password dari response
    userBaru.password = undefined;
    
    res.status(201).json({ 
      success: true,
      message: '✅ Registrasi berhasil',
      data: {
        user: userBaru,
        token
      }
    });
  } catch (error) {
    console.error('Error saat registrasi:', error);
    res.status(500).json({ 
      success: false,
      message: '❌ Terjadi kesalahan server',
      error: error.message 
    });
  }
});

// 🔑 LOGIN: Autentikasi pengguna
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validasi input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: '❌ Email dan password harus diisi'
      });
    }

    // Cari user
    const user = await User.findOne({ email }).select('+password');
    
    // Verifikasi user dan password
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: '❌ Email atau password salah'
      });
    }

    // Generate token
    const token = user.generateAuthToken();
    
    // Sembunyikan password dari response
    user.password = undefined;
    
    res.status(200).json({
      success: true,
      message: '✅ Login berhasil',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Error saat login:', error);
    res.status(500).json({
      success: false,
      message: '❌ Terjadi kesalahan server',
      error: error.message
    });
  }
});

// 🔒 Rute yang membutuhkan autentikasi
app.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: '❌ Pengguna tidak ditemukan'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error saat mengambil profil:', error);
    res.status(500).json({
      success: false,
      message: '❌ Gagal mengambil data profil',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
