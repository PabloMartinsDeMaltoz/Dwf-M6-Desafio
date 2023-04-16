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
exports.starComp = void 0;
function starComp() {
    var star = /** @class */ (function (_super) {
        __extends(star, _super);
        function star() {
            var _this = _super.call(this) || this;
            _this.shadow = _this.attachShadow({ mode: "open" });
            _this.render();
            return _this;
        }
        star.prototype.render = function () {
            var divEl = document.createElement("div");
            var style = document.createElement("style");
            var type = this.getAttribute("type");
            var starGreen = new URL("./img/StarGreen.svg", import.meta.url);
            var starRed = new URL("./img/StarRed.svg", import.meta.url);
            var StarGray = new URL("./img/StarGray.svg", import.meta.url);
            style.innerHTML = "\n      \n      .text{         \n           position: relative;\n           top: -173px;\n           left: 68px;\n           color: white;\n     } \n      ";
            divEl.style.height = "272px";
            if (type == "perdiste") {
                divEl.innerHTML = "\n        <img src=".concat(starRed.href, "><text-comp type=\"score\" class=\"text\">Perdiste</text-comp></img>");
            }
            else if (type == "victoria") {
                divEl.innerHTML = "\n        <img src=".concat(starGreen.href, "> <text-comp type=\"score\" class=\"text\">Ganaste</text-comp></img> ");
            }
            else if (type == "empate") {
                divEl.innerHTML = "\n        <img src=".concat(StarGray.href, "> <text-comp type=\"score\" class=\"text\">Empate</text-comp></img> ");
            }
            this.shadow.appendChild(style);
            this.shadow.appendChild(divEl);
        };
        return star;
    }(HTMLElement));
    customElements.define("star-comp", star);
}
exports.starComp = starComp;
