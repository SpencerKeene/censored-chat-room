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
`;///chatrooms/${id}
let socket = new WebSocket(`ws://localhost:8000`);
//socket.OPEN;
socket.onopen = function(e){
    console.log("connected");
    let data = {
        user : username,
        message : "hello world"
    }
    socket.send(JSON.stringify(data));
    
}
socket.onmessage = (event) =>{
    console.log(event.data);
}
document.getElementById("send-button").addEventListener("click", (e) =>{
    //alert("button pressed");
    let userMsg = document.getElementById("textbox").value;
    console.log(userMsg);
});
