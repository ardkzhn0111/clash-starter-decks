const requestForm = document.querySelector('#deck-request-form');
const requestSuccess = document.querySelector('#request-success');
const requestSuccessCopy = document.querySelector('#request-success-copy');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const effectDuration = prefersReducedMotion.matches ? 0 : 180;

function showRequestError(input, message) {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  return !message;
}

function validateRequestField(input) {
  const value = input.value.trim();
  let message = '';

  if (!value) {
    message = 'Please complete this field.';
  } else if (input.name === 'name' && value.length < 2) {
    message = 'Enter at least two characters.';
  } else if (input.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    message = 'Enter an email address such as player@example.com.';
  } else if (input.name === 'arena' && (!Number.isInteger(Number(value)) || Number(value) < 1 || Number(value) > 28)) {
    message = 'Enter a whole arena number from 1 to 28.';
  } else if (input.name === 'goal' && value.length < 20) {
    message = 'Add at least 20 characters so your goal is clear.';
  }

  return showRequestError(input, message);
}

requestForm.querySelectorAll('.request-input').forEach(function (input) {
  input.addEventListener('input', function () {
    if (input.getAttribute('aria-invalid') === 'true') validateRequestField(input);
  });
  input.addEventListener('change', function () {
    if (input.getAttribute('aria-invalid') === 'true') validateRequestField(input);
  });
});

requestForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const inputs = Array.from(requestForm.querySelectorAll('.request-input'));
  const isValid = inputs.map(validateRequestField).every(Boolean);

  if (!isValid) {
    const firstInvalid = requestForm.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    requestSuccess.hidden = true;
    return;
  }

  const formData = new FormData(requestForm);
  const playstyle = {
    steady: 'Giant Beatdown is a useful first deck to explore.',
    fast: 'Hog 2.6 offers a faster cycle to practice.',
    unsure: 'Compare both playstyles and choose the one that feels clearer.'
  }[formData.get('playstyle')];
  requestSuccessCopy.textContent = `${formData.get('name').trim()}, your Arena ${formData.get('arena')} goal is saved for this session. ${playstyle} Your note stays on this page; nothing has been sent.`;
  requestForm.reset();
  inputs.forEach(function (input) { showRequestError(input, ''); });
  requestSuccess.hidden = false;

  if (window.jQuery) {
    window.jQuery(requestSuccess).stop(true, true).hide().slideDown(effectDuration, function () {
      requestSuccess.focus();
    });
  } else {
    requestSuccess.focus();
  }
});

document.querySelectorAll('.faq-trigger').forEach(function (trigger) {
  trigger.addEventListener('click', function () {
    const shouldOpen = trigger.getAttribute('aria-expanded') !== 'true';
    const answer = document.getElementById(trigger.getAttribute('aria-controls'));

    document.querySelectorAll('.faq-trigger').forEach(function (otherTrigger) {
      const otherAnswer = document.getElementById(otherTrigger.getAttribute('aria-controls'));
      const isCurrent = otherTrigger === trigger;
      const expanded = isCurrent ? shouldOpen : false;
      otherTrigger.setAttribute('aria-expanded', String(expanded));

      if (window.jQuery) {
        const $answer = window.jQuery(otherAnswer).stop(true, true);
        if (expanded) {
          otherAnswer.hidden = false;
          $answer.hide().slideDown(effectDuration);
        } else if (!otherAnswer.hidden) {
          $answer.slideUp(effectDuration, function () { otherAnswer.hidden = true; });
        }
      } else {
        otherAnswer.hidden = !expanded;
      }
    });

    if (shouldOpen) answer.hidden = false;
  });
});
