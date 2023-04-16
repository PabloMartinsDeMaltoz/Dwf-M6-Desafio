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
exports.manosComp = void 0;
function manosComp() {
    var manos = /** @class */ (function (_super) {
        __extends(manos, _super);
        function manos() {
            var _this = _super.call(this) || this;
            _this.shadow = _this.attachShadow({ mode: "open" });
            _this.render();
            return _this;
        }
        manos.prototype.render = function () {
            var divEl = document.createElement("div");
            var style = document.createElement("style");
            var type = this.getAttribute("type");
            var size = this.getAttribute("size");
            var imagePapel = new URL("./img/papel.svg", import.meta.url);
            var imagePiedra = new URL("./img/piedra.svg", import.meta.url);
            var imageTijera = new URL("./img/tijera.svg", import.meta.url);
            style.innerHTML = "\n      .root{\n          width:100%;         \n      }\n      .small{\n        width:70px;\n      }\n      @media (min-width:769px){\n    .small{\n      width:79px;\n    }\n  }\n    .med{\n      width:121px;\n  }\n  .big{\n    width:150px;\n  }\n      .papel  {\n        width:78px;\n      }\n       @media (min-width:769px){\n         .papel{\n            width:93px;\n      }\n    }\n    \n    \n      .container{\n               width: 100%;\n               height: 137px;\n               display: flex;\n               justify-content: space-evenly;\n               gap: 20px;\n      }\n     #tijera:hover{\n             animation: moveHand 0.3s 0.1s both;\n     }  \n     \n     #papel:hover{\n             animation: moveHand 0.3s 0.1s both;\n     }  \n     #piedra:hover{\n             animation: moveHand 0.3s 0.1s both;\n     }      \n    @keyframes moveHand {\n     0% {\n       margin-top: -10px;\n     }\n     100% {\n       margin-top: -50px;\n     }\n    }\n      ";
            divEl.classList.add("root");
            divEl.innerHTML = "\n      <div class=\"container\">\n      <img class=\"small\" src=\"".concat(imageTijera.href, "\"><img>\n      <img class=\"small\" src=\"").concat(imagePiedra.href, "\"><img>\n      <img class=\"small\" src=\"").concat(imagePapel.href, "\"><img>\n      </div>     \n      ");
            if (type == "tijera") {
                divEl.innerHTML = "\n          <img id=\"tijera\" class=\"".concat(size, "\" src=\"").concat(imageTijera.href, "\"><img>");
            }
            else if (type == "piedra") {
                divEl.innerHTML = "\n          <img id=\"piedra\"  class=\"".concat(size, "\" src=\"").concat(imagePiedra.href, "\"><img>");
            }
            else if (type == "papel") {
                divEl.innerHTML = "\n          <img id=\"papel\" class=\"".concat(size, "\" src=\"").concat(imagePapel.href, "\"><img>");
            }
            else if (type == "") {
                divEl.innerHTML = "";
            }
            this.shadow.appendChild(style);
            this.shadow.appendChild(divEl);
        };
        return manos;
    }(HTMLElement));
    customElements.define("manos-comp", manos);
}
exports.manosComp = manosComp;
