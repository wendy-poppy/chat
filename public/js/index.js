var socket = io('http://10.80.13.54:9922');
var number = document.querySelector("span");
var list = document.querySelector("ul");
var info = document.querySelector(".message");
var btn = document.querySelector(".btn");
//客户端接收数据
socket.on('news',function (data) {
    number.innerHTML = data.number;
    //存放数据
    var arr = data.data;
    list.innerHTML = '';
    for(var i = 0; i < arr.length; i++){
        var li = document.createElement("li");
        li.innerHTML = arr[i];
        list.appendChild(li);
    }
    btn.onclick = function () {
         //向服务器发送数据
         socket.emit('message',{msg:info.value});
        info.value = '';
    }
})

