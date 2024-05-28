import "./styles/main.scss";
import { navBar } from "./components/navbar.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Cities</h1>
    <div id="navbar"></div>
  </div>
`;

navBar(document.querySelector<HTMLElement>("#navbar")!);
