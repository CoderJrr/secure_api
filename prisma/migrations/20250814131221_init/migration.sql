-- CreateTable Terminalde npx prisma migrate dev --name init komutunun geldiği yer.
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; 

-- collate bir veritabanında metin verilerinin nasıl sıralanacağını ve nasıl karşılaştırılacağını belirleyen kurallar setidir.

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ownerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey CONSTRAINT, veritabanındaki verilere kural koymak ve bu kurallara uyulmasını zorunlu kılarak verilerin tutarlı ve doğru kalmasını sağlamak için kullanılır. ON DELETE RESTRICT: 🛑 Bir kullanıcıyı (User) silmeye çalıştığınızda, veritabanı önce o kullanıcıya ait herhangi bir görev (Task) olup olmadığını kontrol eder. Eğer o kullanıcının üzerine kayıtlı görevler varsa, bu kural kullanıcıyı silmenizi engeller (restrict)  ON UPDATE CASCADE: 🔄 Bir kullanıcının id'si (genellikle yapılmasa da) bir şekilde güncellenirse, bu kural sayesinde o kullanıcıya ait tüm görevlerdeki ownerId alanı da otomatik olarak yeni id değeriyle güncellenir (cascade)

ALTER TABLE `Task` ADD CONSTRAINT `Task_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
