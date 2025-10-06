# Rol Tabanlı Yetkilendirme (RBAC) ile Güvenli REST API

Bu proje, modern back-end geliştirme pratiklerini kullanarak güvenli, ölçeklenebilir ve katmanlı bir REST API'nin nasıl oluşturulacağını göstermek amacıyla geliştirilmiş bir projedir.
Proje, bir görev yönetimi (task management) sistemi üzerine kurulmuştur ve en önemli odak noktası güvenlik ve mimari desendir.

---

## 🚀 Öne Çıkan Özellikler

### Güvenlik Katmanı
- **Kimlik Doğrulama (Authentication):** `bcryptjs` ile şifrelerin güvenli bir şekilde hash'lenmesi ve JSON Web Tokens (JWT) ile oturum yönetimi.
- **Yetkilendirme (Authorization):** Üç farklı role sahip hiyerarşik bir Rol Tabanlı Erişim Kontrolü (RBAC):
    - `USER`: Sadece kendi görevlerini yönetebilir.
    - `ADMIN`: Sistemdeki tüm görevleri görebilir.
    - `SUPER_ADMIN`: Tüm görevleri görebilir ve diğer kullanıcıların rollerini yönetebilir.
- **Veri Doğrulama (Data Validation):** Gelen tüm isteklerin `Joi` ile şema tabanlı doğrulaması yapılarak bozuk verilerin sisteme girişi engellenir.
- **Brute-Force Koruması:** `/login` endpoint'inde `express-rate-limit` ile istek sınırlaması yapılarak şifre tahmin saldırıları yavaşlatılır.
- **Merkezi Hata Yönetimi:** Tahmin edilebilir ve tutarlı hata cevapları için tek bir merkezi hata yönetim katmanı (middleware).

### Mimari
- **Katmanlı Mimari (Layered Architecture):** Controller, Service ve Repository katmanları kullanılarak görev ayrımı prensibi benimsenmiştir.
- **ORM (Object-Relational Mapping):** MySQL veritabanı ile etkileşimi güvenli ve kolay hale getirmek için **Prisma** kullanılmıştır.
- **Uluslararasılaştırma (i18n):** Hata mesajlarının farklı dillerde (örn: Türkçe, İngilizce) dönebilmesi için basit bir yapı kurulmuştur.

### DevOps
- **Konteynerleştirme (Containerization):** Tüm uygulama yığını (Node.js API + MySQL Veritabanı), **Docker** ve **Docker Compose** kullanılarak konteynerleştirilmiştir. Bu, "her yerde aynı şekilde çalış" prensibini garanti eder.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Back-end:** Node.js, Express.js
- **Veritabanı:** MySQL, Prisma (ORM)
- **Güvenlik:** `jsonwebtoken` (JWT), `bcryptjs`, `joi`, `express-rate-limit`
- **DevOps & Araçlar:** Docker, Docker Compose, Postman

---

## 📖 API Endpointleri

| Metot | Endpoint | Açıklama | Gerekli Rol |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Yeni bir kullanıcı kaydı oluşturur. | Herkese Açık |
| `POST` | `/api/auth/login` | Kullanıcı girişi yapar ve bir JWT döner. | Herkese Açık |
| `POST` | `/api/tasks` | Giriş yapmış kullanıcı için yeni bir görev oluşturur. | `USER` |
| `GET` | `/api/tasks/my-tasks` | Giriş yapmış kullanıcının tüm görevlerini listeler. | `USER` |
| `GET` | `/api/tasks/all-tasks`| Tüm kullanıcılara ait bütün görevleri listeler. | `ADMIN`, `SUPER_ADMIN` |
| `PATCH`| `/api/users/:userId/role`| Belirtilen bir kullanıcının rolünü değiştirir. | `SUPER_ADMIN` |

---

## 🔧 Kurulum ve Çalıştırma (Docker ile)

Bu proje, Docker ve Docker Compose kullanılarak kolayca çalıştırılmak üzere tasarlanmıştır.

### 1. Depoyu Klonlama
```bash
git clone [https://github.com/CoderJrr/secure_api.git](https://github.com/CoderJrr/secure_api.git)
cd secure_api
2. Ortam Değişkenlerini Yapılandırma
.env.example dosyasının bir kopyasını oluşturun ve adını .env olarak değiştirin.

.env dosyasını açın ve veritabanı bilgilerinizi ve güvenli bir JWT_SECRET anahtarı girin.

Kod snippet'i

DATABASE_URL="mysql://root:root_password_123@localhost:3306/task_manager_db"
JWT_SECRET="cok_gizli_ve_uzun_bir_jwt_anahtari"
MYSQL_ROOT_PASSWORD=root_password_123
# ... diğer veritabanı değişkenleri
3. Konteynerleri İnşa Etme ve Çalıştırma
Bu tek komut, API imajını inşa edecek, MySQL imajını çekecek ve her iki servisi de başlatacaktır.

Bash

docker-compose up -d --build
4. Veritabanı Migration'ını Çalıştırma
Bu komut, Prisma şemasına göre veritabanında gerekli tabloları oluşturacaktır.

Bash

npx prisma migrate dev
(Not: Eğer "shadow database" yetki hatası alırsanız, bu komut için .env dosyanızdaki DATABASE_URL'i geçici olarak root kullanıcısını kullanacak şekilde değiştirmeniz gerekebilir.)

5. (İsteğe Bağlı) Veritabanını Tohumlama
Başlangıç için SUPER_ADMIN kullanıcısını oluşturmak isterseniz, seed komutunu çalıştırın:

Bash

npx prisma db seed
API artık çalışır durumda ve http://localhost:5001 adresinden erişilebilir. Postman gibi bir araçla yukarıda listelenen endpoint'leri test edebilirsiniz.
