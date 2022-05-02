import {io} from 'socket.io-client'
const joinRoomButton=document.getElementById("room-button");
const messageinput=document.getElementById("message-input");

const roomInput=document.getElementById("room-input");
const form=document.getElementById("form");

const socket =io("http://localhost:5000");

// server to client
socket.on('message-recieve',(message)=>{
    displayMessage(message);
});

socket.on("connect", () => {
    displayMessage(socket.id);
});

form.addEventListener("submit",e=>{
    e.preventDefault();
    const message=messageinput.value;
    const room=roomInput.value;

    if(message!=""){
        displayMessage(message);
        socket.emit('message-send',message,room,(returnMessageFromServer)=>{
            displayMessage(returnMessageFromServer);
        });
        messageinput.value="";
        // roomInput.value="";
    }

});

joinRoomButton.addEventListener("click",()=>{
    const room=roomInput.value;
    socket.emit('join-room',room,(returnMessageFromServer)=>{
        displayMessage(returnMessageFromServer);
    });
});

const displayMessage=(message)=>{
    const div=document.createElement("div");
    div.textContent=message;
    document.getElementById("message-container").append(div);
}