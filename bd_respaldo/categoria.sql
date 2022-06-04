CREATE TABLE `crueltyscan`.`categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nom_categoria` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_categoria`));



INSERT INTO `crueltyscan`.`categoria` (`id_categoria`, `nom_categoria`) VALUES ('1', 'maquillaje y belleza');
INSERT INTO `crueltyscan`.`categoria` (`id_categoria`, `nom_categoria`) VALUES ('2', 'cuidado capilar');
INSERT INTO `crueltyscan`.`categoria` (`id_categoria`, `nom_categoria`) VALUES ('3', 'articulo de higiene');
INSERT INTO `crueltyscan`.`categoria` (`id_categoria`, `nom_categoria`) VALUES ('4', 'cuidado personal');
