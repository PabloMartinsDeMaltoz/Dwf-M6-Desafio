import { initPageWelcome } from "./src/pages/welcome";
import { instruction } from "./src/pages/instruction";
import { initPageC } from "./src/pages/pageC";
import { initPageD } from "./src/pages/pageD";
import { initPageE } from "./src/pages/pageE";
import { state } from "./state";
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
    component: initPageC,
  },
  {
    path: /moves/,
    component: initPageD,
  },
  {
    path: /result/,
    component: initPageE,
  },
];

export function initRoute(rootEl: Element) {
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
        const el = r.component({ goTo: goTo }) as any;
        if (rootEl.firstChild) {
          rootEl.firstChild.remove();
        }
        rootEl.appendChild(el);
      }
    }
  }
  if (location.pathname == "/") {
    goTo("/welcome");
  } else {
    handleRoute(location.pathname);
  }
}
