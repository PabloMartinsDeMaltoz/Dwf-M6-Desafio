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
exports.buttonComp = void 0;
function buttonComp() {
    var button = /** @class */ (function (_super) {
        __extends(button, _super);
        function button() {
            var _this = _super.call(this) || this;
            _this.shadow = _this.attachShadow({ mode: "open" });
            _this.render();
            return _this;
        }
        button.prototype.render = function () {
            var buttonEl = document.createElement("button");
            var style = document.createElement("style");
            style.innerHTML = "\n      .root{\n             width: 311px;\n             height:87px;\n             border:solid 10px;\n             border-radius:10px;\n             border-color: #001997;\n             font-size:45px;\n             color: #D8FCFC;\n             background:#006CFC ;\n             font-family: 'Odibee Sans', cursive;\n         }\n      ";
            buttonEl.textContent = this.innerText;
            buttonEl.classList.add("root");
            this.shadow.appendChild(buttonEl);
            this.shadow.appendChild(style);
        };
        return button;
    }(HTMLElement));
    customElements.define("button-comp", button);
}
exports.buttonComp = buttonComp;
