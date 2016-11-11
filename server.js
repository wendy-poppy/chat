/**
 * Created by wendy on 16/11/11.
 */
var http = require('http');
var fs = require('fs');
var mime = require('mime');
var server = http.createServer(handle).listen(9922);
//绑定服务器
var io = require('socket.io')(server);

function handle(request,response){
    var filePath = '';
    if(request.url == '/'){
        filePath = './public/html/index.html';
    }else{
        filePath = './public/' + request.url;
    }
    serverStatic(response,filePath);
}

function serverStatic(response,filePath) {
    fs.exists(filePath,function (exists) {
        if(exists){
            fs.readFile(filePath,function (err,data) {
                if(err){
                    send404(response);
                }
                response.writeHead(200,{
                    "Content-Type":mime.lookup(filePath)
                });
                response.end(data);
            })
        }else{
            send404(response)
        }
    })
}

function send404(response) {
    fs.readFile('./public/html/404.html',function (err,data) {
        if(err){
            return;
        }
        response.end(data);
    })
}


var num = 0;
var arr = [];
var timer = null;
io.on('connection',function (socket) {
    num++;
    clearInterval(timer);
    setInterval(function () {
        socket.emit('news',{number:num,data:arr});
    },1000);
    socket.on('message',function (data) {
        if(data.msg){
            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var seconds = date.getSeconds();
            arr.push(data.msg+'---'+hour+':'+minute+':'+seconds);
            console.log(data);
        }
    })
})


