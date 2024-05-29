import "./styles/main.scss";
import { navBar } from "./components/navbar.ts";
import data from "./navigation.json" assert { type: "json" };

document.querySelector<HTMLDivElement>("#app")!.innerHTML = '';

const navbar = navBar(data.cities);
document.querySelector<HTMLDivElement>("#app")!.appendChild(navBar(data.cities));