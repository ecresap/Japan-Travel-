/*
 * Interactive travel planner for Kyoto, Osaka, and Tokyo.
 * This script defines the data model and handles dynamic UI rendering.
 */

// Data model: list of cities, neighborhoods, points of interest, stations and street food areas.
const travelData = {
  kyoto: {
    name: 'Kyoto',
    dates: '9/12 – 9/15',
    // Background image shown when Kyoto is selected
    bgImage: 'assets/kyoto_bg.jpg',
    neighborhoods: {
      Higashiyama: {
        name: 'Higashiyama',
        station: 'Higashiyama Station (Tozai Line)',
        pois: [
          'Kiyomizu-dera',
          'Ninenzaka & Sannenzaka',
          'Yasaka Pagoda',
          'Kodaiji Temple',
          'Yasaka Shrine',
          'Hanami Koji (Gion)',
          'Philosopher’s Path'
        ],
        streetFood: []
      },
      'Sanjo / Gion / Central': {
        name: 'Sanjo / Gion / Central',
        station:
          'Kyoto-Kawaramachi Station (Hankyu Line) / Shijo Station (Keihan Line) / Higashiyama Station (Tozai Line)',
        pois: [
          'Pontocho Alley',
          'Kamo River Dining',
          'Gion Cultural Corner',
          'Kyoto Imperial Palace',
          'Heian Shrine',
          'Okazaki Shrine'
        ],
        streetFood: []
      },
      'Northern Kyoto': {
        name: 'Northern Kyoto',
        station: 'Emmachi Station (JR Sagano Line) then bus 204/205 to Kinkaku-ji',
        pois: ['Kinkaku-ji (Golden Pavilion)'],
        streetFood: []
      },
      'Southern Kyoto': {
        name: 'Southern Kyoto',
        station: 'JR Inari Station / Fushimi-Inari Station (Keihan Line)',
        pois: [
          'Fushimi Inari Shrine',
          'Tofukuji Temple',
          'Higashi Honganji',
          'Kyoto Station Skywalk'
        ],
        streetFood: []
      },
      Uji: {
        name: 'Uji',
        station: 'Uji Station (JR Nara Line / Keihan Uji Line)',
        pois: ['Byodoin Temple', 'Matcha Shops & Riverside Walks', 'Ukai Fishing (seasonal)'],
        streetFood: []
      },
      Arashiyama: {
        name: 'Arashiyama',
        station: 'Saga-Arashiyama Station (JR Sagano Line)',
        pois: [
          'Bamboo Grove',
          'Sagano Romantic Train',
          'Hozugawa River Cruise',
          'Togetsukyo Bridge',
          'Iwatayama Monkey Park',
          'Ukai Fishing (seasonal)'
        ],
        streetFood: []
      },
      'Street Food': {
        name: 'Street Food',
        station: 'Shijo Station (Karasuma Subway Line) / Karasuma & Kyoto-Kawaramachi (Hankyu Line)',
        pois: ['Nishiki Market'],
        streetFood: []
      }
    }
    ,
    // Map configuration for Kyoto: background image and pin coordinates (relative x/y percentages)
    map: {
      image: 'assets/nihonga_kyoto_map.png',
      pins: {
        'Higashiyama': { x: 0.65, y: 0.4 },
        'Sanjo / Gion / Central': { x: 0.55, y: 0.45 },
        'Northern Kyoto': { x: 0.50, y: 0.25 },
        'Southern Kyoto': { x: 0.50, y: 0.6 },
        'Uji': { x: 0.65, y: 0.8 },
        'Arashiyama': { x: 0.30, y: 0.45 },
        'Street Food': { x: 0.55, y: 0.5 }
      }
    }
  },
  osaka: {
    name: 'Osaka',
    dates: '9/9 – 9/12',
    // Background image shown when Osaka is selected
    bgImage: 'assets/osaka_bg.avif',
    neighborhoods: {
      'Namba & Shinsaibashi': {
        name: 'Namba & Shinsaibashi',
        station: 'Namba Station (Midosuji Line) / Shinsaibashi Station (Midosuji & Nagahori Lines)',
        pois: [
          'Dotonbori (Glico Sign, canal boat rides)',
          'Hozenji Temple (moss-covered statue)',
          'Namba Yasaka Shrine',
          'Retro Bar Space Station',
          'Shinsaibashi Shopping Street',
          'TeamLab Botanical Garden'
        ],
        streetFood: ['Dotonbori street food', 'Takoyaki & Okonomiyaki']
      },
      'Den Den Town (Nipponbashi)': {
        name: 'Den Den Town (Nipponbashi)',
        station: 'Nipponbashi Station (Sakaisuji & Sennichimae Lines) / Namba Station (Midosuji Line)',
        pois: ['Anime & Electronics Shops', 'Nipponbashi Street Festa (Spring)'],
        streetFood: []
      },
      'Tennoji / Shinsekai': {
        name: 'Tennoji / Shinsekai',
        station:
          'Tennoji Station (JR & Subway) / Abeno Station (Kintetsu) / Ebisucho Station (Sakaisuji Line) / Dobutsuen-mae Station (Midosuji & Sakaisuji Lines)',
        pois: [
          'Abeno Harukas (Observatory)',
          'Shitennoji Temple',
          'Tennoji Park & Zoo',
          'Shinsekai (Tsutenkaku Tower, Janjan Yokocho)',
          'Kushikatsu Restaurants'
        ],
        streetFood: ['Janjan Yokocho street food']
      },
      'Kita (Umeda)': {
        name: 'Kita (Umeda)',
        station: 'JR Osaka Station / Umeda Station (Midosuji Line)',
        pois: [
          'Umeda Sky Building',
          'HEP Five & Tenjinbashi-suji Shopping Street',
          'Kids Plaza Osaka',
          'Osaka Museum of Housing and Living'
        ],
        streetFood: []
      },
      'Osaka Castle Area': {
        name: 'Osaka Castle Area',
        station:
          'Morinomiya Station or Osakajokoen Station (JR Osaka Loop Line) / Tanimachi 4-chome Station (Chuo & Tanimachi Lines)',
        pois: ['Osaka Castle & Park', 'Nishinomaru Garden', 'Tenmangu Shrine'],
        streetFood: []
      },
      'Bay Area': {
        name: 'Bay Area',
        station: 'Osakako Station (Chuo Line)',
        pois: ['Osaka Aquarium Kaiyukan', 'Tempozan Ferris Wheel', 'Santa Maria Cruise', 'Legoland Osaka'],
        streetFood: []
      },
      'Expo Park (Suita)': {
        name: 'Expo Park (Suita)',
        station: 'Bampaku-kinen-koen Station (Osaka Monorail via Senri-Chuo)',
        pois: ['Tower of the Sun', 'Flower Gardens', 'Expo 70 Park'],
        streetFood: []
      },
      Minoo: {
        name: 'Minoo',
        station: 'Minoo Station (Hankyu Minoo Line)',
        pois: ['Minoo Park & Waterfall', 'Ryuanji Temple'],
        streetFood: []
      },
      'Street Food': {
        name: 'Street Food',
        station: 'Nipponbashi Station or Namba Station',
        pois: ['Kuromon Ichiba Market'],
        streetFood: []
      }
    }
    ,
    // Map configuration for Osaka: background image and pin coordinates (relative x/y percentages)
    map: {
      image: 'assets/nihonga_osaka_map.png',
      pins: {
        'Namba & Shinsaibashi': { x: 0.55, y: 0.58 },
        'Den Den Town (Nipponbashi)': { x: 0.55, y: 0.65 },
        'Tennoji / Shinsekai': { x: 0.55, y: 0.72 },
        'Kita (Umeda)': { x: 0.55, y: 0.35 },
        'Osaka Castle Area': { x: 0.70, y: 0.45 },
        'Bay Area': { x: 0.30, y: 0.55 },
        'Expo Park (Suita)': { x: 0.60, y: 0.25 },
        'Minoo': { x: 0.50, y: 0.15 },
        'Street Food': { x: 0.55, y: 0.6 }
      }
    }
  },
  tokyo: {
    name: 'Tokyo',
    dates: '9/4 – 9/9',
    // Background image shown when Tokyo is selected
    bgImage: 'assets/tokyo_bg.avif',
    neighborhoods: {},
    message: 'Tokyo attractions are coming soon. You can update this list later.'
  }
};

/*
 * Starred POI management
 *
 * We allow users to mark points of interest (POIs) as favourites. The starred
 * state is saved to localStorage so it persists across sessions. Star icons
 * appear next to each POI in the neighborhood detail view. Clicking the star
 * toggles its state, and all instances of the same POI are updated.
 */
// Load starred POIs from localStorage. Keys are POI names, values are true.
let starredPOIs = {};
try {
  const storedStars = localStorage.getItem('starredPOIs');
  if (storedStars) {
    starredPOIs = JSON.parse(storedStars) || {};
  }
} catch (err) {
  // If localStorage isn’t available (e.g. certain browsers or privacy settings),
  // fall back to an empty object.
  starredPOIs = {};
}

/**
 * Persist the current starred POIs to localStorage.
 */
function saveStarred() {
  try {
    localStorage.setItem('starredPOIs', JSON.stringify(starredPOIs));
  } catch (err) {
    // Ignore storage errors (e.g. Safari private mode)
  }
}

/**
 * Toggle the starred state of a POI. Updates all star icons with the same
 * data attribute across the page.
 *
 * @param {string} poiName The name of the POI to toggle.
 */
function toggleStar(poiName) {
  if (starredPOIs[poiName]) {
    delete starredPOIs[poiName];
  } else {
    starredPOIs[poiName] = true;
  }
  saveStarred();
  // Update all star elements in the document with matching data-poi
  const selector = `[data-poi="${CSS.escape(poiName)}"]`;
  document.querySelectorAll(selector).forEach((starEl) => {
    starEl.textContent = starredPOIs[poiName] ? '★' : '☆';
  });
}

// Access DOM elements
const contentEl = document.getElementById('content');
const breadcrumbsEl = document.getElementById('breadcrumbs');

/**
 * Render the home view with buttons for each city.
 */
function showHome() {
  // Update breadcrumbs
  breadcrumbsEl.innerHTML = '';
  // Update page title
  document.title = 'Japan Travel Planner';

  // Reset hero title and subtitle for home
  const heroTitle = document.querySelector('.hero h1');
  const heroSubtitle = document.querySelector('.hero .subtitle');
  if (heroTitle) {
    heroTitle.textContent = 'Japan Travel Planner';
  }
  if (heroSubtitle) {
    heroSubtitle.textContent = 'Explore Kyoto, Osaka and beyond';
  }
  // Set page background to Japan map on home screen
  // Remove any city‑specific background classes and apply home background
  document.body.classList.remove('kyoto-bg', 'osaka-bg', 'tokyo-bg');
  document.body.classList.add('home-bg');
  // Clear any inline background style that might have been set by showCity()
  document.body.style.background = '';
  // Remove map-view class when returning to home
  document.body.classList.remove('map-view');
  // Create a list of city buttons
  const wrapper = document.createElement('div');
  wrapper.className = 'button-list';
  // Define the order of cities on the home screen. We display Tokyo first,
  // then Osaka, then Kyoto. If additional cities are added later, append
  // them after the defined order.
  const orderedKeys = ['tokyo', 'osaka', 'kyoto'];
  const allKeys = Object.keys(travelData);
  // Start with our specified order, then add any keys not listed
  const displayKeys = orderedKeys.concat(
    allKeys.filter((key) => !orderedKeys.includes(key))
  );
  displayKeys.forEach((cityKey) => {
    const city = travelData[cityKey];
    if (!city) return;
    const btn = document.createElement('button');
    btn.className = 'button';
    // Compose HTML to include city name and dates
    const label = document.createElement('span');
    label.className = 'city-name';
    label.textContent = city.name;
    btn.appendChild(label);
    // If a dates property is present, display it on a new line
    if (city.dates) {
      const dateEl = document.createElement('span');
      dateEl.className = 'city-dates';
      dateEl.textContent = city.dates;
      btn.appendChild(document.createElement('br'));
      btn.appendChild(dateEl);
    }
    btn.addEventListener('click', () => showCity(cityKey));
    wrapper.appendChild(btn);
  });
  // Insert into content area
  contentEl.innerHTML = '';
  const intro = document.createElement('p');
  intro.textContent = 'Select a city to explore its neighborhoods and points of interest:';
  contentEl.appendChild(intro);
  contentEl.appendChild(wrapper);
  contentEl.focus();
}

/**
 * Render the view for a selected city.
 * @param {string} cityKey
 */
function showCity(cityKey) {
  const city = travelData[cityKey];
  // Remove all background classes then add the appropriate one based on city
  document.body.classList.remove('home-bg', 'kyoto-bg', 'osaka-bg', 'tokyo-bg');
  if (cityKey === 'kyoto') {
    document.body.classList.add('kyoto-bg');
  } else if (cityKey === 'osaka') {
    document.body.classList.add('osaka-bg');
  } else if (cityKey === 'tokyo') {
    document.body.classList.add('tokyo-bg');
  }
  // Clear any inline background set previously; background image is controlled via CSS class
  document.body.style.background = '';
  // Remove map-view class when displaying city list
  document.body.classList.remove('map-view');
  // Update breadcrumbs
  breadcrumbsEl.innerHTML = '';
  // Add home link to breadcrumbs
  const homeLink = document.createElement('a');
  homeLink.href = '#';
  homeLink.textContent = 'Home';
  homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showHome();
  });
  breadcrumbsEl.appendChild(homeLink);
  // Add separator and city name
  const sep = document.createTextNode(' / ');
  breadcrumbsEl.appendChild(sep);
  const citySpan = document.createElement('span');
  citySpan.textContent = city.name;
  breadcrumbsEl.appendChild(citySpan);
  // Render content
  contentEl.innerHTML = '';
  if (cityKey === 'tokyo' && Object.keys(city.neighborhoods).length === 0) {
    // Show coming soon message for Tokyo
    const msg = document.createElement('p');
    msg.textContent = city.message;
    contentEl.appendChild(msg);
  } else {
    const info = document.createElement('p');
    info.textContent = `Select a neighborhood in ${city.name}:`;
    contentEl.appendChild(info);
    const list = document.createElement('div');
    list.className = 'button-list';
    // Insert a "Map" button at the top if a map configuration exists for this city
    if (city.map && city.map.image) {
      const mapBtn = document.createElement('button');
      mapBtn.className = 'button map-button';
      mapBtn.textContent = 'Map';
      mapBtn.addEventListener('click', () => showMap(cityKey));
      list.appendChild(mapBtn);
    }
    // Insert a "Favorites" button immediately after the map button (if present).
    const favoritesBtn = document.createElement('button');
    favoritesBtn.className = 'button favorites-button';
    favoritesBtn.textContent = 'Favorites';
    favoritesBtn.addEventListener('click', () => showFavorites(cityKey));
    // Append favourites right after map button (or at start if no map button)
    list.appendChild(favoritesBtn);
    // Create a button for each neighborhood
    Object.keys(city.neighborhoods).forEach((nKey) => {
      const nb = city.neighborhoods[nKey];
      const btn = document.createElement('button');
      btn.className = 'button';
      btn.textContent = nb.name;
      btn.addEventListener('click', () => showNeighborhood(cityKey, nKey));
      list.appendChild(btn);
    });
    contentEl.appendChild(list);
  }
  contentEl.focus();

  // Reset hero title back to city name in case debugging modified it
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    heroTitle.textContent = city.name;
  }

  // Update page title to include city name
  document.title = `${city.name} | Japan Travel Planner`;
}

/**
 * Render details for a specific neighborhood within a city.
 * @param {string} cityKey
 * @param {string} neighborhoodKey
 */
function showNeighborhood(cityKey, neighborhoodKey) {
  const city = travelData[cityKey];
  const neighborhood = city.neighborhoods[neighborhoodKey];
  // Update breadcrumbs: Home / City / Neighborhood
  breadcrumbsEl.innerHTML = '';
  const homeLink = document.createElement('a');
  homeLink.href = '#';
  homeLink.textContent = 'Home';
  homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showHome();
  });
  breadcrumbsEl.appendChild(homeLink);
  const sep1 = document.createTextNode(' / ');
  breadcrumbsEl.appendChild(sep1);
  const cityLink = document.createElement('a');
  cityLink.href = '#';
  cityLink.textContent = city.name;
  cityLink.addEventListener('click', (e) => {
    e.preventDefault();
    showCity(cityKey);
  });
  breadcrumbsEl.appendChild(cityLink);
  const sep2 = document.createTextNode(' / ');
  breadcrumbsEl.appendChild(sep2);
  const nbSpan = document.createElement('span');
  nbSpan.textContent = neighborhood.name;
  breadcrumbsEl.appendChild(nbSpan);
  // Clear content
  contentEl.innerHTML = '';
  // Back link to neighborhoods list
  const back = document.createElement('a');
  back.href = '#';
  back.className = 'back-link';
  back.innerHTML = '← Back to ' + city.name;
  back.addEventListener('click', (e) => {
    e.preventDefault();
    showCity(cityKey);
  });
  contentEl.appendChild(back);
  // Create card with details
  const card = document.createElement('div');
  card.className = 'card';
  const title = document.createElement('h2');
  title.textContent = neighborhood.name;
  card.appendChild(title);
  // Station info with clickable links to Google Maps
  const stationContainer = document.createElement('p');
  stationContainer.innerHTML = '<strong>Nearest station:</strong> ';
  // Split station string by slashes (" / ") to handle multiple stations
  const stationParts = neighborhood.station.split(/\s*\/\s*/);
  stationParts.forEach((part, index) => {
    const link = document.createElement('a');
    link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(part)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = part;
    link.className = 'station-link';
    stationContainer.appendChild(link);
    if (index < stationParts.length - 1) {
      stationContainer.appendChild(document.createTextNode(' / '));
    }
  });
  card.appendChild(stationContainer);
  // POIs list
  const poisTitle = document.createElement('p');
  poisTitle.innerHTML = '<strong>Points of interest:</strong>';
  card.appendChild(poisTitle);
  const poisList = document.createElement('ul');
  neighborhood.pois.forEach((poi) => {
    const li = document.createElement('li');
    // Create a star icon for the POI
    const star = document.createElement('span');
    star.className = 'star-icon';
    star.dataset.poi = poi;
    star.textContent = starredPOIs[poi] ? '★' : '☆';
    star.title = 'Click to star/unstar';
    star.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleStar(poi);
    });
    li.appendChild(star);
    // Add a space between the star and the POI name
    li.appendChild(document.createTextNode(' '));
    // Create a link to Google Maps for this POI. Include the city name in
    // the query to improve accuracy.
    const link = document.createElement('a');
    link.className = 'poi-link';
    link.textContent = poi;
    link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(poi + ' ' + city.name)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    li.appendChild(link);
    poisList.appendChild(li);
  });
  card.appendChild(poisList);
  // Street food section if available
  if (neighborhood.streetFood && neighborhood.streetFood.length > 0) {
    const sfTitle = document.createElement('p');
    sfTitle.innerHTML = '<strong>Street food areas:</strong>';
    card.appendChild(sfTitle);
    const sfList = document.createElement('ul');
    neighborhood.streetFood.forEach((sf) => {
      const li = document.createElement('li');
      li.textContent = sf;
      sfList.appendChild(li);
    });
    card.appendChild(sfList);
  }
  contentEl.appendChild(card);
  contentEl.focus();
  // Remove map-view class when viewing neighborhood details
  document.body.classList.remove('map-view');
}

/**
 * Render a high‑level map view for a given city, showing pins for each neighborhood.
 * @param {string} cityKey
 */
function showMap(cityKey) {
  const city = travelData[cityKey];
  if (!city || !city.map) return;
  // Update breadcrumbs: Home / City / Map
  breadcrumbsEl.innerHTML = '';
  const homeLink = document.createElement('a');
  homeLink.href = '#';
  homeLink.textContent = 'Home';
  homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showHome();
  });
  breadcrumbsEl.appendChild(homeLink);
  const sep1 = document.createTextNode(' / ');
  breadcrumbsEl.appendChild(sep1);
  const cityLink = document.createElement('a');
  cityLink.href = '#';
  cityLink.textContent = city.name;
  cityLink.addEventListener('click', (e) => {
    e.preventDefault();
    showCity(cityKey);
  });
  breadcrumbsEl.appendChild(cityLink);
  const sep2 = document.createTextNode(' / ');
  breadcrumbsEl.appendChild(sep2);
  const mapSpan = document.createElement('span');
  mapSpan.textContent = 'Map';
  breadcrumbsEl.appendChild(mapSpan);
  // Clear main content
  contentEl.innerHTML = '';
  // Back link to neighborhoods list
  const back = document.createElement('a');
  back.href = '#';
  back.className = 'back-link';
  back.innerHTML = '← Back to ' + city.name;
  back.addEventListener('click', (e) => {
    e.preventDefault();
    showCity(cityKey);
  });
  contentEl.appendChild(back);
  // Create map container
  const mapContainer = document.createElement('div');
  mapContainer.className = 'map-container';
  // Use inline style to set the background image; this is preserved from CSS overlay via body
  mapContainer.style.backgroundImage = `url('${city.map.image}')`;
  // Add pins to the map
  const pins = city.map.pins || {};
  Object.keys(pins).forEach((label) => {
    const pos = pins[label];
    const pin = document.createElement('div');
    pin.className = 'pin';
    pin.style.left = (pos.x * 100) + '%';
    pin.style.top = (pos.y * 100) + '%';
    // Dot element
    const dot = document.createElement('div');
    dot.className = 'dot';
    pin.appendChild(dot);
    // Label element
    const lbl = document.createElement('div');
    lbl.className = 'label';
    lbl.textContent = label;
    pin.appendChild(lbl);
      // Make the pin clickable to jump to the neighborhood details
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        showNeighborhood(cityKey, label);
      });
      mapContainer.appendChild(pin);
  });
  contentEl.appendChild(mapContainer);
  contentEl.focus();
  // Add map-view class so CSS can adjust panel styling for maps
  document.body.classList.add('map-view');
}

/**
 * Render a view showing all starred points of interest for a given city.
 * Favourites are grouped by neighbourhood. If no favourites exist in the
 * selected city, display a friendly message.
 *
 * @param {string} cityKey
 */
function showFavorites(cityKey) {
  const city = travelData[cityKey];
  if (!city) return;
  // Compute starred POIs grouped by neighbourhood
  const groups = {};
  Object.keys(city.neighborhoods).forEach((nKey) => {
    const nb = city.neighborhoods[nKey];
    const starredInNb = nb.pois.filter((poi) => starredPOIs[poi]);
    if (starredInNb.length > 0) {
      groups[nKey] = starredInNb;
    }
  });
  // Update breadcrumbs: Home / City / Favorites
  breadcrumbsEl.innerHTML = '';
  const homeLink = document.createElement('a');
  homeLink.href = '#';
  homeLink.textContent = 'Home';
  homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showHome();
  });
  breadcrumbsEl.appendChild(homeLink);
  const sep1 = document.createTextNode(' / ');
  breadcrumbsEl.appendChild(sep1);
  const cityLink = document.createElement('a');
  cityLink.href = '#';
  cityLink.textContent = city.name;
  cityLink.addEventListener('click', (e) => {
    e.preventDefault();
    showCity(cityKey);
  });
  breadcrumbsEl.appendChild(cityLink);
  const sep2 = document.createTextNode(' / ');
  breadcrumbsEl.appendChild(sep2);
  const favSpan = document.createElement('span');
  favSpan.textContent = 'Favorites';
  breadcrumbsEl.appendChild(favSpan);
  // Clear main content
  contentEl.innerHTML = '';
  // Back link to city menu
  const back = document.createElement('a');
  back.href = '#';
  back.className = 'back-link';
  back.innerHTML = '← Back to ' + city.name;
  back.addEventListener('click', (e) => {
    e.preventDefault();
    showCity(cityKey);
  });
  contentEl.appendChild(back);
  // If there are no favourites in this city, show a message
  const groupKeys = Object.keys(groups);
  if (groupKeys.length === 0) {
    const msg = document.createElement('p');
    msg.textContent = 'You have not starred any points of interest in ' + city.name + ' yet.';
    contentEl.appendChild(msg);
  } else {
    groupKeys.forEach((nKey) => {
      const nbName = city.neighborhoods[nKey].name;
      const pois = groups[nKey];
      const card = document.createElement('div');
      card.className = 'card';
      const title = document.createElement('h3');
      title.textContent = nbName;
      card.appendChild(title);
      const list = document.createElement('ul');
      pois.forEach((poi) => {
        const li = document.createElement('li');
        // Star icon for toggling within favourites view as well
        const star = document.createElement('span');
        star.className = 'star-icon';
        star.dataset.poi = poi;
        star.textContent = starredPOIs[poi] ? '★' : '☆';
        star.title = 'Click to star/unstar';
        star.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleStar(poi);
          // Re-render favourites to reflect removal/addition
          showFavorites(cityKey);
        });
        li.appendChild(star);
        // Add a space before the link
        li.appendChild(document.createTextNode(' '));
        // Create a link to Google Maps for this POI using the city name for context
        const link = document.createElement('a');
        link.className = 'poi-link';
        link.textContent = poi;
        link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(poi + ' ' + city.name)}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        li.appendChild(link);
        list.appendChild(li);
      });
      card.appendChild(list);
      contentEl.appendChild(card);
    });
  }
  contentEl.focus();
  // Ensure map-view class is removed for this view
  document.body.classList.remove('map-view');
}

// Initialize application on page load
document.addEventListener('DOMContentLoaded', showHome);