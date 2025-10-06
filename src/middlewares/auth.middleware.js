// src/middlewares/auth.middleware.js JSON Web Token (JWT) adı verilen dijital ve güvenli "kimlik kartları" oluşturmak, okumak ve doğrulamak için kullanılan çok popüler bir Node.js kütüphanesini (jsonwebtoken) projenize dahil eder.
import jwt from 'jsonwebtoken';

// Kullanıcının geçerli bir token'ı olup olmadığını kontrol eden middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN, [1] 2.elemanı alır çünkü ilki bearer yazısı

  if (token == null) {
    return res.status(401).json({ success: false, message: 'Erişim reddedildi. Token bulunamadı.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Geçersiz veya süresi dolmuş token.' });
    }
    // Token geçerliyse, kullanıcı bilgisini isteğe (req) ekle ve devam et
    req.user = user;
    next();
  });
};

// Kullanıcının belirli bir role sahip olup olmadığını kontrol eden middleware
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Bu işlemi yapmak için yetkiniz yok.' });
        }
        next();
    };
};

export { authenticateToken, authorizeRole };