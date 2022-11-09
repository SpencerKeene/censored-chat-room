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
document.getElementById("public-chat").appendChild(getButtons(10));

function getButtons(Qty){
    return addChat(Qty);
}

const buttons = document.getElementsByName("join-public-chat");

var roomCode;
var userName;
for(let button of buttons){
    button.addEventListener("click", (e) => {
        //gets the name displayed
        roomCode = document.getElementById(`uniqueCode${button.id}`).innerText;
        userName = document.getElementById("UName").value;
        if(userName == ""){
            userName = "Anon123";
        }
        //alert(roomCode);
    });
}

//third part of the page / bottom of the page
document.querySelector("#private-input-buttons").innerHTML = `
    <div>
        <button id="create-private-room">Create Private Room</button>
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

var privateCode;

document.getElementById("join-private-room").addEventListener("click", (e) => {
    privateCode = document.getElementById("private-code").value;
    if(privateCode == ""){
        alert("Please enter a code");
    }
    else{
        userName = document.getElementById("UName").value;
    }
    
});

document.getElementById("create-private-room").addEventListener("click", (e) =>{
    //request to create a room and redirect the user to that private chatroom instance
    //below are notes
    //http redirect tests
    //location.replace("#")
    //location.href = "#";
    //alert("created");
});