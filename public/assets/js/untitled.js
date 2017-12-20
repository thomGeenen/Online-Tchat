"use strict";
let row = "<div class='avatar'><img src='https://i.imgur.com/DY6gND0.png' draggable='false'/></div><div class = 'msg'><p><emoji class='suffocated' /></p><time></time></div >";
let newLi = document.createElement("li");

if (isSelf) {
    newLi.className = "self";
}
else {
    newLi.className = "other";
}
newLi.innerHTML = row;

