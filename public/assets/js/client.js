"use strict";

const socket = io.connect(),
      olChat = document.getElementsByClassName('chat'),
      liOther = document.getElementsByClassName('other'),
      liSelf  = document.getElementsByClassName('self'),
      button  = document.getElementById('sender'),
      messages = document.getElementById('message');
let   messageVal = "",
      isSelf     = true;



//Client receive the message
socket.on('serverSend', (data) => {
    
})




//Client send the message
button.addEventListener('click', (e) => {
    socket.emit('clientSend', { message: messages.value, message_timestamp: Date() });
    console.log(messageVal);
});

button.addEventListener('keypress', (e) => {
    key = e.which || e.keyCode
    if (key == 13) {
        socket.emit('clientSend', { message: messages.value, message_timestamp: Date() });
        console.log(messageVal);
    }
});

let row = "<div class='avatar'><img src='https://i.imgur.com/DY6gND0.png' draggable='false'/></div><div class = 'msg'><p><emoji class='suffocated' /></p><time></time></div >";
let newLi = document.createElement("li");

if (isSelf) {
    newLi.className = "self";
}
else {
    newLi.className = "other";
}
newLi.innerHTML = row;