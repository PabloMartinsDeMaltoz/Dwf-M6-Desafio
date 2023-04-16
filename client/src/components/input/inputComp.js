"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputComp = void 0;
function inputComp() {
    class inputComp extends HTMLElement {
        //shadow = this.attachShadow({ mode: "open" });
        constructor() {
            super();
            this.render();
        }
        render() {
            const type = this.getAttribute("type");
            const formEl = document.createElement("form");
            const style = document.createElement("style");
            formEl.style.display = "flex";
            formEl.style.flexDirection = "column";
            formEl.style.alignItems = "center";
            formEl.classList.add("form");
            style.innerHTML = `
      .input{
        height:84px;
        border-radius:10px;
        border: 10px solid #182460;
        text-align:center;
        font-family: 'Odibee Sans', cursive;
        font-size:45px;
        color: #D9D9D9;
        width:100%;
      }

      .label{
        display:none;
        margin-top:20px;
      }
  
      .labelOn{
        display:flex;
        font-family: 'Odibee Sans', cursive;
        font-size:45px;
        margin-top:59px;
        
      }
      .container-form{
         width: 100%;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         gap:17px;
      }
       .root-button{
             width: 311px;
             height:87px;
             border:solid 10px;
             border-radius:10px;
             border-color: #001997;
             font-size:45px;
             color: #D8FCFC;
             background:#006CFC ;
             font-family: 'Odibee Sans', cursive;
         }
      
      `;
            formEl.innerHTML = `
      <div class="container-form">
           <label class="label" for="name">Tu Nombre</label>
           <input class="input" type="text" id="name" name="name" placeholder="código" required
            minlength="4" maxlength="4" size="10">
          <button class="root-button">Empezar</button>
      </div>
    
   `;
            if (type == "nombre") {
                const label = formEl.querySelector(".label");
                label.classList.replace("label", "labelOn");
                const inputEl = formEl.querySelector("#name");
                inputEl.removeAttribute("maxlength");
                inputEl.removeAttribute("placeholder");
            }
            this.appendChild(style);
            this.appendChild(formEl);
        }
    }
    customElements.define("input-comp", inputComp);
}
exports.inputComp = inputComp;
