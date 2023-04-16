"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./routes");
const textComp_1 = require("./src/components/title/textComp");
const buttonComp_1 = require("./src/components/button/buttonComp");
const manosComp_1 = require("./src/components/manos-comp/manosComp");
const timerComp_1 = require("./src/components/timer/timerComp");
const score_1 = require("./src/components/score/score");
const starComp_1 = require("./src/components/Star/starComp");
const inputComp_1 = require("./src/components/input/inputComp");
const headerInfo_1 = require("./src/components/header-info/headerInfo");
function main() {
    const rootEl = document.querySelector(".root");
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
