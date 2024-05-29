import "../styles/navbar.scss";

export function navBar(cities: { section: string, label: string }[]): HTMLElement {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar';

  navbar.innerHTML = `
    ${cities.map(city => `
      <div class="nav-item-wrapper">
        <div class="city-time" data-section="${city.section}"></div>
        <a href="#" class="nav-item" data-section="${city.section}">${city.label}</a>
      </div>
    `).join('')}
    <div class="underline"></div>
  `;

  const navItems = navbar.querySelectorAll('.nav-item');
  const underline = navbar.querySelector<HTMLElement>('.underline');

  return navbar
}
