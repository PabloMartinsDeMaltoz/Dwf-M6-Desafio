import { initRoute } from "./routes";
import { titleComp } from "./src/components/title/textComp";
import { buttonComp } from "./src/components/button/buttonComp";
import { manosComp } from "./src/components/manos-comp/manosComp";
import { timerComp } from "./src/components/timer/timerComp";
import { scoreComp } from "./src/components/score/score";
import { starComp } from "./src/components/Star/starComp";
import { inputComp } from "./src/components/input/inputComp";
import { headerInfoComp } from "./src/components/header-info/headerInfo";
import { state } from "./state";

function main() {
  const rootEl: any = document.querySelector(".root");
 // state.init();
  titleComp();
  buttonComp();
  manosComp();
  timerComp();
  scoreComp();
  starComp();
  inputComp();
  headerInfoComp();
  initRoute(rootEl);
}

main();
