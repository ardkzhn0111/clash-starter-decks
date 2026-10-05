// The planner runs locally. It does not store or send form data.
const form = document.querySelector('#practice-form');
const result = document.querySelector('#plan-result');
const title = document.querySelector('#result-title');
const summary = document.querySelector('#plan-summary');
const steps = document.querySelector('#plan-steps');
const status = document.querySelector('#plan-status');

const decks = {
  giant: {
    name: 'Giant Beatdown',
    prepare: 'Identify Giant as your tower attacker, Musketeer as air support and Mini P.E.K.K.A as ground defense.',
    defense: 'Defend with suitable support troops first. When they survive, place Giant in front to begin a counterpush.',
    elixir: 'Avoid adding every support troop behind Giant. Before committing, choose a card you can still afford for defense.',
    attack: 'Build one supported Giant push after a defense. Keep your support behind him and use a spell only for a useful target.'
  },
  hog: {
    name: 'Hog 2.6 Cycle',
    prepare: 'Locate Hog Rider, Cannon and Musketeer. Review what Skeletons and Ice Spirit can distract or delay.',
    defense: 'Practice pulling a ground attacker toward Cannon in the middle. Support the defense with Musketeer or a cheap distraction as needed.',
    elixir: 'Before sending Hog, check whether you can still defend. Use cheap cards for a purpose instead of cycling them without a target.',
    attack: 'Try a small Hog attack when you have room to defend. Notice the opponent’s response before choosing your next attack.'
  }
};

const goals = {
  defense: { name: 'Defend before attacking', review: 'Find one defense in your replay. Was your placement early enough, and which troops survived?' },
  elixir: { name: 'Manage elixir', review: 'Find one moment when you ran short of elixir. Which earlier card could you have saved?' },
  attack: { name: 'Build a better attack', review: 'Find one attack in your replay. Did you support it for a clear reason, and could you still defend afterward?' }
};

// Each time budget adds up to the selected session length.
const timings = { '10': [2, 6, 2], '20': [3, 13, 4], '30': [5, 20, 5] };

form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const deck = decks[data.get('deck')];
  const goalKey = data.get('goal');
  const goal = goals[goalKey];
  const minutes = data.get('minutes');
  const timing = timings[minutes];
  if (!deck || !goal || !timing) return;

  title.textContent = `${minutes} minutes with ${deck.name}`;
  summary.textContent = `Your focus: ${goal.name}. Keep the same deck for this session.`;
  steps.replaceChildren();

  const stages = [
    { name: 'Prepare', text: deck.prepare },
    { name: 'Practice', text: deck[goalKey] },
    { name: 'Review', text: goal.review }
  ];

  stages.forEach(function (stage, index) {
    const item = document.createElement('li');
    const number = document.createElement('span');
    const content = document.createElement('div');
    const heading = document.createElement('h3');
    const paragraph = document.createElement('p');
    number.textContent = `0${index + 1}`;
    heading.textContent = `${stage.name} · ${timing[index]} min`;
    paragraph.textContent = stage.text;
    content.append(heading, paragraph);
    item.append(number, content);
    steps.append(item);
  });

  result.hidden = false;
  status.textContent = 'Your practice plan is ready below the form.';
  title.focus();
});

form.addEventListener('reset', function () {
  result.hidden = true;
  steps.replaceChildren();
  summary.textContent = '';
  status.textContent = 'Plan cleared. Choose your next session.';
});
