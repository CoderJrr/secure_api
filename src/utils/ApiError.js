// src/utils/ApiError.js  bu sınıfın JavaScript'in dahili Error sınıfından türediğini (extends) belirtir. constructor, bir sınıftan new anahtar kelimesiyle yeni bir nesne oluşturulduğunda otomatik olarak çalışan, o nesnenin başlangıç ayarlarını yapan özel bir metottur. super anahtar kelimesi, bir sınıf başka bir sınıftan türediğinde (extends kullandığında), alt sınıfın (child class) içinden üst sınıfın (parent class) constructor'ına veya metotlarına erişmek için kullanılır.
class ApiError extends Error {
  constructor(statusCode, messageKey) {
    super(messageKey);
    this.statusCode = statusCode;
    this.messageKey = messageKey;
  }
}

export default ApiError;