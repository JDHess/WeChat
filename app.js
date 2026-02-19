document.addEventListener("DOMContentLoaded", () => {
 /*function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
} */

// Close the dropdown menu if the user clicks outside of it
/*window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}*/
/*let db;
let state = { profiles:[], rooms:["Main"], messages:{} };
let activeProfile = null;
let activeRoom = "Main";
let currentModalProfile = null;

const request = indexedDB.open("PluralDB",1);
request.onupgradeneeded = e=>{
  db = e.target.result;
  db.createObjectStore("store");
};
request.onsuccess = e=>{
  db = e.target.result;
  loadData();
};

function saveData(){
  const tx = db.transaction("store","readwrite");
  tx.objectStore("store").put(state,"data");
}

function loadData(){
  const tx = db.transaction("store","readonly");
  const req = tx.objectStore("store").get("data");
  req.onsuccess = ()=>{
    if(req.result) state = req.result;
    renderAll();
  };
}

function renderAll(){
  renderProfiles();
  renderRooms();
  renderMessages();
}

function addProfile(){
  const id = Date.now();
  state.profiles.push({
    id,
    name:"Alter "+(state.profiles.length+1),
    avatar:"",
    bio:"",
    triggers:"",
    notes:[]
  });
  saveData();
  renderProfiles();
}

function renderProfiles(){
  const div=document.getElementById("profiles");
  div.innerHTML="";
  state.profiles.forEach((p,i)=>{
    const card=document.createElement("div");
    card.className="profile-card";

    const left=document.createElement("div");
    left.className="profile-left";
    left.onclick=()=>activeProfile=p.id;

    const img=document.createElement("img");
    img.src=p.avatar || "";
    left.appendChild(img);

    const name=document.createElement("span");
    name.innerText=(i+1)+". "+p.name;
    left.appendChild(name);

    const infoBtn=document.createElement("button");
    infoBtn.innerText="ℹ";
    infoBtn.style.width="30px";
    infoBtn.onclick=(e)=>{
      e.stopPropagation();
      openProfileModal(p.id);
    };

    card.appendChild(left);
    card.appendChild(infoBtn);
    div.appendChild(card);
  });
}

function deleteRoom(){
  if(activeRoom==="Main"){
    alert("Main room cannot be deleted.");
    return;
  }
  if(!confirm("Delete this room?")) return;

  state.rooms=state.rooms.filter(r=>r!==activeRoom);
  delete state.messages[activeRoom];
  activeRoom="Main";
  saveData();
  renderRooms();
  renderMessages();
}

function addRoom(){
  const name=prompt("Room name?");
  if(!name) return;
  state.rooms.push(name);
  saveData();
  renderRooms();
}

function renderRooms(){
  const sel=document.getElementById("roomSelect");
  sel.innerHTML="";
  state.rooms.forEach(r=>{
    const opt=document.createElement("option");
    opt.value=r;
    opt.innerText=r;
    sel.appendChild(opt);
  });
  sel.value=activeRoom;
}

function switchRoom(){
  activeRoom=document.getElementById("roomSelect").value;
  renderMessages();
}

function sendMessage(){
  if(!activeProfile) return alert("Select profile first");
  const text=document.getElementById("chatInput").value;
  if(!text) return;

  if(!state.messages[activeRoom]) state.messages[activeRoom]=[];
  state.messages[activeRoom].push({
    id:Date.now(),
    profile:activeProfile,
    text
  });

  document.getElementById("chatInput").value="";
  saveData();
  renderMessages();
}

function renderMessages(){
  const div=document.getElementById("messages");
  div.innerHTML="";
  const msgs=state.messages[activeRoom]||[];
  msgs.forEach(m=>{
    const p=state.profiles.find(x=>x.id===m.profile);
    const wrap=document.createElement("div");
    wrap.className="message";
    wrap.innerHTML=
      "<img src='"+(p?.avatar||"")+"'>"+
      "<div class='message-content'><b>"+p?.name+"</b><br>"+m.text+
      "<span class='delete-msg' onclick='deleteMessage("+m.id+")'>✖</span></div>";
    div.appendChild(wrap);
  });
}

function deleteMessage(id){
  state.messages[activeRoom]=state.messages[activeRoom].filter(m=>m.id!==id);
  saveData();
  renderMessages();
}*/

/* Modal logic remains unchanged from previous version */
/*function openProfileModal(id){
  currentModalProfile=id;
  const p=state.profiles.find(x=>x.id===id);
  document.getElementById("modalName").value=p.name;
  document.getElementById("modalBio").value=p.bio;
  document.getElementById("modalTriggers").value=p.triggers;
  document.getElementById("modalAvatarPreview").src=p.avatar||"";
  const notesDiv=document.getElementById("modalNotes");
  notesDiv.innerHTML="";
  p.notes.forEach((note,i)=>{
    const wrap=document.createElement("div");
    wrap.innerHTML=
    "Label:<input value='"+note.label+"'><br>"+
    "Note:<textarea>"+note.text+"</textarea>"+
    "<button onclick='deleteNote("+i+")'>Delete Note</button><hr>";
    notesDiv.appendChild(wrap);
  });
  document.getElementById("profileModal").style.display="flex";
}

function addNoteField(){
  const div=document.createElement("div");
  div.innerHTML=
  "Label:<input><br>"+
  "Note:<textarea></textarea><hr>";
  document.getElementById("modalNotes").appendChild(div);
}

function deleteNote(i){
  const p=state.profiles.find(x=>x.id===currentModalProfile);
  p.notes.splice(i,1);
  saveData();
  openProfileModal(currentModalProfile);
}

function saveProfileModal(){
  const p=state.profiles.find(x=>x.id===currentModalProfile);
  p.name=document.getElementById("modalName").value;
  p.bio=document.getElementById("modalBio").value;
  p.triggers=document.getElementById("modalTriggers").value;

  const inputs=document.querySelectorAll("#modalNotes div");
  p.notes=[];
  inputs.forEach(div=>{
    const label=div.querySelector("input")?.value||"";
    const text=div.querySelector("textarea")?.value||"";
    if(label||text) p.notes.push({label,text});
  });

  saveData();
  renderProfiles();
  closeProfileModal();
}

function deleteProfile(){
  if(!confirm("Delete this profile?")) return;
  state.profiles=state.profiles.filter(p=>p.id!==currentModalProfile);
  saveData();
  closeProfileModal();
  renderProfiles();
}

function closeProfileModal(){
  document.getElementById("profileModal").style.display="none";
}

document.getElementById("modalAvatarUpload").addEventListener("change",function(){
  const file=this.files[0];
  const reader=new FileReader();
  reader.onload=()=>{
    const p=state.profiles.find(x=>x.id===currentModalProfile);
    p.avatar=reader.result;
    document.getElementById("modalAvatarPreview").src=reader.result;
    saveData();
    renderProfiles();
  };
  if(file) reader.readAsDataURL(file);
});

function toggleTheme(){
  document.body.classList.toggle("light");
}

document.addEventListener("keydown",e=>{
  if(e.altKey){
    const index=parseInt(e.key)-1;
    if(state.profiles[index]) activeProfile=state.profiles[index].id;
  }
});*/
   
   
    /* ===========================
       STATE
    =========================== */
    
    let db;
    let state = { profiles:[], rooms:["Main"], messages:{} };
    let activeProfile = null;
    let activeRoom = "Main";
    let currentModalProfile = null;
    
    /* ===========================
       STYLES (JS-INJECTED)
    =========================== */
    
    const style = document.createElement("style");
    style.textContent = `
    :root { --bg:#1e1e1e; --panel:#2b2b2b; --text:#ffffff; }
    body.light { --bg:#f4f4f4; --panel:#ffffff; --text:#000000; }
    body { margin:0;background:var(--bg);color:var(--text);font-family:Arial;display:flex;height:100vh;font-size:16pt; }
    #sidebar { width:40vw;background:var(--panel);padding:10px;overflow-y:auto; }
    #main { flex:1;display:flex;flex-direction:column; }
    #messages { flex:1;overflow-y:auto;padding:10px; }
    .message { display:flex;margin-bottom:8px; }
    .message img { width:40px;height:40px;border-radius:50%;margin-right:8px;object-fit:cover; }
    .message-content { background:var(--panel);padding:8px;border-radius:8px;position:relative;max-width:70%; }
    .delete-msg { position:absolute;right:5px;top:5px;cursor:pointer;font-size:12px; }
    .profile-card { background:#262626;padding:5px;margin-bottom:5px;border-radius:5px;display:flex;justify-content:space-between;cursor:pointer;color:white; }
    .profile-left { display:flex;align-items:center; }
    .profile-left img { width:30px;height:30px;border-radius:50%;margin-right:6px;object-fit:cover; }
    button,input,textarea,select { width:100%;margin-top:5px;padding:5px;font-size:16pt; }
    #profileModal { display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.7);justify-content:center;align-items:center; }
    .modal-inner { background:var(--panel);padding:20px;width:400px;max-height:90vh;overflow-y:auto;border-radius:10px; }
    `;
    document.head.appendChild(style);
    
    /* ===========================
       LAYOUT (JS GENERATED)
    =========================== */
    
    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";
    document.body.appendChild(sidebar);
    
    const main = document.createElement("div");
    main.id = "main";
    document.body.appendChild(main);
    
    sidebar.innerHTML = `
    <h1>💬WeChat<br>WithUs</h1>
    <hr>
    <h3>Profiles</h3>
    <div id="profiles"></div>
    <button id="addProfileBtn">+ Add Profile</button>
    <hr>
    <label>Chat Rooms:</label>
    <select id="roomSelect"></select>
    <button id="addRoomBtn">+ Add Room</button>
    <button id="deleteRoomBtn">Delete Room</button>
    <hr>
    <button id="themeBtn">Toggle Theme</button>
    <button id="exportBtn">Export</button>
    <input type="file" id="importInput">
    `;
    
    main.innerHTML = `
    <div id="messages"></div>
    <input id="chatInput" placeholder="Message">
    <button id="sendBtn">Send</button>
    `;
    
    const modal = document.createElement("div");
    modal.id = "profileModal";
    modal.innerHTML = `
    <div class="modal-inner">
    <h2>Edit Profile</h2>
    <img id="modalAvatarPreview" style="width:100px;height:100px;border-radius:50%;object-fit:cover;"><br>
    <input type="file" id="modalAvatarUpload">
    <input id="modalName" placeholder="Name">
    <textarea id="modalBio" placeholder="Bio"></textarea>
    <textarea id="modalTriggers" placeholder="Trigger Notes"></textarea>
    <div id="modalNotes"></div>
    <button id="addNoteBtn">+ Add Note</button>
    <button id="saveProfileBtn">Save</button>
    <button id="deleteProfileBtn">Delete</button>
    <button id="closeModalBtn">Close</button>
    </div>
    `;
    document.body.appendChild(modal);
    
    /* ===========================
       DATABASE
    =========================== */
    
    const request = indexedDB.open("PluralDB",1);
    request.onupgradeneeded = e=>{
      db = e.target.result;
      db.createObjectStore("store");
    };
    request.onsuccess = e=>{
      db = e.target.result;
      loadData();
    };
    
    function saveData(){
      const tx = db.transaction("store","readwrite");
      tx.objectStore("store").put(state,"data");
    }
    
    function loadData(){
      const tx = db.transaction("store","readonly");
      const req = tx.objectStore("store").get("data");
      req.onsuccess = ()=>{
        if(req.result) state = req.result;
        renderAll();
      };
    }
    
    /* ===========================
       RENDER
    =========================== */
    
    function renderAll(){
      renderProfiles();
      renderRooms();
      renderMessages();
    }
    
    function renderProfiles(){
      const div=document.getElementById("profiles");
      div.innerHTML="";
      state.profiles.forEach((p,i)=>{
        const card=document.createElement("div");
        card.className="profile-card";
    
        const left=document.createElement("div");
        left.className="profile-left";
        left.onclick=()=>activeProfile=p.id;
    
        const img=document.createElement("img");
        img.src=p.avatar||"";
        left.appendChild(img);
    
        const name=document.createElement("span");
        name.innerText=(i+1)+". "+p.name;
        left.appendChild(name);
    
        const info=document.createElement("button");
        info.textContent="ℹ";
        info.onclick=e=>{
          e.stopPropagation();
          openProfileModal(p.id);
        };
    
        card.appendChild(left);
        card.appendChild(info);
        div.appendChild(card);
      });
    }
    
    function renderRooms(){
      const sel=document.getElementById("roomSelect");
      sel.innerHTML="";
      state.rooms.forEach(r=>{
        const opt=document.createElement("option");
        opt.value=r;
        opt.innerText=r;
        sel.appendChild(opt);
      });
      sel.value=activeRoom;
    }
    
    function renderMessages(){
        const div=document.getElementById("messages");
        if(!div) return;
      
        div.innerHTML="";
        const msgs=state.messages[activeRoom]||[];
      
        msgs.forEach(m=>{
          const p=state.profiles.find(x=>x.id===m.profile);
          const wrap=document.createElement("div");
          wrap.className="message";
      
          // 👇 Add positioning + z-index
          wrap.style.position = "relative";
          wrap.style.zIndex = "2";
      
          wrap.innerHTML=
            "<img src='"+(p?.avatar||"")+"'>"+
            "<div class='message-content'><b>"+(p?.name||"Unknown")+
            "</b><br>"+m.text+
            "<span class='delete-msg'>✖</span></div>";
      
          wrap.querySelector(".delete-msg").onclick=()=>deleteMessage(m.id);
      
          div.appendChild(wrap);
        });
      }
    
    /* ===========================
       ACTIONS
    =========================== */
    
    function addProfile(){
      const id=Date.now();
      state.profiles.push({id,name:"Alter "+(state.profiles.length+1),avatar:"",bio:"",triggers:"",notes:[]});
      saveData(); renderProfiles();
    }
    
    function addRoom(){
      const name=prompt("Room name?");
      if(!name) return;
      state.rooms.push(name);
      saveData(); renderRooms();
    }
    
    function deleteRoom(){
      if(activeRoom==="Main") return alert("Cannot delete Main");
      state.rooms=state.rooms.filter(r=>r!==activeRoom);
      delete state.messages[activeRoom];
      activeRoom="Main";
      saveData(); renderAll();
    }
    
    function sendMessage(){
      if(!activeProfile) return alert("Select profile");
      const text=document.getElementById("chatInput").value;
      if(!text) return;
      if(!state.messages[activeRoom]) state.messages[activeRoom]=[];
      state.messages[activeRoom].push({id:Date.now(),profile:activeProfile,text});
      document.getElementById("chatInput").value="";
      saveData(); renderMessages();
    }
    
    function deleteMessage(id){
      state.messages[activeRoom]=state.messages[activeRoom].filter(m=>m.id!==id);
      saveData(); renderMessages();
    }
    
    /* ===========================
       EXPORT / IMPORT
    =========================== */
    
    function exportData(){
      const backup = {
        version:1,
        exported:new Date().toISOString(),
        data:state
      };
      const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json"});
      const url=URL.createObjectURL(blob);
      const a=document.createElement("a");
      a.href=url;
      a.download="WithUs_Backup.json";
      a.click();
      URL.revokeObjectURL(url);
    }
    
    function importData(e){
      const file=e.target.files[0];
      if(!file) return;
      const reader=new FileReader();
      reader.onload=evt=>{
        try{
          const parsed=JSON.parse(evt.target.result);
          if(!parsed.data) return alert("Invalid file");
          state=parsed.data;
          saveData();
          renderAll();
          alert("Import successful");
        }catch{
          alert("Invalid JSON");
        }
      };
      reader.readAsText(file);
    }
    
    /* ===========================
       EVENTS
    =========================== */
    
    document.getElementById("addProfileBtn").onclick=addProfile;
    document.getElementById("addRoomBtn").onclick=addRoom;
    document.getElementById("deleteRoomBtn").onclick=deleteRoom;
    document.getElementById("sendBtn").onclick=sendMessage;
    document.getElementById("roomSelect").onchange=e=>{
      activeRoom=e.target.value;
      renderMessages();
    };
    document.getElementById("themeBtn").onclick=()=>document.body.classList.toggle("light");
    document.getElementById("exportBtn").onclick=exportData;
    document.getElementById("importInput").onchange=importData;
    
    });
    