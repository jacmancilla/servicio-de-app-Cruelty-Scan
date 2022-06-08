CREATE TABLE `crueltyscan`.`mascota` (
  `id_animal` INT NOT NULL AUTO_INCREMENT,
  `color` VARCHAR(45) NOT NULL,
  `tamano` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `edad` INT NULL,
  `tipo_mascota` VARCHAR(20) NOT NULL,
  `foto` BLOB NOT NULL,
  `rut` VARCHAR(10) NOT NULL,
  `adoptado` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id_animal`));

ALTER TABLE `crueltyscan`.`mascota` 
ADD INDEX `fk_mascota_usuario_por_rut_idx` (`rut` ASC);
;
ALTER TABLE `crueltyscan`.`mascota` 
ADD CONSTRAINT `fk_mascota_usuario_por_rut`
  FOREIGN KEY (`rut`)
  REFERENCES `crueltyscan`.`usuario` (`rut`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
