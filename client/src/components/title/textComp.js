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
exports.titleComp = void 0;
function titleComp() {
    var title = /** @class */ (function (_super) {
        __extends(title, _super);
        function title() {
            var _this = _super.call(this) || this;
            _this.shadow = _this.attachShadow({ mode: "open" });
            _this.render();
            return _this;
        }
        title.prototype.render = function () {
            var divEl = document.createElement("div");
            var style = document.createElement("style");
            var type = this.getAttribute("type");
            style.innerHTML = "\n      .root{\n          font-family: 'American Typewriter', cursive;\n          font-size:80px;\n          color: #009048;\n          margin: 0;\n          line-height: 88.1%\n      }\n      .rootb{   \n          font-family: 'American Typewriter', cursive;\n          font-size:40px;\n          color: #000000;\n          font-weight:200;\n          margin: 0;\n      }\n      .secondary{\n        font-family: 'Odibee Sans', cursive;\n        font-variant: small-caps;\n        font-size:45px;\n        margin: 0;\n      }\n      .score{\n        font-family: 'Odibee Sans', cursive;\n        font-size:55px;\n        margin: 0;\n        font-weight: 400;\n      }\n      \n      ";
            var text = this.innerText;
            divEl.innerHTML = "\n      <h1>".concat(text, "</h1>\n      ");
            var h1El = divEl.querySelector("h1");
            if (type == "root" || "") {
                h1El.classList.add("root");
            }
            else if (type == "secondary") {
                h1El.classList.add("secondary");
            }
            else if (type == "rootb") {
                h1El.classList.add("rootb");
            }
            else if (type == "score") {
                h1El.classList.add("score");
            }
            //divEl.style.width = "300px";
            this.shadow.appendChild(divEl);
            this.shadow.appendChild(style);
        };
        return title;
    }(HTMLElement));
    customElements.define("text-comp", title);
}
exports.titleComp = titleComp;
