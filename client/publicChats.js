//chat information will come from the server on request
//below will be temporary data for testing and placeholding

//import { get_all_chatrooms } from "../ajax_server/api/controllers/chatrooms";

//import { Chatroom } from "../ajax_server/api/models/Chatroom";

//this function is how the buttons would be created 
var Qty = 5;

//request and reload public chatrooms
/*export function addChat(url){
  let chats = get_all_chatrooms();
  
  var newChats = document.createDocumentFragment();
  for(let chat of chats){ // let object in list of objects
    var addChat = document.createElement('div');
    addChat.className = "chat-display-template";
    addChat.id = "div" + chat.id; //"div" + object.id
    var addBtn = document.createElement("button");
    addBtn.className = "join-public-chat";
    addBtn.name = "join-public-chat";
    addBtn.id = chat.id; //object.id
    addBtn.innerText = "Join";
    //could possibly display the public rooms code
    var uniquecode = document.createElement("p");
    uniquecode.name = chat.name;
    uniquecode.id = "uniqueCode"+chat.id;
    uniquecode.className = "public-chat-name";
    uniquecode.innerHTML = uniquecode.name;
    addChat.appendChild(uniquecode);
    addChat.appendChild(addBtn);
    newChats.appendChild(addChat);
  }
  
  return newChats;
}*/
export function addChat(){ //commented out copy of the code above in case of fuck up delete when rdy
  var newChats = document.createDocumentFragment();
  for(var i = 0; i < Qty; ++i){
    var addChat = document.createElement('div');
    addChat.className = "chat-display-template";
    addChat.id = "div" + i;
    var addBtn = document.createElement("button");
    addBtn.className = "join-public-chat";
    addBtn.name = "join-public-chat";
    addBtn.id = i;
    addBtn.innerText = "Join";
    //could possibly display the public rooms code
    var uniquecode = document.createElement("p");
    uniquecode.name = "rCode"+i;
    uniquecode.id = "uniqueCode"+i;
    uniquecode.className = "public-chat-name";
    uniquecode.innerHTML = uniquecode.name;
    addChat.appendChild(uniquecode);
    addChat.appendChild(addBtn);
    newChats.appendChild(addChat);
  }
  
  return newChats;
}

