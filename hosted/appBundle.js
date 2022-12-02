(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("gameMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,r)=>{const n=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),c=await n.json();document.getElementById("gameMessage").classList.add("hidden"),c.error&&t(c.error),c.redirect&&(window.location=c.redirect),r&&r(c)},hideError:()=>{document.getElementById("gameMessage").classList.add("hidden")}}}},t={};function a(r){var n=t[r];if(void 0!==n)return n.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,a),c.exports}(()=>{const e=a(603),t=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#gameName").value,r=t.target.querySelector("#gamehours").value,n=t.target.querySelector("#_csrf").value,c=t.target.querySelector("#start").value;return a&&r&&c?(e.sendPost(t.target.action,{name:a,hours:r,start:c,_csrf:n},s),!1):(e.handleError("All fields are required!"),!1)},r=t=>{t.preventDefault(),e.hideError();const a=document.querySelector("#_csrf").value,r=t.target.querySelector("#_id").value;e.sendPost(t.target.action,{_id:r,_csrf:a},s)},n=e=>React.createElement("div",null,React.createElement("form",{id:"gameForm",onSubmit:t,name:"gameForm",action:"/maker",method:"POST",className:"gameForm"},React.createElement("label",{htmlFor:"name"},"Name: "),React.createElement("br",null),React.createElement("br",null),React.createElement("input",{type:"text",id:"gameName",name:"name",placeholder:"Game Name"}),React.createElement("br",null),React.createElement("br",null),React.createElement("label",{htmlFor:"hours"},"Hours: "),React.createElement("br",null),React.createElement("br",null),React.createElement("input",{type:"number",id:"gameHours",name:"hours",min:"0"}),React.createElement("br",null),React.createElement("br",null),React.createElement("label",{htmlFor:"start"},"Start Date: "),React.createElement("br",null),React.createElement("br",null),React.createElement("input",{type:"date",id:"start",name:"start"}),React.createElement("input",{type:"hidden",id:"_csrf",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"makeGameSubmit",type:"submit",value:"Make Game"})),React.createElement("form",{id:"uploadForm",action:"/upload",method:"post",encType:"multipart/form-data"},React.createElement("input",{type:"file",name:"sampleFile"}),React.createElement("input",{type:"hidden",id:"_csrf",name:"_csrf",value:e.csrf}),React.createElement("br",null),React.createElement("br",null),React.createElement("input",{type:"submit",value:"Upload!"})),React.createElement("form",{id:"retrieveForm",action:"/retrieve",method:"get"},React.createElement("label",{htmlFor:"fileName"},"Retrieve File By ID: "),React.createElement("br",null),React.createElement("br",null),React.createElement("input",{name:"_id",type:"text"}),React.createElement("input",{type:"submit",value:"Retrieve!"})),React.createElement("section",{id:"messages"})),c=e=>{if(0===e.games.length)return React.createElement("h3",{className:"emptyGame"},"No Games Yet!");const t=e.games.map((t=>{t.imgId;const a=new Date(Date.parse(t.start)).toLocaleString("en-US",{year:"numeric",month:"long",day:"numeric"});return console.log(t),React.createElement("div",{key:t._id,className:"game"},React.createElement("img",{src:"/assets/img/gamePad.jpg",alt:"game symbol",className:"gameSymbol"}),React.createElement("h3",{className:"gameName"},"Name: ",t.name," "),React.createElement("h3",{className:"gameHours"},"Hours Played: ",t.hours," "),React.createElement("h3",{className:"start"},"Start Date: ",a," "),React.createElement("form",{action:"/delete",name:"deleteButton",method:"POST",onSubmit:r},React.createElement("input",{className:"makeGameSubmit",type:"submit",value:"Delete",id:"deleteButton"}),React.createElement("input",{type:"hidden",id:"_csrf",name:"_csrf",value:e.csrf}),React.createElement("input",{type:"hidden",id:"_id",name:"_id",value:t._id})))}));return React.createElement("div",{className:"gameList"},t)},m=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#pass").value,r=t.target.querySelector("#pass2").value,n=t.target.querySelector("#_csrf").value;return a&&r?(e.sendPost(t.target.action,{newPass:a,newPass2:r,_csrf:n}),!1):(e.handleError("All fields are required"),!1)},l=e=>React.createElement("form",{id:"changePasswordForm",name:"changePasswordForm",onSubmit:m,action:"/changePassword",method:"POST"},React.createElement("label",{htmlFor:"pass"},"New password: "),React.createElement("input",{type:"password",id:"pass",name:"pass",placeholder:"new password"}),React.createElement("label",{htmlFor:"pass2"},"Confirm New password: "),React.createElement("input",{type:"password",id:"pass2",name:"pass2",placeholder:"retype new password"}),React.createElement("input",{type:"hidden",id:"_csrf",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Change Password"})),s=async()=>{const e=await fetch("/getGames"),t=await e.json();ReactDOM.render(React.createElement(c,{games:t.games}),document.getElementById("games"))};window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json();document.getElementById("changePassword").addEventListener("click",(async e=>{e.preventDefault(),ReactDOM.render(React.createElement(l,{csrf:t.csrfToken}),document.getElementById("changePasswordSection"))})),ReactDOM.render(React.createElement(n,{csrf:t.csrfToken}),document.getElementById("makeGame")),ReactDOM.render(React.createElement(c,{games:[],csrf:t.csrfToken}),document.getElementById("games")),s()}})()})();