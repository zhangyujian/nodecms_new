/*
SQLyog Ultimate v8.71 
MySQL - 5.1.62-community : Database - nodecms
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nodecms` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `nodecms`;

/*Table structure for table `cat` */

DROP TABLE IF EXISTS `cat`;

CREATE TABLE `cat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `pid` int(11) DEFAULT NULL,
  `link` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `cat` */

insert  into `cat`(`id`,`name`,`pid`,`link`) values (3,'新闻',NULL,'news'),(4,'微电影',NULL,'111'),(5,'媒体报道',NULL,'media');

/*Table structure for table `posts` */

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(30) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `title` text,
  `content` longtext,
  `status` varchar(20) DEFAULT 'open',
  `modified` datetime DEFAULT NULL,
  `type` varchar(20) DEFAULT 'post',
  `order` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `posts` */

insert  into `posts`(`id`,`author`,`date`,`title`,`content`,`status`,`modified`,`type`,`order`,`cid`) values (10,'admin','2014-06-22 19:04:43','123123123123','请使用markdown语法书写正文','open',NULL,'post',NULL,4),(11,'admin','2014-06-22 19:04:52','玩玩儿玩儿玩儿','请使用markdown语法书写正文','open',NULL,'post',NULL,3),(12,'admin','2014-06-25 14:47:01','11111111111111','请使用markdown语法书写正文\r\n\r\n![图片](/upload/img/3232-si0tia.jpg)\r\n\r\n111111\r\n---------\r\n\r\n','open',NULL,'post',NULL,NULL);

/*Table structure for table `sorts` */

DROP TABLE IF EXISTS `sorts`;

CREATE TABLE `sorts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sorts` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(255) NOT NULL,
  `email` char(255) NOT NULL,
  `password` char(255) NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`email`,`password`) values (1,'admin','admin@admin.com','e10adc3949ba59abbe56e057f20f883e'),(4,'张玉建','zhangyujian@xiangshang360.com','e10adc3949ba59abbe56e057f20f883e'),(8,'刘洋111','liuyang@xiangshang360.com','6512bd43d9caa6e02c990b0a82652dca'),(13,'测试','test1111@test.com','4297f44b13955235245b2497399d7a93'),(14,'测试测试测试测试测试测试测试测试测试测试测试测试','test1112@test.com','52ef0af336c65cdc8c221e79246b7171'),(15,'测试测试测试','test111333@test.com','ac01f1bac5b90490edef64996a53f6ad');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
