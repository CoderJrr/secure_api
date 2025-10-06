// src/index.js
/*(Container):Bir imajın çalışan, canlı bir örneğidir.
Çalışan Konteynerleri Listeleme: docker ps Konteyner 
Tüm Konteynerleri Listeleme (Duranlar Dahil): docker ps -a
Bir Konteynerin Loglarını Görme: docker logs <konteyner_adı>
Logları Canlı İzleme: docker logs -f <konteyner_adı>
Konteynerin İçine Girme: docker-compose exec <servis_adı> bash
Tüm Servisleri Başlatma (Arka Planda): docker-compose up -d
Tüm Servisleri Durdurma ve Kaldırma: docker-compose down
Tüm Servisleri ve VERİLERİ Durdurma ve Kaldırma: docker-compose down --volumes
İmaj (Image):Bir yazılım paketinin hareketsiz, değiştirilemez bir şablonudur.Tek bir imajdan (tariften), birbirinden tamamen bağımsız çalışan yüzlerce konteyner (yemek) oluşturabilirsiniz.
İmajları Yeniden İnşa Ederek Başlatma: docker-compose up -d --build
İmaj Oluşturma: docker build -t <imaj_adı> .
Mevcut İmajları Listeleme: docker images
1. Kaynak PC'de (Gönderen):

Docker Hub'a Giriş: docker login
İmajı Docker Hub İçin Etiketleme ve İnşa Etme: docker build -t <kullanici_adin>/<proje_adin> .
İmajı Docker Hub'a Yükleme: docker push <kullanici_adin>/<proje_adin>
Veritabanı Yedeğini Alma: docker-compose exec db mysqldump -u root -p[şifre] <db_adı> > backup.sql
2. Hedef PC'de (Alan):

Konteynerleri Başlatma (Doğru docker-compose.yml ve .env ve backup dosyaları ile): docker-compose up -d 
Veritabanı Tablolarını Oluşturma: (önce çalışan konteynırın içine gir: docker exec -it secure_api_project-app-1 /bin/sh) npx prisma migrate dev
Veritabanı Yedeğini Geri Yükleme: docker-compose exec -T db mysql -u root -p[şifre] <db_adı> < backup.sql */

import 'dotenv/config'; //env dosyasından çekmesi için
import express from 'express'; //Node.js üzerinde web sunucuları ve API'ler oluşturmayı çok daha kolay hale getiren, en popüler web çatısı (framework) olan Express.js'i projenize dahil eder. Yönlendirme (Routing): /users, /products gibi farklı URL'lere gelen istekleri kolayca yönetmenizi sağlar (app.get(), app.post()).Middleware Desteği: Gelen istekleri, asıl iş mantığınıza ulaşmadan önce bir dizi adımdan (kimlik doğrulama, veri doğrulama, loglama vb.) geçirmenize olanak tanır.İstek ve Cevap Yönetimi: Karmaşık HTTP isteklerini (req) ve cevaplarını (res) basitleştirilmiş nesnelerle yönetmenizi sağlar. res.json({ message: 'Merhaba' }) gibi tek bir satırla kolayca JSON cevapları gönderebilirsiniz.
import authRouter from './routes/auth.route.js';
import taskRouter from './routes/task.route.js';
import errorHandler from './middlewares/error.middleware.js'; // YENİ İMPORT
import userRouter from './routes/user.route.js';

const app = express();
const PORT = 5001;

app.use(express.json()); //Bu sayede gelen verilere req.body üzerinden kolayca erişebilirsiniz. Bu satır olmadan, req.body undefined olur ve gelen JSON verisini alamazsınız.

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Güvenli API sunucusu çalışıyor!' });
});

// Route'lar
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

// Merkezi Hata Yakalayıcı
// DİKKAT: Bu, en sona eklenmesi gereken middleware'dir.
app.use(errorHandler);

app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde dinlemede.`);
});