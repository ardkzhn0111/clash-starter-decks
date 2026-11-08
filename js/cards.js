// The card guide is rendered from data so search, roles and the quiz stay in sync.
const guideCards = [
  { id: 'giant', name: 'Giant', cost: 5, role: 'Tower attacker', roleKey: 'tower attacker', deck: 'Giant Beatdown', image: 'giant.png', description: 'Targets buildings and takes hits for the troops behind him.', tip: 'Place him in front of surviving support troops to begin a counterpush.' },
  { id: 'hog-rider', name: 'Hog Rider', cost: 4, role: 'Tower attacker', roleKey: 'tower attacker', deck: 'Hog 2.6 Cycle', image: 'hog-rider.png', description: 'A fast building-targeting troop for repeated attacks.', tip: 'Send him when you can still afford a defense.' },
  { id: 'musketeer', name: 'Musketeer', cost: 4, role: 'Air & ground support', roleKey: 'support', deck: 'Both decks', image: 'musketeer.png', description: 'A ranged troop that can hit both air and ground targets.', tip: 'Give her space behind a tank and keep her away from melee troops.' },
  { id: 'mini-pekka', name: 'Mini P.E.K.K.A', cost: 4, role: 'Ground support', roleKey: 'support', deck: 'Giant Beatdown', image: 'mini-pekka.png', description: 'Deals high single-target damage to ground troops.', tip: 'Use her to stop a tank, then protect her for a counterpush.' },
  { id: 'archers', name: 'Archers', cost: 3, role: 'Air & ground support', roleKey: 'support', deck: 'Giant Beatdown', image: 'archers.png', description: 'Two ranged troops that can cover air and ground.', tip: 'Split them when you need to defend both lanes.' },
  { id: 'minions', name: 'Minions', cost: 3, role: 'Air swarm', roleKey: 'swarm', deck: 'Giant Beatdown', image: 'minions.png', description: 'A group of flying troops that can defend or support a push.', tip: 'Avoid placing them into a spell that can remove the whole group.' },
  { id: 'bomber', name: 'Bomber', cost: 2, role: 'Ground support', roleKey: 'support', deck: 'Giant Beatdown', image: 'bomber.png', description: 'A low-cost troop with splash damage against ground groups.', tip: 'Keep him behind a tank so he can attack safely.' },
  { id: 'arrows', name: 'Arrows', cost: 3, role: 'Spell', roleKey: 'spell', deck: 'Giant Beatdown', image: 'arrows.png', description: 'A spell that clears groups of small troops.', tip: 'Wait for a useful group of targets before casting.' },
  { id: 'cannon', name: 'Cannon', cost: 3, role: 'Building', roleKey: 'building', deck: 'Hog 2.6 Cycle', image: 'cannon.png', description: 'A central building that can pull ground attackers.', tip: 'Place it near the middle to draw attackers away from your tower.' },
  { id: 'ice-golem', name: 'Ice Golem', cost: 2, role: 'Tank', roleKey: 'tank', deck: 'Hog 2.6 Cycle', image: 'ice-golem.png', description: 'A small tank for distracting and kiting troops.', tip: 'Lead Hog Rider with him when you can still afford a defense.' },
  { id: 'skeletons', name: 'Skeletons', cost: 1, role: 'Cycle', roleKey: 'cycle', deck: 'Hog 2.6 Cycle', image: 'skeletons.png', description: 'A one-elixir distraction that helps cycle the deck.', tip: 'Use them to distract a single target, then cycle with a purpose.' },
  { id: 'ice-spirit', name: 'Ice Spirit', cost: 1, role: 'Cycle', roleKey: 'cycle', deck: 'Hog 2.6 Cycle', image: 'ice-spirit.png', description: 'A cheap cycle card that briefly freezes targets.', tip: 'Time its jump to delay a defender or support a Hog attack.' },
  { id: 'fireball', name: 'Fireball', cost: 4, role: 'Spell', roleKey: 'spell', deck: 'Both decks', image: 'fireball.png', description: 'A medium spell for troops and useful tower value.', tip: 'Look for multiple useful targets before spending four elixir.' },
  { id: 'the-log', name: 'The Log', cost: 2, role: 'Ground spell', roleKey: 'spell', deck: 'Hog 2.6 Cycle', image: 'the-log.png', description: 'A rolling spell that damages and pushes back ground troops.', tip: 'It clears small ground troops, cannot hit air, and is Legendary.' }
];

const cardGrid = document.querySelector('#guide-cards');
const guideSearch = document.querySelector('#guide-search');
const guideRole = document.querySelector('#guide-role');
const guideStats = document.querySelector('#guide-stats');
const guideEmpty = document.querySelector('#guide-empty');

function renderGuideCards() {
  const query = guideSearch.value.trim().toLowerCase();
  const role = guideRole.value;
  const matches = guideCards.filter(function (card) {
    const searchable = `${card.name} ${card.role} ${card.deck} ${card.description} ${card.tip}`.toLowerCase();
    return searchable.includes(query) && (role === 'all' || card.roleKey === role);
  });

  cardGrid.replaceChildren();
  matches.forEach(function (card) {
    const column = document.createElement('div');
    column.className = 'col-md-6 col-lg-4';
    const article = document.createElement('article');
    article.className = 'role-card';
    const top = document.createElement('div');
    top.className = 'role-card-top';
    const imageWrap = document.createElement('div');
    imageWrap.className = 'role-image';
    const cost = document.createElement('span');
    cost.className = 'elixir';
    cost.setAttribute('aria-label', `${card.cost} elixir`);
    cost.textContent = card.cost;
    const image = document.createElement('img');
    image.src = `assets/cards/${card.image}`;
    image.alt = `${card.name} card`;
    image.width = 150;
    image.height = 180;
    image.loading = 'lazy';
    imageWrap.append(cost, image);
    const identity = document.createElement('div');
    const badge = document.createElement('span');
    badge.className = 'badge rounded-pill';
    badge.textContent = card.role;
    const title = document.createElement('h3');
    title.textContent = card.name;
    identity.append(badge, title);
    top.append(imageWrap, identity);
    const description = document.createElement('p');
    description.textContent = card.description;
    const tip = document.createElement('p');
    tip.className = 'role-tip';
    const lead = document.createElement('strong');
    lead.textContent = 'Try this: ';
    tip.append(lead, document.createTextNode(card.tip));
    const deck = document.createElement('p');
    deck.className = 'role-deck';
    deck.textContent = card.deck;
    article.append(top, description, tip, deck);
    column.append(article);
    cardGrid.append(column);
  });

  const average = matches.length
    ? (matches.reduce((sum, card) => sum + card.cost, 0) / matches.length).toFixed(1)
    : '—';
  guideStats.textContent = `Showing ${matches.length} of ${guideCards.length} cards · Average cost: ${average} elixir`;
  guideEmpty.hidden = matches.length !== 0;
  cardGrid.hidden = matches.length === 0;
}

guideSearch.addEventListener('input', renderGuideCards);
guideRole.addEventListener('change', renderGuideCards);
renderGuideCards();

const quizQuestions = [
  { question: 'Which card is the main building-targeting attacker in Giant Beatdown?', options: ['Giant', 'Bomber', 'Archers'], answer: 0, explanation: 'Giant targets buildings and takes hits for support troops.' },
  { question: 'Which card can hit both air and ground troops from range?', options: ['Cannon', 'Musketeer', 'The Log'], answer: 1, explanation: 'Musketeer provides ranged air and ground support.' },
  { question: 'What is Cannon mainly used for in Hog 2.6?', options: ['Pulling ground attackers toward the middle', 'Attacking the tower', 'Clearing air swarms'], answer: 0, explanation: 'Cannon is a defensive building that can pull ground attackers.' },
  { question: 'Which Hog 2.6 card briefly freezes targets?', options: ['Skeletons', 'Ice Spirit', 'Ice Golem'], answer: 1, explanation: 'Ice Spirit is a one-elixir cycle card that briefly freezes targets.' },
  { question: 'Which spell rolls along the ground and pushes back ground troops?', options: ['Fireball', 'Arrows', 'The Log'], answer: 2, explanation: 'The Log damages and pushes back ground troops, but cannot hit air.' }
];

const quizForm = document.querySelector('#card-quiz');
const quizResult = document.querySelector('#quiz-result');
const quizError = document.querySelector('#quiz-error');
const quizTitle = document.querySelector('#quiz-result-title');
const quizFeedback = document.querySelector('#quiz-feedback');

quizQuestions.forEach(function (item, index) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'quiz-question';
  const legend = document.createElement('legend');
  legend.textContent = `${index + 1}. ${item.question}`;
  fieldset.append(legend);
  item.options.forEach(function (option, optionIndex) {
    const label = document.createElement('label');
    label.className = 'quiz-option';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question-${index}`;
    input.value = optionIndex;
    const text = document.createElement('span');
    text.textContent = option;
    label.append(input, text);
    fieldset.append(label);
  });
  quizForm.append(fieldset);
});

quizForm.addEventListener('change', function () {
  if (quizQuestions.every((_, index) => quizForm.querySelector(`input[name="question-${index}"]:checked`))) {
    quizError.hidden = true;
  }
});

quizForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const answers = quizQuestions.map((_, index) => quizForm.querySelector(`input[name="question-${index}"]:checked`));
  if (answers.some(answer => !answer)) {
    quizError.hidden = false;
    quizForm.querySelector('input:not(:checked)')?.focus();
    return;
  }

  let score = 0;
  quizFeedback.replaceChildren();
  quizQuestions.forEach(function (item, index) {
    const correct = Number(answers[index].value) === item.answer;
    if (correct) score += 1;
    const feedback = document.createElement('li');
    feedback.className = correct ? 'quiz-correct' : 'quiz-incorrect';
    feedback.textContent = `${correct ? 'Correct.' : `Not quite. The answer is ${item.options[item.answer]}.`} ${item.explanation}`;
    quizFeedback.append(feedback);
  });
  quizTitle.textContent = `${score} out of ${quizQuestions.length} correct`;
  quizError.hidden = true;
  const effectSpeed = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220;
  window.jQuery(quizResult).stop(true, true).hide().prop('hidden', false).slideDown(effectSpeed);
  quizTitle.focus();
});

quizForm.addEventListener('reset', function () {
  quizError.hidden = true;
  window.jQuery(quizResult).stop(true, true).slideUp(160, function () {
    quizResult.hidden = true;
  });
});
