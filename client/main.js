import { addChat } from './publicChats.js'

document.querySelector('#username').innerHTML = `
      <div>
          <h1>Name</h1> 
      </div>
      <div class="input-name">  
          <input type="text" id="UName" name="Chatname" placeholder="Anon123">
      </div>
`;
document.getElementById('public-chat').appendChild(addChat(4));



//add a button listener