const express = require("express");
const app = express();

const bodyParse = require('body-parser');
// const cookieParser = require('cookie-parser');

const Mock = require("./mock.min.js");
const jsonData = require("./mock-data.js");

// app.use(cookieParser());
app.use(bodyParse.urlencoded({extended:false}));
app.use(express.static('public'));

// 解决跨域问题
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /*让options请求快速返回*/
  }
  else {
    next();
  }
})

// mock 数据写法
// 1、首页列表
app.get('/homeLists', function (req, res) {
  var result = {};
  result = Mock.mock(jsonData.homeLists);
  res.end(JSON.stringify(result));
})

// 监听3000端口
const server = app.listen(8080, function () {
	console.log('listening at =====> http://127.0.0.1:8080...');
});
