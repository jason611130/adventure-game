const scenes = [...document.querySelectorAll('.scene')];
const progressBar = document.querySelector('#progressBar');
const progressText = document.querySelector('#progressText');
const arrivedBtn = document.querySelector('#arrivedBtn');
const nameForm = document.querySelector('#nameForm');
const recipientName = document.querySelector('#recipientName');
const formMessage = document.querySelector('#formMessage');
const successCard = document.querySelector('#successCard');
const finishBtn = document.querySelector('#finishBtn');

function showScene(id, step) {
  scenes.forEach((scene) => {
    const active = scene.id === id;
    scene.hidden = !active;
    scene.classList.toggle('is-active', active);
  });

  const progress = step === 4 ? 100 : (step / 3) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = step === 4 ? '03 / 03' : `0${step} / 03`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelector('[data-next="step2"]').addEventListener('click', () => showScene('step2', 2));

arrivedBtn.addEventListener('click', () => showScene('step3', 3));

function validateRecipient(showError = false) {
  const answer = recipientName.value.normalize('NFC').replace(/\s+/g, '');

  if (!answer) {
    formMessage.textContent = showError ? '請先輸入收件人姓名。' : '';
    successCard.hidden = true;
    finishBtn.hidden = true;
    return false;
  }

  if (answer === '林品禕') {
    formMessage.textContent = '';
    recipientName.setAttribute('aria-invalid', 'false');
    successCard.hidden = false;
    finishBtn.hidden = false;
    return true;
  } else {
    recipientName.setAttribute('aria-invalid', showError ? 'true' : 'false');
    successCard.hidden = true;
    finishBtn.hidden = true;
    formMessage.textContent = showError ? '姓名不正確，請確認後再試一次。' : '';
    return false;
  }
}

nameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validateRecipient(true)) {
    finishBtn.focus();
  } else {
    recipientName.focus();
  }
});

recipientName.addEventListener('input', () => {
  validateRecipient(false);
});

finishBtn.addEventListener('click', () => showScene('finale', 4));
