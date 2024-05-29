import "../styles/navbar.scss";

export function navBar(cities: { section: string, label: string }[]): HTMLElement {
  async function fetchCityTime(city: string): Promise<string> {
    const timezoneMap: { [key: string]: string } = {
      "cupertino": "America/Los_Angeles",
      "new-york-city": "America/New_York",
      "london": "Europe/London",
      "amsterdam": "Europe/Amsterdam",
      "tokyo": "Asia/Tokyo",
      "hong-kong": "Asia/Hong_Kong",
      "sydney": "Australia/Sydney"
    };
  
    const timezone = timezoneMap[city];
    if (!timezone) {
      return "Time not available";
    }
  
    try {
      // fetch time from worldtimeapi.org
      const response = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.datetime); // returns 2024-05-29T14:40:49.352066-04:00
      
      // parse the time from the datetime string
      const resultTime = data.datetime.split('T')[1].split('.')[0];
      return resultTime;
    } catch (error) {
      console.error(`Failed to fetch time for ${city}:`, error);
      return "Time not available";
    }
  }

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

    // setting underline width and position
    const rect = selectedItem.getBoundingClientRect();

    // set underline width to match the width of the selected item
    underline.style.width = `${rect.width}px`;

    // adjust underline position relative to left of navbar
    underline.style.left = `${selectedItem.offsetLeft}px`;

    // adjust underline position relative to bottom of navbar
    underline.style.bottom = '0px';
  }

  navItems.forEach(item => {
    item.addEventListener('click', async (e) => {
      e.preventDefault();
      navItems.forEach(navItem => navItem.classList.remove('active'));
      // add active class to the clicked item
      const target = e.currentTarget as HTMLElement;
      target.classList.add('active');
      updateUnderline(target);

      // fetch and display city time
      const citySection = target.dataset.section;
      const cityTimeElements = navbar.querySelectorAll<HTMLElement>('.city-time');
      cityTimeElements.forEach(cityTime => {
        cityTime.classList.remove('show');
      }); 
      const cityTimeElement = navbar.querySelector<HTMLElement>(`.city-time[data-section="${citySection}"]`);
      if (cityTimeElement) {
        cityTimeElement.textContent = "Loading...";
        cityTimeElement.classList.add('show');
        const cityTime = await fetchCityTime(citySection!);
        // update city time once loaded
        cityTimeElement.textContent = cityTime;
      }
    });
  });

  // set underline for the first item on initial load
  if (navItems.length > 0) {
    navItems[0].classList.add('active');
    updateUnderline(navItems[0] as HTMLElement);
  }

  return navbar;
}