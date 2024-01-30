CREATE DATABASE IF NOT EXISTS `presupuesto-familiar`;

USE `presupuesto-familiar`;

DROP TABLE IF EXISTS `ingreso`;

CREATE TABLE IF NOT EXISTS `ingreso` (
   `id_ingreso` INT(11) NOT NULL PRIMARY KEY auto_increment,
   `fecha_ingreso` DATE NOT NULL,
   `concepto` varchar(30) NOT NULL,
   `monto_ingreso` FLOAT(12,4) NOT NULL
);

DROP TABLE IF EXISTS `egreso`;

CREATE TABLE IF NOT EXISTS `egreso` (
   `id_egreso` INT(11) NOT NULL PRIMARY KEY auto_increment,
   `fecha_egreso` DATE NOT NULL,
   `concepto` varchar(30) NOT NULL,
   `monto_egreso` FLOAT(12,4) NOT NULL
);