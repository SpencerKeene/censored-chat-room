import { addChats } from "./publicChats.js";
//api url
const url = "http://chat-room.live:3000";
const userURL = "http://chat-room.live/chat-page.html?";
document.querySelector("#username").innerHTML = `
      <div class="input-name">  
          <input type="text" id="UName" name="Chatname" placeholder="Enter name">
      </div>
`;

addChats(url + "/chatrooms");

document.getElementById("refresh-tab").innerHTML = `
    <button id="refresh-btn"></button>
    <h2 id="public-chat-title">Public Chat Room(s)</h2>
`;

//third part of the page / bottom of the page (second last)
document.querySelector("#input-buttons").innerHTML = `
    <div ="create">
        <button id="create-chat-room">Create Chat Room</button>
        <input type="text" id="chatroom-name" name="chatname" placeholder="Chatroom name">
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
    </div>
`;

//radio buttons third segment
document.querySelector("#radio-buttons").innerHTML = `
    <div>
        <input type="radio" id="public" name="rButton" value="Public">
        <label for="public">Public</label>
    </div>
    <div>
        <input type="radio" id="private" name="rButton" value="Private">
        <label for="private">Private</label>
    </div>
`;

var userName;
var privateCode;
//join a private chatroom
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
    let request = new Request(url+`/chatrooms/${privateCode}`, {
      method: 'GET'        
    });
    fetch(request)
            .then(Response => {
                if(!Response.ok){
                    throw(Response.status);
                }
                else{
                    
                    return Response.json();
                }
            })
            .then(json =>{
                window.location.assign(userURL+"id="+json.chatroom.id+":name="+userName+":roomname="+json.chatroom.name);
            }).catch(error =>{
                alert(`Error ${error}`);
            });
});

var roomType = "";

const radioButtons = document.querySelectorAll('input[name="rButton"]');
//create a chatroom
document.getElementById("create-chat-room").addEventListener("click", (e) => {
  let roomname = document.getElementById("chatroom-name").value;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      roomType = radioButton.value;
      radioButton.checked = false;
      break;
    }
  }
  if (roomType == "") {
    alert("Please select a room type.");
  } else if (roomname == "") {
    alert("Please enter a name for your chat room");
  } else if(roomname.length > 32){
    alert("Chatroom name cannot exceed 32 characters!");
  } else {
    userName = document.getElementById("UName").value;
    if (userName == "") {
      userName = "Anon123";
    }
    //fetch starts below
    let data = {
      name: roomname,
      privacy: roomType,
    };

    let request = new Request(url + "/chatrooms", {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
      }),
    });

    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="blurryBack">
        <div id="greyCard">
          <div class="loader"></div>
          <h2 id="loading">Loading. . .</h2>
        </div>
      </div>`
    );

    fetch(request)
      .then((Response) => Response.json())
      .then((json) => {
        window.location.assign(
          userURL +
            "id=" +
            json.chatroom.id +
            ":name=" +
            userName +
            ":roomname=" +
            json.chatroom.name
        );
      });
    roomType = "";
    roomname = "";
    //fetch ends here
  }

  setTimeout(() => {
    const elem = document.getElementById("blurryBack");
    elem.parentNode.removeChild(elem);
  }, 6000);
});

var refresh = setTimeout(refreshPageLoop, 5000);
function refreshPageLoop() {
  refreshPage();
  refresh = setTimeout(refreshPageLoop, 5000);
}

function refreshPage() {
  addChats(url + "/chatrooms");
}

document.getElementById("refresh-btn").addEventListener("click", (e) => {
  document.getElementById("refresh-btn").disabled = true;
  refreshPage();
  document.getElementById("refresh-btn").disabled = false;
});
