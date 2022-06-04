CREATE TABLE `crueltyscan`.`cliente` (
  `rut` VARCHAR(10) NOT NULL,
  `nombre_cliente` VARCHAR(30) NOT NULL,
  `apellido_pa` VARCHAR(30) NOT NULL,
  `apellido_ma` VARCHAR(30) NULL,
  `id_comuna` INT NOT NULL
  PRIMARY KEY (`rut`));

ALTER TABLE `crueltyscan`.`cliente` 
ADD CONSTRAINT `fk_cliente_usuario_por_rut`
  FOREIGN KEY (`rut`)
  REFERENCES `crueltyscan`.`usuario` (`rut`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_cliente_contacto_por_rut`
  FOREIGN KEY (`rut`)
  REFERENCES `crueltyscan`.`contacto` (`rut`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `crueltyscan`.`cliente` 
ADD INDEX `fk_cliente_comuna_por_id_comuna_idx` (`id_comuna` ASC);
;
ALTER TABLE `crueltyscan`.`cliente` 
ADD CONSTRAINT `fk_cliente_comuna_por_id_comuna`
  FOREIGN KEY (`id_comuna`)
  REFERENCES `crueltyscan`.`comuna` (`id_comuna`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
