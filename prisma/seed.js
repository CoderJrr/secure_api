// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('supersecretpassword', 10);
  
  // upsert: Eğer 'superadmin' kullanıcısı yoksa oluşturur,
  // EĞER VARSA, rolünün 'SUPER_ADMIN' olduğundan emin olur.
  const superAdmin = await prisma.user.upsert({
    where: { username: 'superadmin' },
    // DEĞİŞİKLİK BURADA: Eğer kullanıcı varsa, bu alanı güncellemesini söylüyoruz.
    update: {
      role: 'SUPER_ADMIN',
    },
    create: {
      username: 'superadmin',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });
  console.log({ superAdmin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });