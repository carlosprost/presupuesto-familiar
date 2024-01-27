CREATE DATABASE IF NOT EXISTS `presupuesto-familiar`;
USE `presupuesto-familiar`;

CREATE TABLE IF NOT EXISTS `ingreso` (
   `id_ingreso` INT(11) NOT NULL PRIMARY KEY auto_increment,
   `fecha_ingreso` DATE NOT NULL,
   `concepto` varchar(30) NOT NULL,
   `monto_ingreso` INT(11) NOT NULL
);

CREATE TABLE IF NOT EXISTS `egreso` (
   `id_egreso` INT(11) NOT NULL PRIMARY KEY auto_increment,
   `fecha_egreso` DATE NOT NULL,
   `concepto` varchar(30) NOT NULL,
   `monto_egreso` INT(11) NOT NULL
);