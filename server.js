var express = require('express');
var proxy = require('http-proxy-middleware');//引入代理中间件
var app = express();
app.use(express.static('./public'));
//app.use(express.static('client'));

// Add middleware for http proxying
var connProxy = proxy('/myapp/conn', { target: 'http://121.248.55.88:80',changeOrigin: true });//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
app.use('/myapp/conn/*', connProxy);//api子目录下的都是用代理

/*var photoProxy = proxy('/myapp/photo', { target: 'http://121.248.55.88:80',changeOrigin: true });//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
app.use('/myapp/photo/!*', photoProxy);//api子目录下的都是用代理*/

var newsProxy = proxy('/myapp/news', { target: 'http://121.248.55.88:80',changeOrigin: true });
app.use('/myapp/news/*',newsProxy);
// Render your site

app.get('/personInfo.html', function(req,res){
    res.sendFile(__dirname+'/public/personInfo.html');
});
app.get('/xiaozhu.html', function(req,res){
    res.sendFile(__dirname+'/public/xiaozhu.html');
});


app.listen(3000,function (){
    console.log('Listening on: http://localhost:3000');
});