"use strict";

const socket = io.connect("http://localhost:8080"),
      olChat = document.getElementsByClassName('chat'),
      button  = document.getElementById('sender'),
      messages = document.getElementById('message');
let   textarea = document.getElementById('textarea');

let liOther = document.createElement('li');
liOther.className = "other";


let liSelf = document.createElement('li');
liSelf.className = "self";

let rowOne = "<div class='avatar'><img src='https://i.imgur.com/DY6gND0.png' draggable='false'/></div><div class='msg'><p><emoji class='suffocated'/></p><time></time></div >";
liSelf.innerHTML = rowOne;
olChat[0].appendChild(liSelf);


let rowTwo = "<div class='avatar'><img src='https://i.imgur.com/DY6gND0.png' draggable='false'/></div><div class='msg'><p><emoji class='suffocated'/></p><time></time></div >";
liOther.innerHTML = rowTwo;


socket.on('connection', (data) => {
    console.log(data);
})

textarea.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 || e.which === 13) {
        socket.emit('clientElement', { elt: textarea.value });
        console.log(textarea.value);
    }
})





    










