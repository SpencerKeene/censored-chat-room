
const urlConstants = window.location.search.replace("?", "").split(":");
var id = urlConstants[0].substring(urlConstants[0].indexOf("=")+1, urlConstants[0].length);;

var username = urlConstants[1].substring(urlConstants[1].indexOf("=")+1, urlConstants[1].length);
username = username.replaceAll("%20", " ");
var chatname = urlConstants[2].substring(urlConstants[2].indexOf("=")+1, urlConstants[2].length);
chatname = chatname.replaceAll("%20", " ");
document.getElementById("chatroom-id").innerHTML = `
    Code: ${id}
`;
let socket = new WebSocket(`ws://localhost:3000/chatrooms/${id}`);
socket.onopen = function(e){
    console.log("connected");
    let data = {
        user : username,
        message : "Connected"
    }
    socket.send(JSON.stringify(data));
    
}
socket.onerror=function(event){
    console.log(event);
    let errorHTML = document.createDocumentFragment();
    let box = document.createElement("div");
    let errorText = document.createElement("h1");
    errorText.id = "error-text";
    errorText.innerText = `An error has occured during connection please refresh the page to try again!`;
    box.id = "error";
    box.appendChild(errorText);
    errorHTML.appendChild(box);
    document.getElementById("main").replaceChildren(errorHTML);
}
socket.onmessage = (event) =>{
    let data = JSON.parse(event.data);
    if(data.message == ""){
        //do nothing
    }
    else if(data.fromSelf){
        var newMsg = document.createDocumentFragment();
        //master box
        let box = document.createElement('div');
        box.className = "chatBoxSelf";
        //child 2 box holds message
        let divBody = document.createElement('div');
        divBody.className = "messages";
        //userInfo div aka child 1
        let userDiv = document.createElement('div');
        userDiv.className = "userInfoBox";
        let userInfo = document.createElement('p');
        userInfo.className = "userInfo";
        let date = Date();
        userInfo.innerText = `You: ${date.substring(0, date.indexOf('GMT'))}`;
        let msgBody = document.createElement('p');
        msgBody.className = "msgText";
        msgBody.innerText = `${data.message}`;
        divBody.appendChild(msgBody);
        userDiv.appendChild(userInfo);
        box.appendChild(userDiv);
        box.appendChild(divBody);
        newMsg.appendChild(box);
        document.getElementById("chatBox").append(newMsg);
    }
    else{
        var newMsg = document.createDocumentFragment();
        //master box
        let box = document.createElement('div');
        box.className = "chatBoxSelfReceived";
        //child 2 box holds message
        let divBody = document.createElement('div');
        divBody.className = "messagesR";
        //userInfo div aka child 1
        let userDiv = document.createElement('div');
        userDiv.className = "userInfoBoxR";
        let userInfo = document.createElement('p');
        userInfo.className = "userInfoR";
        let date = Date();
        userInfo.innerText = `${data.user}: ${date.substring(0, date.indexOf('GMT'))}`;
        let msgBody = document.createElement('p');
        msgBody.className = "msgText";
        msgBody.innerText = `${data.message}`;
        divBody.appendChild(msgBody);
        userDiv.appendChild(userInfo);
        box.appendChild(userDiv);
        box.appendChild(divBody);
        newMsg.appendChild(box);
        document.getElementById("chatBox").append(newMsg);
    }
    const chatBox = document.getElementById("chatBox");
    chatBox.scrollTop = chatBox.scrollHeight;
}

window.onbeforeunload=function(event){
    let data = {
        user : username,
        message : "Disconnected"
    }
    socket.send(JSON.stringify(data));
}

document.getElementById("goBack").addEventListener("click", (e)=> {
    window.location.assign("http://127.0.0.1:5173");
});

document.getElementById("send-button").addEventListener("click", (e) =>{
    let userMsg = document.getElementById("textbox").value;
        let data = {
            user : username,
            message : userMsg
        }
        document.getElementById("textbox").value = "";
        socket.send(JSON.stringify(data));
    
});

document.getElementById("chatName").innerText = chatname;
