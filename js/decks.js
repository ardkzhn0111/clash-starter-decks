// The catalog uses card details already introduced by the two deck guides.
const cardData = [
  { name: 'Giant', cost: 5, role: 'tank', image: 'giant.png', decks: ['Giant Beatdown'], note: 'A durable front line for a supported push.' },
  { name: 'Hog Rider', cost: 4, role: 'win condition', image: 'hog-rider.png', decks: ['Hog 2.6 Cycle'], note: 'A fast attacker that targets buildings.' },
  { name: 'Musketeer', cost: 4, role: 'support', image: 'musketeer.png', decks: ['Giant Beatdown', 'Hog 2.6 Cycle'], note: 'Ranged support against air and ground troops.' },
  { name: 'Mini P.E.K.K.A', cost: 4, role: 'support', image: 'mini-pekka.png', decks: ['Giant Beatdown'], note: 'High single-target damage against ground tanks.' },
  { name: 'Archers', cost: 3, role: 'support', image: 'archers.png', decks: ['Giant Beatdown'], note: 'Two ranged troops that can cover air and ground.' },
  { name: 'Minions', cost: 3, role: 'swarm', image: 'minions.png', decks: ['Giant Beatdown'], note: 'A group of flying defenders.' },
  { name: 'Bomber', cost: 2, role: 'support', image: 'bomber.png', decks: ['Giant Beatdown'], note: 'A low-cost troop with splash damage.' },
  { name: 'Arrows', cost: 3, role: 'spell', image: 'arrows.png', decks: ['Giant Beatdown'], note: 'A spell for clearing groups of small troops.' },
  { name: 'Cannon', cost: 3, role: 'building', image: 'cannon.png', decks: ['Hog 2.6 Cycle'], note: 'A central building that can pull ground attackers.' },
  { name: 'Ice Golem', cost: 2, role: 'tank', image: 'ice-golem.png', decks: ['Hog 2.6 Cycle'], note: 'A small tank for distracting and kiting troops.' },
  { name: 'Skeletons', cost: 1, role: 'cycle', image: 'skeletons.png', decks: ['Hog 2.6 Cycle'], note: 'A one-elixir distraction that helps cycle the deck.' },
  { name: 'Ice Spirit', cost: 1, role: 'cycle', image: 'ice-spirit.png', decks: ['Hog 2.6 Cycle'], note: 'A cheap cycle card that briefly freezes targets.' },
  { name: 'Fireball', cost: 4, role: 'spell', image: 'fireball.png', decks: ['Giant Beatdown', 'Hog 2.6 Cycle'], note: 'A medium spell for troops and useful tower value.' },
  { name: 'The Log', cost: 2, role: 'spell', image: 'the-log.png', decks: ['Hog 2.6 Cycle'], note: 'A ground spell that clears small troops along its path.' }
];

const catalog = document.querySelector('#card-catalog');
const searchInput = document.querySelector('#card-search');
const roleFilter = document.querySelector('#role-filter');
const catalogStats = document.querySelector('#catalog-stats');
const catalogEmpty = document.querySelector('#catalog-empty');
const catalogMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function createCard(card) {
  const item = document.createElement('li');
  item.className = 'catalog-card';

  const figure = document.createElement('div');
  figure.className = 'catalog-card-image';
  const image = document.createElement('img');
  image.src = `assets/cards/${card.image}`;
  image.alt = `${card.name} card`;
  image.width = 150;
  image.height = 180;
  image.loading = 'lazy';
  const cost = document.createElement('span');
  cost.className = 'elixir';
  cost.setAttribute('aria-label', `${card.cost} elixir`);
  cost.textContent = String(card.cost);
  figure.append(image, cost);

  const title = document.createElement('h3');
  title.textContent = card.name;
  const role = document.createElement('p');
  role.className = 'catalog-card-role';
  role.textContent = card.role;
  const note = document.createElement('p');
  note.className = 'catalog-card-note';
  note.textContent = card.note;
  const decks = document.createElement('p');
  decks.className = 'catalog-card-decks';
  decks.textContent = card.decks.join(' · ');
  item.append(figure, title, role, note, decks);
  return item;
}

function renderCatalog() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedRole = roleFilter.value;
  const matches = cardData.filter(function (card) {
    const searchable = `${card.name} ${card.role} ${card.note} ${card.decks.join(' ')}`.toLowerCase();
    const matchesText = searchable.includes(query);
    const matchesRole = selectedRole === 'all' || card.role === selectedRole;
    return matchesText && matchesRole;
  });

  const fragment = document.createDocumentFragment();
  matches.forEach(function (card) { fragment.append(createCard(card)); });
  catalog.replaceChildren(fragment);
  catalogEmpty.hidden = matches.length !== 0;

  if (matches.length) {
    const average = matches.reduce(function (sum, card) { return sum + card.cost; }, 0) / matches.length;
    catalogStats.textContent = `Showing ${matches.length} of ${cardData.length} cards · Average cost: ${average.toFixed(1)} elixir`;
  } else {
    catalogStats.textContent = `Showing 0 of ${cardData.length} cards · Average cost: —`;
  }

  if (window.jQuery && matches.length && !catalogMotion.matches) {
    window.jQuery(catalog).children().hide().stop(true, true).fadeIn(150);
  }
}

searchInput.addEventListener('input', renderCatalog);
roleFilter.addEventListener('change', renderCatalog);
renderCatalog();
