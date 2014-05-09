CREATE TABLE `articles` (
  `id` INTEGER  NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255)  NOT NULL,
  `content` VARCHAR(8192 )  NOT NULL,
  `author` VARCHAR(64)  NOT NULL,
  `created` TIMESTAMP  NOT NULL,
  `modified` TIMESTAMP  NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

ALTER TABLE `tsw`.`articles` ADD COLUMN `image_src` VARCHAR(512)  AFTER `modified`,
 ADD COLUMN `image_title` VARCHAR(128)  AFTER `image_src`;

