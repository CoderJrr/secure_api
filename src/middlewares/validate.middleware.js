// src/middlewares/validate.middleware.js  validate fonksiyonu, gelen isteklerin (request) belirli kurallara (schema) uyup uymadığını kontrol eden, yeniden kullanılabilir bir Express.js middleware'i (arayazılımı) üreten bir fabrikadır.

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    // Eğer bir doğrulama hatası varsa, 400 koduyla hatayı kullanıcıya gönder
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  // Hata yoksa, isteğin bir sonraki adıma (controller'a) geçmesine izin ver
  next();
};

export default validate;