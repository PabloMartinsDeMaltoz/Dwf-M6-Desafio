import { initPageA } from "./src/pages/pageA";
import { initPageB } from "./src/pages/pageB";
import { initPageC } from "./src/pages/pageC";
import { initPageD } from "./src/pages/pageD";
import { initPageE } from "./src/pages/pageE";
import { state } from "./state";
const routes = [
  {
    path: /welcome/,
    component: initPageA,
  },
  {
    path: /instruction/,
    component: initPageB,
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
const BASE_PATH = "/Desafio-M5";

function isGithubPages() {
  return location.host.includes("github.io");
}

export function initRoute(rootEl: Element) {
  function goTo(path) {
    const completePath = isGithubPages() ? BASE_PATH + path : path;
    history.pushState({}, "", completePath);
    handleRoute(completePath);
    console.log(completePath);
  }

  function handleRoute(route) {
    for (const r of routes) {
      console.log("El handleRoute recibió una nueva ruta", route);
      const newRoute = isGithubPages() ? route.replace(BASE_PATH, "") : route;
      console.log(newRoute);

      if (r.path.test(newRoute)) {
        const el = r.component({ goTo: goTo });
        if (rootEl.firstChild) {
          rootEl.firstChild.remove();
        }
        rootEl.appendChild(el);
      }
    }
  }
  if (location.pathname == "/Desafio-M5/" || location.pathname == "/") {
    goTo("/welcome");
  } else {
    handleRoute(location.pathname);
  }
}
