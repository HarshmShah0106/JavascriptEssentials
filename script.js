// Data: simple arrays for beaches, temples, and country-based destinations
const beaches = [
  {
    name: 'Baga Beach',
    country: 'India',
    image: 'assets/beach_baga.jpg',
    blurb: 'Lively beach in Goa with water sports and nightlife.'
  },
  {
    name: 'Whitehaven Beach',
    country: 'Australia',
    image: 'assets/beach_whitehaven.jpg',
    blurb: 'Pristine silica sands in the Whitsundays, perfect for relaxing.'
  }
];

const temples = [
  {
    name: 'Somnath Temple',
    country: 'India',
    image: 'assets/temple_somnath.jpg',
    blurb: 'Historic temple on the Gujarat coast, a major pilgrimage site.'
  },
  {
    name: 'Angkor Wat',
    country: 'Cambodia',
    image: 'assets/temple_angkor.jpg',
    blurb: 'Vast temple complex renowned for its architecture and sunrise views.'
  }
];

const byCountry = [
  {
    name: 'Havelock Island',
    type: 'Beach',
    country: 'India',
    image: 'assets/country_havelock.jpg',
    blurb: 'Emerald waters and coral reefs in the Andaman Islands.'
  },
  {
    name: 'Meiji Shrine',
    type: 'Temple',
    country: 'Japan',
    image: 'assets/country_meiji.jpg',
    blurb: 'Serene shrine in Tokyo surrounded by a lush forest.'
  }
];

// Helpers: rendering and filter logic
function clearCards() {
  const cards = document.getElementById('cards');
  if (cards) cards.innerHTML = '';
}

function renderCards(items) {
  const grid = document.getElementById('cards');
  if (!grid) return;
  clearCards();
  for (let i = 0; i < items.length; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    const img = document.createElement('img');
    img.src = items[i].image;
    img.alt = items[i].name;
    const content = document.createElement('div');
    content.className = 'card-content';
    const h3 = document.createElement('h3');
    h3.textContent = items[i].name;
    const p = document.createElement('p');
    p.textContent = items[i].blurb + ' (' + (items[i].country || items[i].type + ', ' + items[i].country) + ')';
    content.appendChild(h3);
    content.appendChild(p);
    card.appendChild(img);
    card.appendChild(content);
    grid.appendChild(card);
  }
}

function showCountryInput(show) {
  const el = document.getElementById('countryInput');
  if (el) el.style.display = show ? 'flex' : 'none';
}

function filterByCountry(country) {
  const result = [];
  for (let i = 0; i < byCountry.length; i++) {
    if (byCountry[i].country.toLowerCase() === country.toLowerCase()) {
      result.push(byCountry[i]);
    }
  }
  return result;
}

// Events: main page interactions
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.filters button[data-type]');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (e) {
      const type = e.target.getAttribute('data-type');
      if (type === 'beach') {
        showCountryInput(false);
        renderCards(beaches); // beach recommendation with two images
      } else if (type === 'temple') {
        showCountryInput(false);
        renderCards(temples); // temple recommendation with two images
      } else if (type === 'country') {
        showCountryInput(true);
        clearCards();
      }
    });
  }

  const goBtn = document.getElementById('countryGo');
  if (goBtn) {
    goBtn.addEventListener('click', function () {
      const input = document.getElementById('countrySelect');
      const country = (input && input.value.trim()) || '';
      if (!country) {
        renderCards(byCountry); // show all if empty for demo
        return;
      }
      const results = filterByCountry(country);
      renderCards(results.length ? results : byCountry); // fallback: show sample
    });
  }
});
