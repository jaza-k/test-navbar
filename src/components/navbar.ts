// import navigation.json file
import data from "../navigation.json" assert { type: "json" };

export function navBar(nav: HTMLElement) {

  let cities = data.cities;
  let cityNames = cities.map((city) => city.label);

  nav.classList.add("navbar");
  nav.innerHTML = `
    <div class="container">
    <ul>
      ${cityNames.map((cityName) => `<li>${cityName}</li>`).join("")}
    </ul>
    
    </div>
  `;
  
}
