CREATE TABLE `crueltyscan`.`prod_favorito` (
  `id_favorito` INT NOT NULL,
  `cod_barra` VARCHAR(20) NOT NULL,
  `rut` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_favorito`));

ALTER TABLE `crueltyscan`.`prod_favorito` 
ADD INDEX `fk_producto_favorito_id_idx` (`cod_barra` ASC),
ADD INDEX `fk_producto_favorito_rut_idx` (`rut` ASC);
;
ALTER TABLE `crueltyscan`.`prod_favorito` 
ADD CONSTRAINT `fk_producto_favorito_id`
  FOREIGN KEY (`cod_barra`)
  REFERENCES `crueltyscan`.`producto` (`cod_barra`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_producto_favorito_rut`
  FOREIGN KEY (`rut`)
  REFERENCES `crueltyscan`.`usuario` (`rut`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
