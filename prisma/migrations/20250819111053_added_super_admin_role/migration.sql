-- AlterTable ENUM ("Enumeration" (sıralama, listeleme)), bir sütuna girilebilecek değerleri önceden belirlenmiş sabit bir liste ile kısıtlayan bir veri türüdür.
ALTER TABLE `User` MODIFY `role` ENUM('USER', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'USER';
