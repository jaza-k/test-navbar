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

  function updateUnderline(selectedItem: HTMLElement) {
    if (!underline) {
      throw new Error('Element with class .underline not found');
    }
    const rect = selectedItem.getBoundingClientRect();
    underline.style.width = `${rect.width}px`;
    underline.style.left = `${selectedItem.offsetLeft}px`;
    // adjust underline position relative to bottom of navbar
    underline.style.bottom = '0px';
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(navItem => navItem.classList.remove('active'));
      const target = e.currentTarget as HTMLElement;
      target.classList.add('active');
      updateUnderline(target);
    });
  });

  // set underline for the first item on initial load
  if (navItems.length > 0) {
    navItems[0].classList.add('active');
    updateUnderline(navItems[0] as HTMLElement);
  }
  return navbar
}