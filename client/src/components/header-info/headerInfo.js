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
exports.headerInfoComp = void 0;
var state_1 = require("../../../state");
function headerInfoComp() {
    var headerInfoComp = /** @class */ (function (_super) {
        __extends(headerInfoComp, _super);
        function headerInfoComp() {
            var _this = _super.call(this) || this;
            state_1.state.subscribe(function () {
                _this.connectedCallback();
            });
            return _this;
        }
        headerInfoComp.prototype.connectedCallback = function () {
            this.render();
        };
        headerInfoComp.prototype.render = function () {
            var currentData = state_1.state.getData();
            var divEl = document.createElement("div");
            var style = document.createElement("style");
            this.style.width = "100%";
            style.innerHTML = "\n      .header{\n    display: flex;\n    flex-direction: row;\n    justify-content: space-around;\n    width: 100%;\n    margin-top:31px;\n}\n  .player1{\n    font-family: 'American Typewriter', cursive;\n    font-size:24px;\n    font-weight:600;\n    margin:0px;\n}\n\n  .player2{\n    font-family: 'American Typewriter', cursive;\n    font-size:24px;\n    font-weight:600;\n    color:#FF6442;\n    margin:0px;\n}\n.room{\n    font-family: 'American Typewriter', cursive; \n    font-size:24px;  \n    margin:0px;\n}\n     \n     ";
            var player1 = currentData.name;
            var player1Victories = currentData.history[currentData.name]
                ? currentData.history[currentData.name].score.victorias
                : 0;
            var player2Victories = currentData.history[currentData.opponentName]
                ? currentData.history[currentData.opponentName].score.victorias
                : 0;
            var player2 = currentData.opponentName
                ? currentData.opponentName
                : "offline";
            divEl.innerHTML = "\n         <header class=\"header\">\n           <div class\"header__score\">\n            <p class=\"player1\">".concat(player1, ":").concat(player1Victories, "</p>\n            <p class=\"player2\">").concat(player2, ":").concat(player2Victories, "</p>\n           </div>\n           <div class\"header__room\">\n            <p class=\"player1\">Sala</p>\n            <p class=\"room\">").concat(currentData.shortId, "</p>\n           </div> \n         </header>\n     ");
            if (this.firstChild) {
                this.lastChild.remove();
                this.firstChild.remove();
                this.appendChild(divEl);
                this.appendChild(style);
            }
            else {
                this.appendChild(divEl);
                this.appendChild(style);
            }
        };
        return headerInfoComp;
    }(HTMLElement));
    customElements.define("headerinfo-comp", headerInfoComp);
}
exports.headerInfoComp = headerInfoComp;
