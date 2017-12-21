"use strict";

const olChat = document.getElementsByClassName('chat'),
      button  = document.getElementById('sender');
let   textarea = document.getElementById('textarea'),
      socket = io.connect();


socket.on('otherData', (message) => {
      let liOther = document.createElement('li');
      liOther.className = "other";
      let rowOther = "<div class='avatar'><img src='' draggable='false'/></div><div class='msg'><p>" + message.other + "<emoji class='suffocated'/></p><time>" + Date() + "</time></div >";
      liOther.innerHTML = rowOther;
      olChat[0].appendChild(liOther);
});

// button.addEventListener('click', (e) => {
//       e.preventDefault()
//       // document.location.href = "/sendMessage";
//       let liSelf = document.createElement('li');
//       liSelf.className = "self";
//       let rowSelf = "<div class='avatar'><img src='https://i.imgur.com/DY6gND0.png' draggable='false'/></div><div class='msg'><p>" + textarea.value + "<emoji class='suffocated'/></p><time>" + Date() + "</time></div >";
//       liSelf.innerHTML = rowSelf;
//       olChat[0].appendChild(liSelf);
//       socket.emit('clientValue', {elt: textarea.value});

// });


textarea.addEventListener('keypress', (e) => {
      if (e.keyCode == 13 || e.which == 13) {
            e.preventDefault();
            // document.location.href = "/sendMessage";
            let liSelf = document.createElement('li');
            liSelf.className = "self";
            let rowSelf = "<div class='avatar'><img src='https://i.imgur.com/HYcn9xO.png' draggable='false'/></div><div class='msg'><p>" + textarea.value + "<emoji class='suffocated'/></p><time>" + Date() + "</time></div >";
            liSelf.innerHTML = rowSelf;
            olChat[0].appendChild(liSelf);
            socket.emit('clientValue', { elt: textarea.value });
      }
});