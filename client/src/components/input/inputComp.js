"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputComp = void 0;
function inputComp() {
    var inputComp = /** @class */ (function (_super) {
        __extends(inputComp, _super);
        //shadow = this.attachShadow({ mode: "open" });
        function inputComp() {
            var _this = _super.call(this) || this;
            _this.render();
            return _this;
        }
        inputComp.prototype.render = function () {
            var type = this.getAttribute("type");
            var formEl = document.createElement("form");
            var style = document.createElement("style");
            formEl.style.display = "flex";
            formEl.style.flexDirection = "column";
            formEl.style.alignItems = "center";
            formEl.classList.add("form");
            style.innerHTML = "\n      .input{\n        height:84px;\n        border-radius:10px;\n        border: 10px solid #182460;\n        text-align:center;\n        font-family: 'Odibee Sans', cursive;\n        font-size:45px;\n        color: #D9D9D9;\n        width:100%;\n      }\n\n      .label{\n        display:none;\n        margin-top:20px;\n      }\n  \n      .labelOn{\n        display:flex;\n        font-family: 'Odibee Sans', cursive;\n        font-size:45px;\n        margin-top:59px;\n        \n      }\n      .container-form{\n         width: 100%;\n         display: flex;\n         flex-direction: column;\n         align-items: center;\n         justify-content: center;\n         gap:17px;\n      }\n       .root-button{\n             width: 311px;\n             height:87px;\n             border:solid 10px;\n             border-radius:10px;\n             border-color: #001997;\n             font-size:45px;\n             color: #D8FCFC;\n             background:#006CFC ;\n             font-family: 'Odibee Sans', cursive;\n         }\n      \n      ";
            formEl.innerHTML = "\n      <div class=\"container-form\">\n           <label class=\"label\" for=\"name\">Tu Nombre</label>\n           <input class=\"input\" type=\"text\" id=\"name\" name=\"name\" placeholder=\"c\u00F3digo\" required\n            minlength=\"4\" maxlength=\"4\" size=\"10\">\n          <button class=\"root-button\">Empezar</button>\n      </div>\n    \n   ";
            if (type == "nombre") {
                var label = formEl.querySelector(".label");
                label.classList.replace("label", "labelOn");
                var inputEl = formEl.querySelector("#name");
                inputEl.removeAttribute("maxlength");
                inputEl.removeAttribute("placeholder");
            }
            this.appendChild(style);
            this.appendChild(formEl);
        };
        return inputComp;
    }(HTMLElement));
    customElements.define("input-comp", inputComp);
}
exports.inputComp = inputComp;
