//chat information will come from the server on request
//below will be temporary data for testing and placeholding
export function addChat(Qty){
  var newChats = document.createDocumentFragment();
  for(var i = 0; i < Qty; ++i){
    var addChat = document.createElement('div');
    addChat.className = "chat-display-template";
    addChat.id = "Room" + i;
    var addBtn = document.createElement("button");
    addBtn.className = "join-public-chat";
    addBtn.innerText = "Join";
    addChat.appendChild(addBtn);
    newChats.appendChild(addChat);
  }
  return newChats;
}

