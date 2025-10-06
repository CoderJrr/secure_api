// src/validators/auth.validator.js

import Joi from 'joi'; //Joi, JavaScript verilerini doğrulamak (validate etmek) için kullanılan çok güçlü ve popüler bir kütüphanedir.

// Kullanıcı kayıt olurken gelen veri için kurallar
const registerSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': `"Kullanıcı adı" metin olmalıdır.`,
      'string.empty': `"Kullanıcı adı" boş olamaz.`,
      'string.min': `"Kullanıcı adı" en az 3 karakter olmalıdır.`,
      'any.required': `"Kullanıcı adı" zorunlu bir alandır.`
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.min': `"Şifre" en az 8 karakter olmalıdır.`,
      'any.required': `"Şifre" zorunlu bir alandır.`
    }),
  
  // Rol alanı zorunlu değil, gelmezse varsayılan olarak 'USER' olacak
  role: Joi.string().valid('USER', 'ADMIN').default('USER'),
});

// Kullanıcı giriş yaparken gelen veri için kurallar
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export { registerSchema, loginSchema };