import { addChat } from './publicChats.js'

//top part/ first part of the page
document.querySelector("#username").innerHTML = `
      <div>
          <h1>Name</h1> 
      </div>
      <div class="input-name">  
          <input type="text" id="UName" name="Chatname" placeholder="Anon123">
      </div>
`;

//middle part / second part of the page
document.getElementById("public-chat").appendChild(getButtons()); //getbuttons will fetch the list of objects

function getButtons(Qty){
    return addChat(Qty);
}

const buttons = document.getElementsByName("join-public-chat");
const url = "";

var roomCode;
var userName;
var chatroomname;
//join a public chatroom
for(let button of buttons){
    button.addEventListener("click", (e) => {
        //gets the name displayed
        roomCode = document.getElementById(`${button.id}`).id;//button holds the rooms id
        userName = document.getElementById("UName").value;
        if(userName == ""){
            userName = "Anon123";
        }
        chatroomname = document.getElementById(`uniqueCode${button.id}`).innerHTML;
        //fetch starts below
        let data = {
            name: chatroomname,
            id: roomCode,
            userName: userName  
        } //not sure how the user's name will be handled but it will send data in this format for now
        //header will have the standard UTF-8 as a placeholder until api is done and we know exactly what we'll need
        let request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        });

        fetch(request).then((Response) => {
            //location.replace("#"); //not sure how it is handles yet
        });
        //fetch ends here
    });
}

document.getElementById("refresh-tab").innerHTML = `
    <button id="refresh-btn"></button>
`;

//third part of the page / bottom of the page (second last)
document.querySelector("#input-buttons").innerHTML = `
    <div>
        <button id="create-chat-room">Create Chat Room</button>
    </div>
    <div id="room-code-title">
        <button id="join-private-room">Join Private Room</button>
    </div>
    <div id="room-code-title">
        <div>
            <h5>Enter Private Room Code</h5>
        </div>
        <div>
            <input type="text" id="private-code" name="code" placeholder="#######">
        </div>
    </div>
    
`;

//radio buttons third segment
document.querySelector("#radio-buttons").innerHTML = `
        <input type="radio" id="public" name="rButton" value="Public">
        <label for="public">Public</label>
        <input type="radio" id="private" name="rButton" value="Private">
        <label for="private">Private</label>
`;

var privateCode;
//join a prvate chatroom
document.getElementById("join-private-room").addEventListener("click", (e) => {
    privateCode = document.getElementById("private-code").value;
    if(privateCode == ""){
        alert("Please enter a code");
    }
    else{
        userName = document.getElementById("UName").value;
    }
    if(userName == ""){
        userName = "Anon123";
    }
    //fetch starts below
    let data = {
        id: privateCode,
        userName: userName
    } 

    let request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    });

    fetch(request).then((Response) => {
        //location.replace("#"); //not sure how it is handles yet
    });
    //fetch ends here
});

var roomType = "";
//create a chatroom
const radioButtons = document.querySelectorAll('input[name="rButton"]');
document.getElementById("create-chat-room").addEventListener("click", (e) => {
    for(const radioButton of radioButtons){
        if(radioButton.checked){
            roomType = radioButton.value;
            break;
        }
    }
    if(roomType == ""){
        alert("Please select a room type.");
    }
    else{
        userName = document.getElementById("UName").value;
        if(userName == ""){
            userName = "Anon123";
        }
        //fetch starts below
        let data = {
            userName: userName,
            privacy: roomType
        } 
    
        let request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        });
    
        fetch(request).then((Response) => {
            //location.replace("#"); //not sure how it is handles yet
        });
        //fetch ends here
    }
    
});

document.getElementById("refresh-btn").addEventListener("click", (e) => {
    document.getElementById("public-chat").replaceChild(getButtons());
});