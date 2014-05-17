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

ALTER TABLE `articles` ADD COLUMN `image_src` VARCHAR(512)  AFTER `modified`,
 ADD COLUMN `image_title` VARCHAR(128)  AFTER `image_src`;

CREATE TABLE `services` (
  `id` INTEGER  NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32)  NOT NULL,
  `dayName` VARCHAR(32)  NOT NULL,
  `time` TIME  NOT NULL,
  `is_cyclic` BOOLEAN  NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

CREATE TABLE `reservation` (
  `id` INTEGER  NOT NULL AUTO_INCREMENT,
  `service_id` INTEGER  NOT NULL,
  `row` INTEGER  NOT NULL,
  `seat` INTEGER  NOT NULL,
  `name` VARCHAR(64) ,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

ALTER TABLE `reservation` ADD COLUMN `status` SMALLINT  NOT NULL DEFAULT 0 AFTER `name`;

ALTER TABLE `reservation` ADD COLUMN `confirmId` VARCHAR(128) AFTER `status`;

