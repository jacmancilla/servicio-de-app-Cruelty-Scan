CREATE TABLE `crueltyscan`.`usuario` (
  `rut`  VARCHAR(10) NOT NULL,
  `contra` VARCHAR(15) NOT NULL,
  'id_tipo' INT NOT NULL,
  PRIMARY KEY (`rut`));
  
ALTER TABLE `crueltyscan`.`usuario` 
ADD INDEX `fk_usuario_tipousuario_por_idtipo_idx` (`id_tipo` ASC);
;
ALTER TABLE `crueltyscan`.`usuario` 
ADD CONSTRAINT `fk_usuario_tipousuario_por_idtipo`
  FOREIGN KEY (`id_tipo`)
  REFERENCES `crueltyscan`.`tipo_usuario` (`id_tipo`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
