CREATE DATABASE  IF NOT EXISTS `gestiondeconvenio` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gestiondeconvenio`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: gestiondeconvenio
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actividades`
--

DROP TABLE IF EXISTS `actividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividades` (
  `id_actividad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha` varchar(50) DEFAULT NULL,
  `lugar` varchar(255) DEFAULT NULL,
  `participante` int DEFAULT NULL,
  `id_convenio` int NOT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_actividad`),
  KEY `actividad_convenio_idx` (`id_convenio`),
  CONSTRAINT `actividad_convenio` FOREIGN KEY (`id_convenio`) REFERENCES `convenios` (`id_convenio`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividades`
--

LOCK TABLES `actividades` WRITE;
/*!40000 ALTER TABLE `actividades` DISABLE KEYS */;
INSERT INTO `actividades` VALUES (1,'Rolaltitooo1023','12-12-2023','Posadas',1,1,'B'),(7,'Prueba110022','12-12-2023','Posadas',4,3,'A'),(8,'Ronaltito','12-02-2024','Posadas',123,4,'A'),(9,'Prueba13','30-11-2023','Posadas',234,1,'A'),(10,'Prueba14','10-10-2023','Garupa',23,3,'A'),(11,'Prueba15','10-10-2022','Obera',123,1,'A'),(12,'Prueba','12-12-2023','Posadas',1,1,'A'),(13,'Titoretto','05-02-2022','Candelaria',34,1,'A'),(14,'Titoretto','05-02-2022','Candelaria',34,1,'A'),(15,'Titoretto','05-02-2022','Candelaria',34,1,'A'),(16,'Titoretto','','',6,3,'A'),(17,'Azarmessi','','',234,1,'A'),(18,'Pepe','12-11-2022','Posadas',12,4,'A');
/*!40000 ALTER TABLE `actividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `convenios`
--

DROP TABLE IF EXISTS `convenios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `convenios` (
  `id_convenio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `utilidad` int DEFAULT NULL,
  `objeto` varchar(1000) DEFAULT NULL,
  `fecha_inicio` varchar(100) DEFAULT NULL,
  `fecha_fin` varchar(100) DEFAULT NULL,
  `clausula_peas` varchar(255) DEFAULT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  `id_organismo` int DEFAULT NULL,
  `id_tipo_convenio` int DEFAULT NULL,
  `id_resolucion` int DEFAULT NULL,
  PRIMARY KEY (`id_convenio`),
  KEY `id_organismo_idx` (`id_organismo`),
  KEY `convenio_resolucion_idx` (`id_resolucion`),
  KEY `convenio_tipo_convenio_idx` (`id_tipo_convenio`),
  CONSTRAINT `convenio_organismo` FOREIGN KEY (`id_organismo`) REFERENCES `organismos` (`id_organismo`),
  CONSTRAINT `convenio_resolucion` FOREIGN KEY (`id_resolucion`) REFERENCES `resolucion` (`id_resolucion`),
  CONSTRAINT `convenio_tipo_convenio` FOREIGN KEY (`id_tipo_convenio`) REFERENCES `tipo_convenios` (`id_tipo_convenio`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convenios`
--

LOCK TABLES `convenios` WRITE;
/*!40000 ALTER TABLE `convenios` DISABLE KEYS */;
INSERT INTO `convenios` VALUES (1,'prueba300',3500,'cooparticipacion','12-12-2022','12-12-2023','Pepona','B',5,1,1),(3,'prueba45',2000,'convenio','15-08-2022','10-12-2023','Cebolla','A',5,1,1),(4,'prueba55',321654,'convenio','11-11-2021','11-11-2023','colectivo','A',5,1,1),(6,'Convenio12',123123,'Trato','12-12-2023','12-12-2024','1235','A',9,2,6),(7,'asdfasdf',123412,'asdfasdf','12-12-2023','12-12-2022','321231','B',5,1,1);
/*!40000 ALTER TABLE `convenios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id_menu` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `href` varchar(150) NOT NULL,
  `id_rol` int NOT NULL,
  PRIMARY KEY (`id_menu`),
  KEY `menu_roles_idx` (`id_rol`),
  CONSTRAINT `menu_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Convenios','/convenios',1),(4,'Convenios','/convenios',2),(5,'Organismos','/organismos',1),(12,'Resolucion','/resolucion',1),(13,'Actividades','/Actividades',1),(16,'Tipo de organismos','/Tipo_organismos',1),(17,'Tipo de convenios','/tipo_convenios',1),(18,'Responsables','/responsable',1),(19,'Usuarios','/usuarios',1),(23,'Organismos','/organismos',2),(25,'Actividades','/actividades',2),(26,'Tipo de organismos','/tipo_organismos',2),(27,'Tipo de convenios','/tipo_convenios',2),(28,'Responsables','/responsable',2);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organismos`
--

DROP TABLE IF EXISTS `organismos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organismos` (
  `id_organismo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `id_tipo_organismo` int DEFAULT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_organismo`),
  KEY `id_tipo_organismmo_idx` (`id_tipo_organismo`),
  CONSTRAINT `id_tipo_organismmo` FOREIGN KEY (`id_tipo_organismo`) REFERENCES `tipo_organismos` (`id_tipo_organismo`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organismos`
--

LOCK TABLES `organismos` WRITE;
/*!40000 ALTER TABLE `organismos` DISABLE KEYS */;
INSERT INTO `organismos` VALUES (5,'Pruebaas23',1,'A'),(9,'Prueba',1,'B'),(17,'Prueba302',4,'A'),(18,'Prueba303',4,'A'),(19,'Prueba304',3,'A'),(20,'Prueba305',2,'A'),(21,'Organismo1',5,'A'),(22,'Kiwi',6,'A');
/*!40000 ALTER TABLE `organismos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resolucion`
--

DROP TABLE IF EXISTS `resolucion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resolucion` (
  `id_resolucion` int NOT NULL AUTO_INCREMENT,
  `numero` int NOT NULL,
  `ano` int NOT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_resolucion`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resolucion`
--

LOCK TABLES `resolucion` WRITE;
/*!40000 ALTER TABLE `resolucion` DISABLE KEYS */;
INSERT INTO `resolucion` VALUES (1,123,2023,'A'),(6,3765,2022,'A');
/*!40000 ALTER TABLE `resolucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsable`
--

DROP TABLE IF EXISTS `responsable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsable` (
  `id_responsable` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `id_organismo` int NOT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_responsable`),
  KEY `id_organismo_idx` (`id_organismo`),
  CONSTRAINT `id_organismo` FOREIGN KEY (`id_organismo`) REFERENCES `organismos` (`id_organismo`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsable`
--

LOCK TABLES `responsable` WRITE;
/*!40000 ALTER TABLE `responsable` DISABLE KEYS */;
INSERT INTO `responsable` VALUES (1,'Caramelo12',5,'B'),(2,'Prueba2',5,'A'),(4,'Responsable2',9,'A'),(5,'Responsable12',9,'A'),(7,'Responsable33',20,'A'),(8,'Prueba2',5,'A'),(22,'uva',5,'A'),(23,'Chupetin',17,'A');
/*!40000 ALTER TABLE `responsable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador','A'),(2,'Operario','A'),(3,'Externo','A');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_convenios`
--

DROP TABLE IF EXISTS `tipo_convenios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_convenios` (
  `id_tipo_convenio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tipo_conveniocol` varchar(45) DEFAULT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_tipo_convenio`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_convenios`
--

LOCK TABLES `tipo_convenios` WRITE;
/*!40000 ALTER TABLE `tipo_convenios` DISABLE KEYS */;
INSERT INTO `tipo_convenios` VALUES (1,'Prueba2223','Prueba8','A'),(2,'Prueba1','Prueba2','A'),(3,'Prueba33','Prueba3','B'),(8,'Convenio tipo','Tipo col','A'),(9,'Tipo4','Tipo5','A'),(10,'Pepa','Pig','A');
/*!40000 ALTER TABLE `tipo_convenios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_organismos`
--

DROP TABLE IF EXISTS `tipo_organismos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_organismos` (
  `id_tipo_organismo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_tipo_organismo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_organismos`
--

LOCK TABLES `tipo_organismos` WRITE;
/*!40000 ALTER TABLE `tipo_organismos` DISABLE KEYS */;
INSERT INTO `tipo_organismos` VALUES (1,'prueba13','A'),(2,'prueba2','B'),(3,'prueba3','B'),(4,'prueba4','B'),(5,'Prueba37','B'),(6,'Organismo tipo2','A'),(7,'Popeye','A');
/*!40000 ALTER TABLE `tipo_organismos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apellido` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dni` int DEFAULT NULL,
  `user` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pass` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `correo` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_rol` int NOT NULL,
  `estado` enum('A','B') CHARACTER SET latin1 COLLATE latin1_bin NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_usuario`),
  KEY `id_rol_idx` (`id_rol`),
  CONSTRAINT `id_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Pablo','Saucedo',35327089,'psaucedo','$2b$10$W5k2d4N.AxSgzz91tkfTMO9X1R35HGGod/.sBsVlVepWo4xgcHDm.','psaucedo@gmail.com',2,'A'),(2,'Agustina','Munaretto',38327082,'amunaretto','$2b$10$zObgRivlJAW4Nve.CSiAQ.GUNdYtgXKjBlfyTPTYv3RUQwYD7j47a','psaucedo@gmail.com',1,'B'),(4,'martin','zapata',30321654,'mzapata','$2b$10$1hSe.swtQD4XdhoMfiwtQe6qM8ao6n9MBOhHMEGZqnmH6c0U7oglq','mzapata@gmail.com',1,'A'),(5,'Camil','Piriz',40321653,'pcamila','$2b$10$NUnYOVIqUoXI8Wtr2ztqbOZlTpXnG1vv6b9N0OjsoWQDkvFWSMXAa','pcamila@gmail.com',1,'A'),(6,'Jose','Ponce',33321654,'jponce','$2b$10$MUqq.QicVfBFSCeajxs0Aezz4vJqwiAbCsgvs0xOcWOIHnP.WeJAa','jponce@gmail.com',1,'A'),(7,'Ezequiel','Acosta',35327089,'eacosta','$2b$10$5Kq0SHIzyl.NyewOsAqkV.yN.tJyaZQrFTzAOzVnRVgEkmN3Z.rD6','eacosta@gmail.com',1,'A'),(8,'Benjamin','Sena',40321654,'bsena','$2b$10$6dK5cez54VkT1d6iADBUkONaHYBjfJog4egaHKOPYmTq9cThYKyEW','bsena@gmail.com',1,'A'),(10,'pepe','argento',12123454,'apepe','$2b$10$BH4vW.5CUuoQAOPb10lA/OFib5gYoMOxIYpp.LY2BEUsurCYHImYi','apepe@gmail.com',1,'A'),(12,'Mauro','Flores',35123654,'mflores','$2b$10$9Y8MKRNfmjeCsHbfJGY33u7dK.12JZQTkfwyqiTSBlaF7H6ngz7Yu','mflores@gmail.com',1,'A'),(13,'Natalia','Benitez',32654987,'Nbenitez','$2b$10$K5otElC50XZ3NLulwG/4VuF9g.L.PICHg2/kVteEtN1sTIdX745qq','bnatalia@gmail.com',1,'A'),(14,'Pig','Pepa',56987456,'pepa','$2b$10$DZze9n5Fr1dFeOY0i.I16uVjhS5l776zQ2jOmrkwlLiIv1.NXxFNO','pepa@gmail.com',2,'A');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'gestiondeconvenio'
--

--
-- Dumping routines for database 'gestiondeconvenio'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-18 19:52:28
