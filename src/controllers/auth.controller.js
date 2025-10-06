// src/controllers/auth.controller.js
import userService from '../services/user.service.js';

const register = async (req, res, next) => { // <-- 'next' eklendi try bloğu içindeki kodda (userService.register veya userService.login gibi) bir hata oluştuğunda, bu hatayı manuel olarak ele almak yerine, Express'in bir sonraki "hata yakalama" katmanına (middleware) devretmek için kullanılır.
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    // Hatayı merkezi hata yakalayıcıya pasla
    next(error); 
  }
};

const login = async (req, res, next) => { // <-- 'next' eklendi
    try {
        const result = await userService.loginUser(req.body);
        res.status(200).json({ success: true, ...result });
    } catch (error) {
        // Hatayı merkezi hata yakalayıcıya pasla
        next(error);
    }
}

export default { register, login };