
const urlConstants = window.location.search.replace("?", "").split(":");
var id = urlConstants[0].substring(urlConstants[0].indexOf("=")+1, urlConstants[0].length);;
console.log(id);

var username = urlConstants[1].substring(urlConstants[1].indexOf("=")+1, urlConstants[1].length);
//username = username.substring('=');
//username.
console.log(username);

var chatname = urlConstants[2].substring(urlConstants[2].indexOf("=")+1, urlConstants[2].length);;
console.log(chatname);
document.getElementById("chatroom-id").innerHTML = `
    Code: ${id}
`;//
let socket = new WebSocket(`ws://localhost:3000/chatrooms/${id}`);
//socket.OPEN;
socket.onopen = function(e){
    console.log("connected");
    let data = {
        user : username,
        message : "Has Connected"
    }
    socket.send(JSON.stringify(data));
    var newMsg = document.createDocumentFragment();
    let divBody = document.createElement('div');
    divBody.className = "messages";
    let msgBody = document.createElement('p');
    msgBody.className = "msgText";
    msgBody.innerText = `You: Connected`;
    divBody.appendChild(msgBody);
    newMsg.appendChild(divBody);
    document.getElementById("chatBox").append(newMsg);
    //
}//<div class="messages"></div>

socket.onmessage = (event) =>{
    //data is filtered as [#][1]
    let data = event.data.substring(2, event.data.length-2).split(",");
    data[0] = data[0].replaceAll('"', '');
    data[0] = data[0].split(":");
    data[1] = data[1].replaceAll('"', '');
    data[1] = data[1].split(":");
    //create div
    var newMsg = document.createDocumentFragment();
    let divBody = document.createElement('div');
    divBody.className = "messages";
    //creat message
    let msgBody = document.createElement('p');
    msgBody.className = "msgText";
    msgBody.innerText = `${data[0][1]}: ${data[1][1]}`;

    divBody.appendChild(msgBody);
    newMsg.appendChild(divBody);
    document.getElementById("chatBox").append(newMsg);
    console.log(data[1][1]);
}

document.getElementById("send-button").addEventListener("click", (e) =>{
    //alert("button pressed");
    let userMsg = document.getElementById("textbox").value;
    //console.log(userMsg);
    if(userMsg == ""){
        //do nothing
    }
    //create div
    else{
        var newMsg = document.createDocumentFragment();
        let divBody = document.createElement('div');
        divBody.className = "messages";
        //creat message
        let msgBody = document.createElement('p');
        msgBody.className = "msgText";
        msgBody.innerText = `You: ${userMsg}`;

        divBody.appendChild(msgBody);
        newMsg.appendChild(divBody);
        document.getElementById("chatBox").append(newMsg);
        let data = {
            user : username,
            message : userMsg
        }
        document.getElementById("textbox").value = "";
        socket.send(JSON.stringify(data));
    }
});
