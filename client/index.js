"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = require("./routes");
var textComp_1 = require("./src/components/title/textComp");
var buttonComp_1 = require("./src/components/button/buttonComp");
var manosComp_1 = require("./src/components/manos-comp/manosComp");
var timerComp_1 = require("./src/components/timer/timerComp");
var score_1 = require("./src/components/score/score");
var starComp_1 = require("./src/components/Star/starComp");
var inputComp_1 = require("./src/components/input/inputComp");
var headerInfo_1 = require("./src/components/header-info/headerInfo");
function main() {
    var rootEl = document.querySelector(".root");
    // state.init();
    (0, textComp_1.titleComp)();
    (0, buttonComp_1.buttonComp)();
    (0, manosComp_1.manosComp)();
    (0, timerComp_1.timerComp)();
    (0, score_1.scoreComp)();
    (0, starComp_1.starComp)();
    (0, inputComp_1.inputComp)();
    (0, headerInfo_1.headerInfoComp)();
    (0, routes_1.initRoute)(rootEl);
}
main();
