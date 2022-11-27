/*
* this function is how the buttons would be created 
*/

//request and reload public chatrooms
const userURL = "http://127.0.0.1:5173/chat-page.html?";
export function addChats(url){
 document.getElementById("public-chat").innerHTML = ""
  fetch(url).then(response => {
    return response.json();
  }).then(json => {
    var newChats = document.createDocumentFragment();
    if(json.count == 0){
        var errorMessage = document.createElement('p');
        errorMessage.innerHTML = `There are no public chats!`;
        errorMessage.id = "errorMessage";
        newChats.appendChild(errorMessage);
        document.getElementById("public-chat").append(newChats);
    }
    else{
      //var chats = document.getElementById("public-chat").children;
      var newChats = document.createDocumentFragment();
      for(let chat of json.chatrooms){ // let object in list of objects
        // if(document.getElementById(chat.id) != null){
        //   //do nothing
        // }
       // else{
          let addChat = document.createElement('div');
          addChat.className = "chat-display-template";
          addChat.id = chat.id; //object.id
          //could possibly display the public rooms code
          let uniquecode = document.createElement("p");
          uniquecode.name = chat.name;
          uniquecode.id = "uniqueCode"+chat.id;
          uniquecode.className = "public-chat-name";
          uniquecode.innerHTML = uniquecode.name;
          let addBtn = document.createElement("button");
          addBtn.className = "join-public-chat";
          addBtn.name = "join-public-chat";
          addBtn.id = chat.id; //object.id
          addBtn.innerText = "Join";
          addBtn.addEventListener("click", (e) => {
            //gets the name displayed
            let roomCode = addBtn.id;
            let userName = document.getElementById("UName").value;
            if(userName == ""){
                userName = "Anon123";
            }
            let chatroomname = document.getElementById(`uniqueCode${addBtn.id}`).innerHTML;
            
            console.log("s");
            window.location.assign(userURL+"id="+roomCode+":name="+userName+":roomname="+chatroomname);
            //fetch ends here
        });
          
          addChat.appendChild(uniquecode);
          addChat.appendChild(addBtn);
          newChats.appendChild(addChat);

        }
          document.getElementById("public-chat").append(newChats);
      }
    //}
    
  });

}

