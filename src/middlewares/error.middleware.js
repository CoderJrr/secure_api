// src/middlewares/error.middleware.js fs, File System (Dosya Sistemi) kelimesinin kısaltmasıdır. Bu modül, sunucunuzdaki dosya ve klasörler üzerinde tam kontrol sahibi olmanızı sağlar. /promises Eki Neden Önemli?Bu eklenti, fs modülünün modern async/await sözdizimi ile kullanılabilen versiyonunu import ettiğinizi belirtir. Bu sayede kodunuz daha okunaklı ve yönetilebilir olur. path: Farklı işletim sistemlerinde (Windows, Linux, macOS) doğru şekilde çalışan dosya yolları oluşturmak için kullanılır.
import fs from 'fs/promises';
import path from 'path';

const errorHandler = async (err, req, res, next) => {
  // Varsayılan dil Türkçe olsun
  let lang = 'tr';
  
  // Kullanıcının tarayıcısından gelen 'Accept-Language' başlığını kontrol et
  const acceptLanguage = req.headers['accept-language'];
  if (acceptLanguage && acceptLanguage.startsWith('en')) {
    lang = 'en';
  }

  // Doğru dil dosyasının yolunu belirle path.resolve(), kendisine verilen göreceli dosya yolunu (relative path), o an komutun çalıştırıldığı dizini baz alarak mutlak (absolute) bir dosya yoluna dönüştürür. Yani, dosya sisteminin en başından (C:\ veya / gibi) başlayarak dosyanın tam, eksiksiz adresini oluşturur.
  const langFilePath = path.resolve(`src/locales/${lang}.json`);
  
  try {
    // Dil dosyasını oku ve JSON'a çevir
    const messagesData = await fs.readFile(langFilePath, 'utf-8');
    const messages = JSON.parse(messagesData);//JSON.parse(), JSON formatındaki bir metni (string) alıp, onu JavaScript'in kullanabileceği gerçek bir nesneye (object) veya diziye (array) dönüştürür.

    // Hatanın durum kodunu ve mesaj anahtarını belirle eğer sistemde kayıtlı olmayan bir dil ise internal(iç sunucu hatası) hatası ver
    const statusCode = err.statusCode || 500;
    const messageKey = err.messageKey || 'INTERNAL_SERVER_ERROR';
    const message = messages[messageKey] || messages['INTERNAL_SERVER_ERROR'];

    // Kullanıcıya standart bir formatta ve doğru dilde hata mesajını gönder
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  } catch (fileError) {
    // Eğer dil dosyası okunamazsa, en genel hata mesajını gönder
    res.status(500).json({
        success: false,
        message: 'Internal server error.'
    });
  }
};

export default errorHandler;