import { initPageWelcome } from "./src/pages/welcome";
import { instruction } from "./src/pages/instruction";
import { initPlay } from "./src/pages/play";
import { initMoves } from "./src/pages/moves";
import { initPageE } from "./src/pages/pageE";
import { waitPlayer } from "./src/pages/waitPlayer";
import { initPageNewGame } from "./src/pages/nuevo-juego";
import { compartirSala } from "./src/pages/compartirSala";
import { initPageConnectedRoom } from "./src/pages/connectedRoom";
import { initPageLoginName } from "./src/pages/loginName";
import { initPageFull } from "./src/pages/salaLlena";
const routes = [
    {
        path: /welcome/,
        component: initPageWelcome,
    },
    {
        path: /newGame/,
        component: initPageNewGame,
    },
    {
        path: /connectedRoom/,
        component: initPageConnectedRoom,
    },
    {
        path: /loginName/,
        component: initPageLoginName,
    },
    {
        path: /compartirSala/,
        component: compartirSala,
    },
    {
        path: /fullRoom/,
        component: initPageFull,
    },
    {
        path: /instruction/,
        component: instruction,
    },
    {
        path: /play/,
        component: initPlay,
    },
    {
        path: /moves/,
        component: initMoves,
    },
    {
        path: /result/,
        component: initPageE,
    },
    {
        path: /wait/,
        component: waitPlayer,
    },
];
export function initRoute(rootEl) {
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
