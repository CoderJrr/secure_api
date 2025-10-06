# ---- 1. Aşama: Temel İmajı Belirleme ----
FROM node:20-alpine

# ---- 2. Aşama: Çalışma Ortamını Hazırlama ----
WORKDIR /app

# ---- 3. Aşama: Bağımlılıkları Yükleme ----
# Önce sadece package.json dosyalarını kopyala
COPY package*.json ./

# !!! YENİ ADIM: Prisma şemasını, npm install'dan ÖNCE kopyala !!!
# Bu, `npm install` sırasında çalışacak olan `prisma generate` komutunun
# şema dosyasını bulabilmesini ve Prisma Client'ı doğru şekilde oluşturmasını sağlar.
COPY prisma ./prisma/

# Bağımlılıkları yükle.
RUN npm install

# ---- 4. Aşama: Uygulama Kodunu Kopyalama ----
# Geri kalan tüm dosyaları kopyala (prisma klasörü zaten kopyalandığı için tekrar kopyalanmaz)
COPY . .

# ---- 5. Aşama: Port ve Çalıştırma Komutu ----
EXPOSE 5001
CMD ["npm", "start"]