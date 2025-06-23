const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: '❌ Akses ditolak. Tidak ada token yang disediakan.'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Tambahkan data user ke request object
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Error saat verifikasi token:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: '❌ Token tidak valid.'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: '❌ Token telah kadaluarsa. Silakan login kembali.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: '❌ Terjadi kesalahan saat memverifikasi token.'
    });
  }
};

module.exports = auth;
