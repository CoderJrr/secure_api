// src/services/user.service.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'; // <-- 1. Prisma Client'ı import et
import ApiError from '../utils/ApiError.js';

const prisma = new PrismaClient(); // <-- 2. Prisma Client'ı başlat

// 3. Hafızadaki geçici 'users' dizisini sildik. Artık gerek yok.

// Yeni bir kullanıcı kaydeder
const registerUser = async (userData) => {
  const { username, password, role } = userData;

  // Kullanıcıyı veritabanında ara findUnique, veritabanındaki bir tabloda benzersiz (unique) bir alana göre tek bir kayıt bulmak için kullanılan özel ve optimize edilmiş bir Prisma sorgusudur.
  const existingUser = await prisma.user.findUnique({
    where: { username: username },
  });

  if (existingUser) {
    throw new ApiError(409, 'USERNAME_TAKEN');
  }

  const hashedPassword = await bcrypt.hash(password, 10); //10 "maliyet faktörü" (cost factor) veya "salt turu" (salt rounds) olarak adlandırılır ve şifrenin ne kadar karmaşık ve yavaş hash'leneceğini belirler.

  // Kullanıcıyı veritabanına oluştur
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role,
    },
  });
  
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Kullanıcı girişi yapar ve token döndürür
const loginUser = async (loginData) => {
    const { username, password } = loginData;

    // Kullanıcıyı veritabanında ara
    const user = await prisma.user.findUnique({
        where: { username: username }
    });
    if (!user) {
        throw new ApiError(404, 'USER_NOT_FOUND');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError(401, 'INVALID_PASSWORD');
    }
    //jwt.sign(), bir kullanıcıya özel, güvenli ve kurcalanamaz bir dijital kimlik kartı (JWT token'ı) oluşturan fonksiyondur. 1h= 1 saatlik oluşturuyor 
    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token };
};

// Bir kullanıcının rolünü günceller
const updateUserRole = async (userId, newRole) => {
  // Gelen rolün enum'da tanımlı olup olmadığını kontrol edebilirsiniz (ek güvenlik)
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(userId, 10) },
    data: { role: newRole },
  });
  const { password: _, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export default { registerUser, loginUser, updateUserRole };