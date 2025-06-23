const mongoose = require('mongoose');

// URL MongoDB Atlas
const mongoURL = 'mongodb+srv://khaa:MKXn9hOm0ImGacKw@cluster0.9zt7wfw.mongodb.net/belajarMongo?retryWrites=true&w=majority';

// Koneksi ke MongoDB
mongoose.connect(mongoURL)
  .then(() => console.log('🟢 Terhubung ke MongoDB Atlas'))
  .catch(err => console.error('🔴 Gagal terhubung ke MongoDB:', err));

// Skema dengan email (harus unik kalau sudah pernah dibuat index)
const userSchema = new mongoose.Schema({
  nama: String,
  umur: Number,
  email: String,
});

const User = mongoose.model('User', userSchema);

// Buat dan simpan data baru
const userBaru = new User({
  nama: 'Rakha Akbar',
  umur: 22,
  email: 'rakha' + Date.now() + '@gmail.com', // Email unik supaya tidak duplicate
});

userBaru.save()
  .then(() => {
    console.log('✅ Data berhasil disimpan!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Gagal menyimpan data:', err);
  });
