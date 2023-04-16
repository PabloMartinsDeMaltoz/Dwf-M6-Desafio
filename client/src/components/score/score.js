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
exports.scoreComp = void 0;
var state_1 = require("../../../state");
function scoreComp() {
    var score = /** @class */ (function (_super) {
        __extends(score, _super);
        function score() {
            var _this = _super.call(this) || this;
            _this.shadow = _this.attachShadow({ mode: "open" });
            var div = document.createElement("div");
            var style = document.createElement("style");
            var myScore = _this.getAttribute("myScore");
            var pcScore = _this.getAttribute("pcScore");
            var currentData = state_1.state.getData();
            style.innerHTML = "\n    .root{\n       width: 259px;\n       border: solid 10px black;\n       border-radius: 10px;\n       background:white;\n    }\n    .score{\n        text-align:center;\n        padding-top:13px;\n    }\n    .font{\n           text-align: end;\n           padding-right: 30px;\n           padding-top: 11px;\n    }\n    .results{\n        display:flex;\n        flex-direction: column;\n}\n    }\n    ";
            div.classList.add("root");
            div.innerHTML = "\n      <text-comp class=\"score\" type=\"score\">Score</text-comp>\n      <div class=\"results\">\n      <text-comp  class=\"font\" type=\"score\">".concat(currentData.name, ": ").concat(myScore, "</text-comp>\n      <text-comp  class=\"font\" type=\"score\">").concat(currentData.opponentName, ": ").concat(pcScore, "</text-comp>\n      </div>\n      ");
            _this.shadow.appendChild(div);
            _this.shadow.appendChild(style);
            return _this;
        }
        return score;
    }(HTMLElement));
    customElements.define("score-comp", score);
}
exports.scoreComp = scoreComp;
