CREATE TABLE `crueltyscan`.`producto` (
  `cod_barra` VARCHAR(20,
  `nom_producto` VARCHAR(20) NOT NULL,
  `test` TINYINT NOT NULL,
  `categoria` VARCHAR(45) NOT NULL,
  `id_marca` INT NOT NULL,
  `id_categoria` INT NOT NULL,
  `cod_barra` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id_producto`));

ALTER TABLE `crueltyscan`.`producto` 
ADD INDEX `fk_producto_marca_idx` (`id_marca` ASC);
;
ALTER TABLE `crueltyscan`.`producto` 
ADD CONSTRAINT `fk_producto_marca`
  FOREIGN KEY (`id_marca`)
  REFERENCES `crueltyscan`.`marca` (`id_marca`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


ALTER TABLE `crueltyscan`.`producto` 
ADD INDEX `fk_producto_id_categoria_idx` (`id_categoria` ASC);
;
ALTER TABLE `crueltyscan`.`producto` 
ADD CONSTRAINT `fk_producto_categoria_id`
  FOREIGN KEY (`id_categoria`)
  REFERENCES `crueltyscan`.`categoria` (`id_categoria`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
