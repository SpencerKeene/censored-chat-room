//chat information will come from the server on request
//below will be temporary data for testing and placeholding
//this function is how the buttons would be created 
export function addChat(Qty){
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

