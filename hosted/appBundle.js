(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("gameMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,r)=>{const m=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),n=await m.json();document.getElementById("gameMessage").classList.add("hidden"),n.error&&t(n.error),n.redirect&&(window.location=n.redirect),r&&r(n)},hideError:()=>{document.getElementById("gameMessage").classList.add("hidden")}}}},t={};function a(r){var m=t[r];if(void 0!==m)return m.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}(()=>{const e=a(603),t=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#gameName").value,r=t.target.querySelector("#gamehours").value,m=t.target.querySelector("#_csrf").value,n=t.target.querySelector("#start").value;return a&&r&&n?(e.sendPost(t.target.action,{name:a,hours:r,start:n,_csrf:m},c),!1):(e.handleError("All fields are required!"),!1)},r=t=>{t.preventDefault(),e.hideError();const a=document.querySelector("#_csrf").value,r=t.target.querySelector("#_id").value;e.sendPost(t.target.action,{_id:r,_csrf:a},c)},m=e=>React.createElement("div",null,React.createElement("form",{id:"gameForm",onSubmit:t,name:"gameForm",action:"/maker",method:"POST",className:"gameForm"},React.createElement("label",{htmlFor:"name"},"Name: "),React.createElement("input",{type:"text",id:"gameName",name:"name",placeholder:"Game Name"}),React.createElement("label",{htmlFor:"hours"},"hours: "),React.createElement("input",{type:"number",id:"gameHours",name:"hours",min:"0"}),React.createElement("label",{htmlFor:"start"},"Start Date: "),React.createElement("input",{type:"date",id:"start",name:"start"}),React.createElement("input",{type:"hidden",id:"_csrf",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"makeGameSubmit",type:"submit",value:"Make Game"})),React.createElement("form",{id:"uploadForm",action:"/upload",method:"post",encType:"multipart/form-data"},React.createElement("input",{type:"file",name:"sampleFile"}),React.createElement("input",{type:"hidden",id:"_csrf",name:"_csrf",value:e.csrf}),React.createElement("input",{type:"submit",value:"Upload!"})),React.createElement("form",{id:"retrieveForm",action:"/retrieve",method:"get"},React.createElement("label",{htmlFor:"fileName"},"Retrieve File By ID: "),React.createElement("input",{name:"_id",type:"text"}),React.createElement("input",{type:"submit",value:"Retrieve!"})),React.createElement("section",{id:"messages"})),n=e=>{if(0===e.games.length)return React.createElement("div",{className:"gameList"},React.createElement("h3",{className:"emptyGame"},"No Games Yet!"));const t=e.games.map((t=>{t.imgId;const a=new Date(Date.parse(t.start)).toLocaleString("en-US",{year:"numeric",month:"long",day:"numeric"});return console.log(t),React.createElement("div",{key:t._id,className:"game"},React.createElement("img",{src:"/assets/img/gamePad.jpg",alt:"game symbol",className:"gameSymbol"}),React.createElement("h3",{className:"gameName"},"Name: ",t.name," "),React.createElement("h3",{className:"gameHours"},"Hours Played: ",t.hours," "),React.createElement("h3",{className:"start"},"Start Date: ",a," "),React.createElement("form",{action:"/delete",name:"deleteButton",method:"POST",onSubmit:r},React.createElement("input",{className:"makeGameSubmit",type:"submit",value:"Delete"}),React.createElement("input",{type:"hidden",id:"_csrf",name:"_csrf",value:e.csrf}),React.createElement("input",{type:"hidden",id:"_id",name:"_id",value:t._id})))}));return React.createElement("div",{className:"gameList"},t)},c=async()=>{const e=await fetch("/getGames"),t=await e.json();ReactDOM.render(React.createElement(n,{games:t.games}),document.getElementById("games"))};window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json();ReactDOM.render(React.createElement(m,{csrf:t.csrfToken}),document.getElementById("makeGame")),ReactDOM.render(React.createElement(n,{games:[],csrf:t.csrfToken}),document.getElementById("games")),c()}})()})();