CREATE DATABASE  IF NOT EXISTS `gestiondeconvenios` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gestiondeconvenios`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: gestiondeconvenios
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
-- Table structure for table `actividad`
--

DROP TABLE IF EXISTS `actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividad` (
  `id_actividad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fecha` date DEFAULT NULL,
  `lugar` varchar(255) DEFAULT NULL,
  `participante` int DEFAULT NULL,
  `id_convenio` int NOT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_actividad`),
  KEY `actividad_convenio_idx` (`id_convenio`),
  CONSTRAINT `actividad_convenio` FOREIGN KEY (`id_convenio`) REFERENCES `convenio` (`id_convenio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividad`
--

LOCK TABLES `actividad` WRITE;
/*!40000 ALTER TABLE `actividad` DISABLE KEYS */;
/*!40000 ALTER TABLE `actividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `convenio`
--

DROP TABLE IF EXISTS `convenio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `convenio` (
  `id_convenio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `utilidad` int DEFAULT NULL,
  `objeto` varchar(1000) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `clausula_peas` varchar(255) DEFAULT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  `id_organismo` int NOT NULL,
  `id_tipo_convenio` int NOT NULL,
  `id_resolucion` int NOT NULL,
  PRIMARY KEY (`id_convenio`),
  KEY `id_organismo_idx` (`id_organismo`),
  KEY `convenio_resolucion_idx` (`id_resolucion`),
  KEY `convenio_tipo_convenio_idx` (`id_tipo_convenio`),
  CONSTRAINT `convenio_organismo` FOREIGN KEY (`id_organismo`) REFERENCES `organismo` (`id_organismo`),
  CONSTRAINT `convenio_resolucion` FOREIGN KEY (`id_resolucion`) REFERENCES `resolucion` (`id_resolucion`),
  CONSTRAINT `convenio_tipo_convenio` FOREIGN KEY (`id_tipo_convenio`) REFERENCES `tipo_convenio` (`id_tipo_convenio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convenio`
--

LOCK TABLES `convenio` WRITE;
/*!40000 ALTER TABLE `convenio` DISABLE KEYS */;
INSERT INTO `convenio` VALUES (1,'prueba3',NULL,NULL,NULL,NULL,NULL,'B',5,1,1);
/*!40000 ALTER TABLE `convenio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organismo`
--

DROP TABLE IF EXISTS `organismo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organismo` (
  `id_organismo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `id_tipo_organismo` int NOT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_organismo`),
  KEY `id_tipo_organismmo_idx` (`id_tipo_organismo`),
  CONSTRAINT `id_tipo_organismmo` FOREIGN KEY (`id_tipo_organismo`) REFERENCES `tipo_organismo` (`id_tipo_organismo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organismo`
--

LOCK TABLES `organismo` WRITE;
/*!40000 ALTER TABLE `organismo` DISABLE KEYS */;
INSERT INTO `organismo` VALUES (5,'1',1,'A');
/*!40000 ALTER TABLE `organismo` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resolucion`
--

LOCK TABLES `resolucion` WRITE;
/*!40000 ALTER TABLE `resolucion` DISABLE KEYS */;
INSERT INTO `resolucion` VALUES (1,123,2023,'A');
/*!40000 ALTER TABLE `resolucion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsable`
--

DROP TABLE IF EXISTS `responsable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsable` (
  `dni_responsable` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `id_organismo` int NOT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`dni_responsable`),
  KEY `id_organismo_idx` (`id_organismo`),
  CONSTRAINT `id_organismo` FOREIGN KEY (`id_organismo`) REFERENCES `organismo` (`id_organismo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsable`
--

LOCK TABLES `responsable` WRITE;
/*!40000 ALTER TABLE `responsable` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'administrador','A'),(2,'operario','A');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_convenio`
--

DROP TABLE IF EXISTS `tipo_convenio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_convenio` (
  `id_tipo_convenio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `tipo_conveniocol` varchar(45) DEFAULT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_tipo_convenio`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_convenio`
--

LOCK TABLES `tipo_convenio` WRITE;
/*!40000 ALTER TABLE `tipo_convenio` DISABLE KEYS */;
INSERT INTO `tipo_convenio` VALUES (1,'Prueba22','Prueba8','A'),(2,'Prueba1','Prueba2','A'),(3,'Prueba33','Prueba3','B');
/*!40000 ALTER TABLE `tipo_convenio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_organismo`
--

DROP TABLE IF EXISTS `tipo_organismo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_organismo` (
  `id_tipo_organismo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `estado` enum('A','B') NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_tipo_organismo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_organismo`
--

LOCK TABLES `tipo_organismo` WRITE;
/*!40000 ALTER TABLE `tipo_organismo` DISABLE KEYS */;
INSERT INTO `tipo_organismo` VALUES (1,'prueba1','A');
/*!40000 ALTER TABLE `tipo_organismo` ENABLE KEYS */;
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
  `estado` enum('A','B') COLLATE latin1_bin NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_usuario`),
  KEY `id_rol_idx` (`id_rol`),
  CONSTRAINT `id_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'pablo','saucedo',35327089,'psaucedo','$2b$10$nPxRImYBEK3mnTVlnvTHCeORdxHtQX4C8ztmRZC/LfHoxagSpC8ze','psaucedo@gmail.com',1,'A'),(2,'Agustina','Munaretto',38327082,'amunaretto','$2b$10$PB91StjTXFOjRzx9GZr2MOknC7W9CYFEIlbUoC7BBTvqCvuKlqHDC','psaucedo@gmail.com',1,'A');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'gestiondeconvenios'
--

--
-- Dumping routines for database 'gestiondeconvenios'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-16 23:24:28
