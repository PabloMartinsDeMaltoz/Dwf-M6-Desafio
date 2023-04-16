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
exports.timerComp = void 0;
function timerComp() {
    var timer = /** @class */ (function (_super) {
        __extends(timer, _super);
        function timer() {
            var _this = _super.call(this) || this;
            _this.shadow = _this.attachShadow({ mode: "open" });
            return _this;
        }
        timer.prototype.connectedCallback = function () {
            this.render();
        };
        timer.prototype.render = function () {
            var _this = this;
            var div = document.createElement("div");
            var style = document.createElement("style");
            style.innerHTML = "\n      .root{\n            width: 243px;\n            height: 243px;\n            font-family: 'American Typewriter', cursive;\n            font-weight: 600;\n            font-size: 100px;\n            border: 25px solid black;\n            border-radius: 50%;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n       }\n      ";
            var number = 6;
            var intervalId = setInterval(function () {
                number--;
                div.innerText = "".concat(number);
                if (number == 0) {
                    clearInterval(intervalId);
                    var nuevoEvento = new CustomEvent("timer", {
                        detail: {
                            timer: "closed",
                        },
                    });
                    _this.dispatchEvent(nuevoEvento);
                }
            }, 1000);
            div.classList.add("root");
            this.classList.add("center");
            this.shadow.appendChild(style);
            this.shadow.appendChild(div);
        };
        return timer;
    }(HTMLElement));
    customElements.define("timer-comp", timer);
}
exports.timerComp = timerComp;
