// Practice notes remain in this browser and are never sent to a server.
const journalForm = document.querySelector('#journal-form');
const journalMessage = document.querySelector('#journal-message');
const journalList = document.querySelector('#journal-entries');
const journalEmpty = document.querySelector('#journal-empty');
const journalDate = document.querySelector('#journal-date');
const journalStorageKey = 'clashStarter.practiceJournal.v1';
const deckNames = { giant: 'Giant Beatdown', hog: 'Hog 2.6 Cycle' };
const focusNames = { defense: 'Defend before attacking', elixir: 'Manage elixir', attack: 'Build a better attack' };
const resultNames = { win: 'Win', draw: 'Draw', loss: 'Loss', 'no-match': 'No match played' };
const validationRules = {
  date: 'Choose today or an earlier date.',
  deck: 'Choose one of the two beginner decks.',
  focus: 'Choose one practice focus.',
  minutes: 'Enter a whole number from 1 to 60.',
  result: 'Choose the match result or “No match played”.',
  note: 'Write a specific lesson in 10 to 300 characters.'
};

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

journalDate.max = localDateString();
journalDate.value = localDateString();

function validEntry(entry) {
  return entry && typeof entry.id === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(entry.date)
    && Object.hasOwn(deckNames, entry.deck) && Object.hasOwn(focusNames, entry.focus)
    && Number.isInteger(entry.minutes) && entry.minutes >= 1 && entry.minutes <= 60
    && Object.hasOwn(resultNames, entry.result) && typeof entry.note === 'string'
    && entry.note.length >= 10 && entry.note.length <= 300;
}

function readEntries() {
  try {
    const stored = window.localStorage.getItem(journalStorageKey);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter(validEntry) : [];
  } catch (_error) {
    return [];
  }
}

let journalEntries = readEntries();

function persistEntries() {
  try {
    window.localStorage.setItem(journalStorageKey, JSON.stringify(journalEntries));
    return true;
  } catch (_error) {
    return false;
  }
}

function getJournalValues() {
  return {
    date: journalForm.elements.date.value,
    deck: journalForm.elements.deck.value,
    focus: journalForm.elements.focus.value,
    minutes: journalForm.elements.minutes.value,
    result: journalForm.elements.result.value,
    note: journalForm.elements.note.value.trim()
  };
}

function validateJournal(values) {
  const errors = {};
  if (!values.date || values.date > localDateString()) errors.date = validationRules.date;
  if (!Object.hasOwn(deckNames, values.deck)) errors.deck = validationRules.deck;
  if (!Object.hasOwn(focusNames, values.focus)) errors.focus = validationRules.focus;
  const minutes = Number(values.minutes);
  if (!values.minutes || !Number.isInteger(minutes) || minutes < 1 || minutes > 60) errors.minutes = validationRules.minutes;
  if (!Object.hasOwn(resultNames, values.result)) errors.result = validationRules.result;
  if (values.note.length < 10 || values.note.length > 300) errors.note = validationRules.note;
  return errors;
}

function showFieldError(name, message) {
  const field = journalForm.elements[name];
  const error = journalForm.querySelector(`[data-error-for="${name}"]`);
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  error.textContent = message || '';
}

function showJournalMessage(message, isError = false) {
  journalMessage.textContent = message;
  journalMessage.classList.toggle('is-error', isError);
  journalMessage.hidden = false;
  const speed = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180;
  window.jQuery(journalMessage).stop(true, true).hide().prop('hidden', false).fadeIn(speed).delay(2600).fadeOut(speed, function () {
    journalMessage.hidden = true;
  });
}

function renderJournal() {
  journalEntries.sort((left, right) => right.date.localeCompare(left.date) || right.id.localeCompare(left.id));
  journalList.replaceChildren();
  journalEntries.forEach(function (entry) {
    const item = document.createElement('li');
    item.className = 'journal-entry';
    item.dataset.entryId = entry.id;
    const header = document.createElement('div');
    header.className = 'journal-entry-header';
    const title = document.createElement('h3');
    const readableDate = new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(`${entry.date}T12:00:00`));
    title.textContent = `${deckNames[entry.deck]} · ${readableDate}`;
    const removeButton = document.createElement('button');
    removeButton.className = 'journal-delete';
    removeButton.type = 'button';
    removeButton.textContent = 'Delete';
    removeButton.setAttribute('aria-label', `Delete session from ${readableDate}`);
    removeButton.addEventListener('click', function () {
      journalEntries = journalEntries.filter(record => record.id !== entry.id);
      const saved = persistEntries();
      renderJournal();
      showJournalMessage(saved ? 'Session removed from this browser.' : 'The session was removed from this view, but browser storage could not be updated.', !saved);
    });
    header.append(title, removeButton);
    const metadata = document.createElement('p');
    metadata.className = 'journal-entry-meta';
    metadata.textContent = `${focusNames[entry.focus]} · ${entry.minutes} min · ${resultNames[entry.result]}`;
    const note = document.createElement('p');
    note.className = 'journal-entry-note';
    note.textContent = entry.note;
    item.append(header, metadata, note);
    journalList.append(item);
  });

  const count = journalEntries.length;
  const minutes = journalEntries.reduce((sum, entry) => sum + entry.minutes, 0);
  const played = journalEntries.filter(entry => ['win', 'draw', 'loss'].includes(entry.result));
  const wins = played.filter(entry => entry.result === 'win').length;
  document.querySelector('#journal-count').textContent = count;
  document.querySelector('#journal-minutes-total').textContent = minutes;
  document.querySelector('#journal-win-rate').textContent = played.length ? `${Math.round((wins / played.length) * 100)}%` : '—';
  journalEmpty.hidden = count > 0;
  journalList.hidden = count === 0;
}

journalForm.addEventListener('input', function (event) {
  const name = event.target.name;
  if (!validationRules[name]) return;
  const errors = validateJournal(getJournalValues());
  showFieldError(name, errors[name] || '');
});

journalForm.addEventListener('change', function (event) {
  const name = event.target.name;
  if (!validationRules[name]) return;
  const errors = validateJournal(getJournalValues());
  showFieldError(name, errors[name] || '');
});

journalForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const values = getJournalValues();
  const errors = validateJournal(values);
  Object.keys(validationRules).forEach(name => showFieldError(name, errors[name] || ''));
  const firstInvalid = Object.keys(validationRules).find(name => errors[name]);
  if (firstInvalid) {
    journalForm.elements[firstInvalid].focus();
    return;
  }

  const entry = {
    id: window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date: values.date,
    deck: values.deck,
    focus: values.focus,
    minutes: Number(values.minutes),
    result: values.result,
    note: values.note
  };
  journalEntries.unshift(entry);
  const saved = persistEntries();
  renderJournal();
  const newest = journalList.firstElementChild;
  if (newest) {
    const speed = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220;
    window.jQuery(newest).stop(true, true).hide().slideDown(speed);
  }
  journalForm.reset();
  journalDate.value = localDateString();
  Object.keys(validationRules).forEach(name => showFieldError(name, ''));
  showJournalMessage(saved ? 'Session saved in this browser.' : 'Session added to this view, but browser storage is unavailable. It may disappear when you close this page.', !saved);
});

renderJournal();
