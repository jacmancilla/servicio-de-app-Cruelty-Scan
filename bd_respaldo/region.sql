CREATE TABLE `crueltyscan`.`region` (
  `id_region` INT NOT NULL,
  `nom_region` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_region`));


INSERT INTO `region` (`id`, `name`)
VALUES
  (1,'Arica y Parinacota'),
  (2,'Tarapacá'),
  (3,'Antofagasta'),
  (4,'Atacama'),
  (5,'Coquimbo'),
  (6,'Valparaiso'),
  (7,'Metropolitana de Santiago'),
  (8,'Libertador General Bernardo O\'Higgins'),
  (9,'Maule'),
  (10,'Ñuble'),
  (11,'Biobío'),
  (12,'La Araucanía'),
  (13,'Los Ríos'),
  (14,'Los Lagos'),
  (15,'Aisén del General Carlos Ibáñez del Campo'),
  (16,'Magallanes y de la Antártica Chilena');