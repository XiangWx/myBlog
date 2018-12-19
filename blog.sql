/*
Navicat MySQL Data Transfer

Source Server         : mydata
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-12-19 18:18:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text,
  `ctime` varchar(255) NOT NULL,
  `authorld` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', 'node', '1', '2018-12-17 21:57:04', '1');
INSERT INTO `article` VALUES ('12', 'express的常用api', 'node day03\r\n\r\nnpm\r\n\r\nNode包管理器 (Node Package Manager)\r\n\r\n    npm init // 初始化项目\r\n\r\n安装全局包:\r\n\r\n    npm install -g i5ting_toc\r\n\r\n安装完成之后就可以直接使用了, 所有的全局包都存放在:\r\n\r\n    C:\\Users\\用户名\\AppData\\Roaming\\npm\r\n\r\n卸载全局包:\r\n\r\n    npm uninstall -g i5ting_toc\r\n\r\n安装项目中使用的包(本地包):\r\n\r\n    npm install jquery\r\n\r\n卸载本地包:\r\n\r\n    npm uninstall jquery\r\n\r\n注意: 安装本地包之前一定要确定, 当前目录必须有合法的package.json文件, 如果没有该文件, 则需要执行 npm init -y 进行初始化\r\n\r\n-D 参数: 将包安装到开发依赖, devDependencies节点下, 表示项目在开发阶段需要用到这些包, 上线后就不需要使用了\r\n\r\ninstall 可以简写为 i \r\n\r\n    npm i webpack -D\r\n\r\nnpm install : 将package.json中的dependencies和devDependencies节点的所有包都安装到本地\r\n\r\n    npm install\r\n\r\n简写:\r\n\r\n    npm i\r\n\r\n--production 参数: 用于安装项目上线所用到的依赖包, 开发依赖不安装\r\n\r\n    npm i --production\r\n\r\n\r\n\r\nhttp模块\r\n\r\n使用http模块可以用于创建服务器\r\n\r\n1. 导入http模块\r\n       const http = require(\'http\')\r\n2. 创建服务器对象\r\n       const server = http.createServer()\r\n3. 监听请求事件\r\n       server.on(\'request\', (req, res) => {\r\n       	// req 请求对象\r\n       	// res 响应对象\r\n       	res.end(\'hello world\')\r\n       })\r\n4. 启动服务器\r\n       server.listen(\'8080\', \'127.0.0.1\', () => {\r\n       	// 启动成功的回调函数\r\n       	console.log(\'服务器运行成功! http://127.0.0.1:8080\')\r\n       })\r\n\r\n乱码处理\r\n\r\n直接通过end()方法返回数据, 浏览器会用默认的码表来解析数据, 所以如果返回中文会导致乱码问题, 需要在响应头中指定数据的编码格式\r\n\r\n    server.on(\'request\', (req, res) => {\r\n    	// 在end方法执行之前设置响应头\r\n    	res.writeHeader(200, {\r\n    		Content-Type: \'text/plain;charset=utf-8\'\r\n    	})\r\n    \r\n    	// req 请求对象\r\n    	// res 响应对象\r\n    	res.end(\'hello world\')\r\n    })\r\n\r\n在request事件监听中, req对象可以获取到用户请求的路径:\r\n\r\n    req.url\r\n\r\n通过该属性可以用于判断用户请求的路径, 决定返回具体的内容\r\n\r\n服务端渲染页面\r\n\r\n1. 安装art-template\r\n       npm install art-template\r\n2. 导入art-template\r\n       const template = require(\'art-template\')\r\n3. 当用户请求时, 使用template方法进行拼接模板, 最后通过res.end()方法响应拼接的HTML字符串给用户\r\n       server.on(\'request\', (req, res) => {\r\n       	if (req.url === \'/\') {\r\n       		let htmlStr = template(path.join(__dirname, \'./views/index.html\'), {name: \'xxx\', age: 18})\r\n       		res.end(htmlStr)\r\n       	}\r\n       })\r\n\r\nnodemon工具的使用\r\n\r\nmonitor: 监视器\r\n\r\n作用: 当服务器代码修改后自动重启服务器\r\n\r\n安装:\r\n\r\n    npm install nodemon -g\r\n\r\n使用:\r\n\r\n以前都是使用node运行js文件, 现在使用nodemon运行即可\r\n\r\n    nodemon 1.js\r\n\r\n开启以后无需再次关闭, 如果修改了1.js文件的代码, 将会自动重启\r\n\r\nexpress\r\n\r\n基于node的http模块进行的封装, 没有对原生方法进行覆盖, 而是扩展更方便更好用的api\r\n\r\n好用!\r\n\r\n基本的express服务器用法:\r\n\r\n1. 安装express\r\n       npm install express -S\r\n2. 导入express\r\n       const express = require(\'express\')\r\n3. 调用express()方法创建服务器对象\r\n       const app = express()\r\n4. 服务器对象可以通过 get/post 等等方法来监听客户端的不同方式的请求\r\n       app.get(\'/\', (req, res) => {\r\n       	// res.end() // 原生的http模块的响应方法\r\n       	res.send() // express封装的高级方法, 直接处理了乱码问题\r\n       })\r\n5. 调用listen()方法开启服务器\r\n       app.listen(3000, () => {\r\n       	console.log(\'服务器启动成功! http://127.0.0.1:3000\')\r\n       })\r\n\r\nexpress的常用api\r\n\r\nres.send()\r\n\r\n1. 响应纯文本内容\r\n2. 响应对象数据(最终会被转换为JSON字符串)\r\n3. 响应二进制数据\r\n\r\nres.sendFile()\r\n\r\n1. 响应静态资源\r\n   注意: 如果只传入一个参数, 必须传入绝对路径, 如果传入两个参数, 第一个参数就是相对于第二个参数的路径来识别的\r\n', '2018-12-19 09:25:21', '1');
INSERT INTO `article` VALUES ('10', 'node', '1', '2018-12-18 14:51:39', '1');
INSERT INTO `article` VALUES ('13', 'express获取参数', '1. express中获取参数的几种形式\r\n\r\n1. 获取 http://127.0.0.1:3001/user?id=10&name=zs 中的查询参数：\r\n   - 直接使用 req.query 获取参数即可；\r\n   - 注意：URL 地址栏中通过 查询字符串 传递的参数，express 框架会直接解析，大家只需要使用 req.query 直接获取 URL 中 查询字符串的参数；\r\n2. 从URL地址中获取路径参数：\r\n   - 假设后台的路由是 app.get(\'/user/:id/:name\', (req, res) => {})\r\n   - 假设客户端浏览器请求的URL地址为：http://127.0.0.1:3001/user/10/zs\r\n   - 直接使用 req.params 可以获取URL地址中传递过来的参数；\r\n3. 从post表单中获取提交的数据：\r\n   - 借助于body-parser来解析表单数据\r\n   - 安装：npm i body-parser -S\r\n   - 导入：const bodyParser = require(\'body-parser\')\r\n   - 注册中间件：app.use(bodyParser.urlencoded({ extended: false }))\r\n   - 使用解析的数据： req.body 来访问解析出来的数据\r\n\r\n        ', '2018-12-19 17:35:34', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `ctime` varchar(255) NOT NULL,
  `isdel` tinyint(255) NOT NULL DEFAULT '0' COMMENT '0代码正常 1是注销',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'ww', '123', 'wang', '2018/12/14', '0');
INSERT INTO `user` VALUES ('9', 'xwz', '$2a$10$uQsRdMq5Hhtissblm4zTfOSFD9qPmWD75TS/mgE6Mq8Qiy7vJVbdO', '我就是传说中的小巷子', '2018-12-19 05:40:55', '0');
INSERT INTO `user` VALUES ('8', 'jack', '$2a$10$uVEI7yKt4fRxg9GfgNkL7ewOUlcF8ykG6u7J1w9PdbsNFcXFSm9qe', 'jack', '2018-12-19 09:16:17', '0');
INSERT INTO `user` VALUES ('7', 'som', '$2a$10$fKkdmA1IGrxdkhJOHb3LJe8stnlsSC8M.C63NzKUC8PlExIa8Lt.i', 'som', '2018-12-18 09:51:36', '0');
INSERT INTO `user` VALUES ('10', 'xxz', '$2a$10$KM9UiT3DNlXsFK3oXlCe5.6mc68sSinBs.3fPT8UnDYOrtNR.Edyy', '小象子', '2018-12-19 05:45:44', '0');
