/* Shared site preferences and the cross-page saved-card collection. */
(function () {
  const themeKey = 'clashStarter.theme.v1';
  const favoritesKey = 'clashStarter.savedCards.v1';
  const cardDetails = [
    ['giant', 'Giant', 'giant.png', 5], ['hog-rider', 'Hog Rider', 'hog-rider.png', 4],
    ['musketeer', 'Musketeer', 'musketeer.png', 4], ['mini-pekka', 'Mini P.E.K.K.A', 'mini-pekka.png', 4],
    ['archers', 'Archers', 'archers.png', 3], ['minions', 'Minions', 'minions.png', 3],
    ['bomber', 'Bomber', 'bomber.png', 2], ['arrows', 'Arrows', 'arrows.png', 3],
    ['cannon', 'Cannon', 'cannon.png', 3], ['ice-golem', 'Ice Golem', 'ice-golem.png', 2],
    ['skeletons', 'Skeletons', 'skeletons.png', 1], ['ice-spirit', 'Ice Spirit', 'ice-spirit.png', 1],
    ['fireball', 'Fireball', 'fireball.png', 4], ['the-log', 'The Log', 'the-log.png', 2]
  ].map(([id, name, image, cost]) => ({ id, name, image, cost }));

  function readFavorites() {
    try {
      const value = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
      if (!Array.isArray(value)) return [];
      const validIds = new Set(cardDetails.map(card => card.id));
      return [...new Set(value.filter(id => typeof id === 'string' && validIds.has(id)))];
    } catch (_) {
      return [];
    }
  }

  function writeFavorites(ids) {
    try {
      localStorage.setItem(favoritesKey, JSON.stringify(ids));
      return true;
    } catch (_) {
      announce('Saved cards could not be stored in this browser.');
      return false;
    }
  }

  function announce(message) {
    const status = document.querySelector('#site-status');
    if (status) status.textContent = message;
  }

  function syncFavoriteButtons() {
    const saved = new Set(readFavorites());
    document.querySelectorAll('[data-card-id].favorite-toggle').forEach(button => {
      const active = saved.has(button.dataset.cardId);
      button.setAttribute('aria-pressed', String(active));
      button.textContent = active ? 'Saved ✓' : 'Save card +';
      const card = cardDetails.find(item => item.id === button.dataset.cardId);
      button.setAttribute('aria-label', (active ? 'Remove ' : 'Save ') + (card ? card.name : 'card') + (active ? ' from your saved cards' : ' to your saved cards'));
    });
  }

  function renderSavedCards() {
    const list = document.querySelector('#saved-card-list');
    const empty = document.querySelector('#saved-card-empty');
    const total = document.querySelector('#saved-card-total');
    const saved = readFavorites();
    document.querySelectorAll('.saved-card-count').forEach(el => { el.textContent = String(saved.length); });
    syncFavoriteButtons();
    if (!list || !empty || !total) return;

    const cards = saved.map(id => cardDetails.find(card => card.id === id)).filter(Boolean);
    const fragment = document.createDocumentFragment();
    cards.forEach(card => {
      const item = document.createElement('li');
      item.className = 'saved-card-item';
      const image = document.createElement('img');
      image.src = `assets/cards/${card.image}`;
      image.alt = '';
      image.width = 58;
      image.height = 70;
      const name = document.createElement('strong');
      name.textContent = card.name;
      const cost = document.createElement('span');
      cost.textContent = `${card.cost} elixir`;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'saved-card-remove';
      remove.dataset.removeCardId = card.id;
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove ${card.name} from saved cards`);
      item.append(image, name, cost, remove);
      fragment.append(item);
    });
    list.replaceChildren(fragment);
    total.textContent = `${cards.length} saved ${cards.length === 1 ? 'card' : 'cards'}`;
    empty.hidden = cards.length > 0;
    list.hidden = cards.length === 0;
    const clear = document.querySelector('#clear-saved-cards');
    if (clear) clear.disabled = cards.length === 0;
    syncFavoriteButtons();
  }

  function applyTheme(theme) {
    const selected = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = selected;
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.setAttribute('aria-pressed', String(selected === 'dark'));
      button.setAttribute('aria-label', (active ? 'Remove ' : 'Save ') + (card ? card.name : 'card') + (active ? ' from your saved cards' : ' to your saved cards'));
      button.textContent = selected === 'dark' ? '☀ Light' : '☾ Dark';
    });
  }

  document.addEventListener('click', event => {
    const themeButton = event.target.closest('.theme-toggle');
    if (themeButton) {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(themeKey, next); } catch (_) { announce('Theme changed for this page.'); }
      return;
    }

    const favoriteButton = event.target.closest('.favorite-toggle');
    const removeButton = event.target.closest('[data-remove-card-id]');
    const clearButton = event.target.closest('#clear-saved-cards');
    if (favoriteButton) {
      const id = favoriteButton.dataset.cardId;
      const saved = readFavorites();
      const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
      if (writeFavorites(next)) {
        renderSavedCards();
        announce(next.includes(id) ? 'Card added to your saved collection.' : 'Card removed from your saved collection.');
      }
    } else if (removeButton) {
      writeFavorites(readFavorites().filter(id => id !== removeButton.dataset.removeCardId));
      renderSavedCards();
      announce('Card removed from your saved collection.');
    } else if (clearButton) {
      writeFavorites([]);
      renderSavedCards();
      announce('Saved cards cleared.');
    }
  });

  window.ClashStarter = {
    isCardSaved: id => readFavorites().includes(id),
    renderSavedCards,
    cards: cardDetails
  };

  applyTheme(document.documentElement.dataset.theme || 'light');
  renderSavedCards();
})();
