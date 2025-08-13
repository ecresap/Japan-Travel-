const breadcrumbsEl = document.getElementById('breadcrumbs');
const contentEl = document.getElementById('content');

const travelData = {
  tokyo: {
    name: 'Tokyo',
    hotels: [
      { name: 'Miyako City Tokyo Takanawa', address: '' }
    ]
  },
  osaka: {
    name: 'Osaka',
    hotels: [
      { name: 'Hotel Forza Osaka Namba Dotonbori', address: '' }
    ]
  },
  kyoto: {
    name: 'Kyoto',
    hotels: [
      { name: 'Prince Smart Inn Kyoto Sanjo', address: '' }
    ]
  }
};

function showHome() {
  contentEl.innerHTML = '';
  Object.keys(travelData).forEach(cityKey => {
    const btn = document.createElement('button');
    btn.className = 'button';
    btn.textContent = travelData[cityKey].name;
    btn.onclick = () => showCity(cityKey);
    contentEl.appendChild(btn);
  });
}

function showCity(cityKey) {
  const city = travelData[cityKey];
  contentEl.innerHTML = '';
  const mapBtn = document.createElement('button');
  mapBtn.className = 'button';
  mapBtn.textContent = 'Map';
  contentEl.appendChild(mapBtn);

  const hotelBtn = document.createElement('button');
  hotelBtn.className = 'button';
  hotelBtn.textContent = 'Hotels';
  hotelBtn.onclick = () => showHotels(cityKey);
  contentEl.appendChild(hotelBtn);

  const favBtn = document.createElement('button');
  favBtn.className = 'button';
  favBtn.textContent = 'Favorites';
  contentEl.appendChild(favBtn);
}

function showHotels(cityKey) {
  const city = travelData[cityKey];
  contentEl.innerHTML = '';
  const backBtn = document.createElement('button');
  backBtn.className = 'button';
  backBtn.textContent = 'Back';
  backBtn.onclick = () => showCity(cityKey);
  contentEl.appendChild(backBtn);

  city.hotels.forEach(h => {
    const div = document.createElement('div');
    const a = document.createElement('a');
    a.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ' ' + city.name)}`;
    a.target = '_blank';
    a.className = 'poi-link';
    a.textContent = h.name;

    const addr = document.createElement('div');
    addr.textContent = h.address;

    div.appendChild(a);
    div.appendChild(addr);
    contentEl.appendChild(div);
  });
}

showHome();
