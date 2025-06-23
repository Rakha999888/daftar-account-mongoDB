# Aplikasi Autentikasi dengan Node.js, Express, dan MongoDB

Aplikasi web sederhana yang menampilkan sistem autentikasi pengguna dengan antarmuka yang responsif. Dibangun dengan:

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Autentikasi**: JWT (JSON Web Tokens)

## 🚀 Fitur

### Backend
- ✅ Koneksi ke MongoDB Atlas
- 🔐 Endpoint untuk registrasi dan login pengguna
- 📧 Validasi email unik
- ⚠️ Error handling yang baik
- 🔒 Penggunaan environment variables yang aman
- 🔑 Autentikasi dengan JWT

### Frontend
- 🎨 Antarmuka pengguna yang modern dan responsif
- 📱 Desain mobile-friendly
- 🔄 Form validasi real-time
- 📝 Tampilan form yang interaktif
- 🎭 Modal notifikasi yang elegan

## 🛠️ Teknologi yang Digunakan

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- JWT (JSON Web Tokens)
- bcryptjs (untuk hashing password)
- dotenv (untuk environment variables)

### Frontend
- HTML5
- CSS3 (Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Fetch API (untuk HTTP requests)

## 📋 Persyaratan Sistem

- Node.js (v14 atau lebih baru)
- npm (Node Package Manager)
- Akun MongoDB Atlas (untuk database cloud)

## 🚀 Cara Memulai

### Prasyarat
- Node.js (v14 atau lebih baru)
- npm atau yarn
- Akun MongoDB Atlas

### Instalasi

1. Clone repositori ini:
   ```bash
   git clone [URL_REPOSITORY]
   cd belajar-mongo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Konfigurasi environment:
   - Salin file `.env.example` ke `.env`
   - Atau buat file `.env` baru dengan konfigurasi:
   ```env
   # Konfigurasi Database
   MONGODB_URI=mongodb+srv://username:password@cluster0.9zt7wfw.mongodb.net/belajarMongo?retryWrites=true&w=majority
   
   # Konfigurasi Server
   PORT=3000
   
   # Konfigurasi Keamanan
   JWT_SECRET=rahasia_sangat_rahasia
   
   # Opsi Tambahan
   NODE_ENV=development
   ```

4. Ganti `MONGODB_URI` dengan koneksi string MongoDB Atlas Anda

### Menjalankan Aplikasi

1. Mode development (dengan auto-restart):
   ```bash
   npm run dev
   ```

2. Mode production:
   ```bash
   npm start
   ```

3. Buka browser dan kunjungi:
   ```
   http://localhost:3000
   ```

## 🖥️ Tampilan Aplikasi

### Halaman Login
- Form login dengan validasi email dan password
- Tautan ke halaman register
- Responsif untuk semua perangkat

### Halaman Register
- Form registrasi dengan validasi
- Konfirmasi password
- Tautan kembali ke halaman login

### Modal Notifikasi
- Muncul setelah login/register berhasil
- Dapat ditutup dengan tombol atau klik di luar modal

## 🏗️ Struktur Proyek

```
belajar-mongo/
├── node_modules/       # Dependencies
├── public/             # File-file statis
│   ├── css/            # Stylesheet
│   │   └── style.css   # Styling utama
│   ├── js/             # JavaScript
│   │   └── script.js   # Logika frontend
│   └── login.html      # Halaman login/register
├── middleware/         # Middleware Express
│   └── auth.js         # Middleware autentikasi
├── .env                # Konfigurasi environment (tidak di-commit)
├── .env.example       # Template konfigurasi
├── server.js          # Aplikasi utama
├── package.json       # Dependencies dan scripts
└── README.md          # Dokumentasi
```

## 🛠️ Pengembangan

### Script yang Tersedia

- `npm start`: Menjalankan server (production)
- `npm run dev`: Menjalankan server dengan nodemon (development)
- `npm test`: Menjalankan test (jika ada)

### Cara Berkontribusi

1. Fork repository ini
2. Buat branch baru (`git checkout -b fitur/namafitur`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur/namafitur`)
5. Buat Pull Request

## 📝 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## � Cara Mengecek Database MongoDB

### Menggunakan MongoDB Compass (GUI)

1. Unduh dan instal [MongoDB Compass](https://www.mongodb.com/try/download/compass) sesuai sistem operasi Anda
2. Buka MongoDB Compass
3. Masukkan connection string MongoDB Atlas Anda (sama dengan `MONGODB_URI` di file `.env`)
   - Format: `mongodb+srv://<username>:<password>@cluster0.9zt7wfw.mongodb.net/`
4. Klik "Connect"
5. Setelah terhubung, Anda akan melihat daftar database
6. Pilih database `belajarMongo`
7. Di dalamnya, Anda akan melihat koleksi `users` yang berisi data pengguna yang terdaftar

### Menggunakan MongoDB Shell (CLI)

1. Pastikan Anda telah menginstal [MongoDB Shell](https://www.mongodb.com/try/download/shell) atau gunakan terminal yang sudah terintegrasi dengan MongoDB
2. Hubungkan ke MongoDB Atlas dengan perintah:
   ```bash
   mongosh "mongodb+srv://<username>:<password>@cluster0.9zt7wfw.mongodb.net/"
   ```
   Ganti `<username>` dan `<password>` dengan kredensial MongoDB Atlas Anda

3. Setelah terhubung, gunakan database `belajarMongo`:
   ```bash
   use belajarMongo
   ```

4. Untuk melihat daftar koleksi:
   ```bash
   show collections
   ```

5. Untuk melihat data pengguna:
   ```bash
   db.users.find().pretty()
   ```
   
   Perintah ini akan menampilkan semua dokumen dalam koleksi `users` dengan format yang lebih mudah dibaca.

6. (Opsional) Untuk menghitung jumlah dokumen:
   ```bash
   db.users.countDocuments()
   ```

### Tips
- Pastikan koneksi internet stabil saat mengakses MongoDB Atlas
- Jika menggunakan IP whitelist di MongoDB Atlas, pastikan IP Anda sudah diizinkan
- Untuk keamanan, jangan bagikan kredensial database Anda

## �📚 Endpoint API

### 🔐 Registrasi Pengguna

```
POST /register
```

**Request Body:**
```json
{
  "nama": "Nama Pengguna",
  "email": "email@contoh.com",
  "password": "password123"
}
```

**Response Sukses (201):**
```json
{
  "success": true,
  "message": "✅ Registrasi berhasil",
  "data": {
    "user": {
      "_id": "60d5ec9b58f9b025f8d2a1b2",
      "nama": "Nama Pengguna",
      "email": "email@contoh.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "❌ Email sudah terdaftar"
}
```

### 🔑 Login Pengguna

```
POST /login
```

**Request Body:**
```json
{
  "email": "email@contoh.com",
  "password": "password123"
}
```

**Response Sukses (200):**
```json
{
  "success": true,
  "message": "✅ Login berhasil",
  "data": {
    "user": {
      "_id": "60d5ec9b58f9b025f8d2a1b2",
      "nama": "Nama Pengguna",
      "email": "email@contoh.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "❌ Email atau password salah"
}
```

### 👤 Dapatkan Profil Pengguna

```
GET /profile
```

**Headers:**
```
Authorization: Bearer your_jwt_token_here
```

**Response Sukses (200):**
```json
{
  "success": true,
  "data": {
    "_id": "60d5ec9b58f9b025f8d2a1b2",
    "nama": "Nama Pengguna",
    "email": "email@contoh.com"
  }
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "❌ Akses ditolak. Tidak ada token yang disediakan."
}
```

## 🤝 Berkontribusi

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b fitur/namafitur`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur/namafitur`)
5. Buat Pull Request

## 📝 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
