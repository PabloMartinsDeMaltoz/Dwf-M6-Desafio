"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoute = void 0;
const welcome_1 = require("./src/pages/welcome");
const instruction_1 = require("./src/pages/instruction");
const play_1 = require("./src/pages/play");
const moves_1 = require("./src/pages/moves");
const pageE_1 = require("./src/pages/pageE");
const waitPlayer_1 = require("./src/pages/waitPlayer");
const nuevo_juego_1 = require("./src/pages/nuevo-juego");
const compartirSala_1 = require("./src/pages/compartirSala");
const connectedRoom_1 = require("./src/pages/connectedRoom");
const loginName_1 = require("./src/pages/loginName");
const salaLlena_1 = require("./src/pages/salaLlena");
const routes = [
    {
        path: /welcome/,
        component: welcome_1.initPageWelcome,
    },
    {
        path: /newGame/,
        component: nuevo_juego_1.initPageNewGame,
    },
    {
        path: /connectedRoom/,
        component: connectedRoom_1.initPageConnectedRoom,
    },
    {
        path: /loginName/,
        component: loginName_1.initPageLoginName,
    },
    {
        path: /compartirSala/,
        component: compartirSala_1.compartirSala,
    },
    {
        path: /fullRoom/,
        component: salaLlena_1.initPageFull,
    },
    {
        path: /instruction/,
        component: instruction_1.instruction,
    },
    {
        path: /play/,
        component: play_1.initPlay,
    },
    {
        path: /moves/,
        component: moves_1.initMoves,
    },
    {
        path: /result/,
        component: pageE_1.initPageE,
    },
    {
        path: /wait/,
        component: waitPlayer_1.waitPlayer,
    },
];
function initRoute(rootEl) {
    function goTo(path) {
        history.pushState({}, "", path);
        window.onpopstate = function () {
            handleRoute(location.pathname);
        };
        handleRoute(path);
        console.log(path);
    }
    function handleRoute(route) {
        for (const r of routes) {
            console.log("El handleRoute recibió una nueva ruta", route);
            if (r.path.test(route)) {
                const el = r.component({ goTo: goTo });
                if (rootEl.firstChild) {
                    rootEl.firstChild.remove();
                }
                console.log(el);
                rootEl.appendChild(el);
            }
        }
    }
    if (location.pathname == "/") {
        goTo("/welcome");
    }
    else {
        handleRoute(location.pathname);
    }
}
exports.initRoute = initRoute;
