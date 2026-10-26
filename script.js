const scenes = [...document.querySelectorAll('.scene')];
const progressBar = document.querySelector('#progressBar');
const progressText = document.querySelector('#progressText');
const arrivedBtn = document.querySelector('#arrivedBtn');
const nameForm = document.querySelector('#nameForm');
const recipientName = document.querySelector('#recipientName');
const formMessage = document.querySelector('#formMessage');
const successCard = document.querySelector('#successCard');
const finishBtn = document.querySelector('#finishBtn');
const arrivalDialog = document.querySelector('#arrivalDialog');
const confirmMessage = document.querySelector('#confirmMessage');
const confirmArrivalBtn = document.querySelector('#confirmArrivalBtn');
const cancelArrivalBtn = document.querySelector('#cancelArrivalBtn');
const arrivalConfirmations = [
  '你確定你到了嗎',
  '我覺得你在騙我',
  '你真的到了嗎',
];
let arrivalConfirmationIndex = 0;

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

function showArrivalConfirmation() {
  confirmMessage.textContent = arrivalConfirmations[arrivalConfirmationIndex];
  arrivalDialog.hidden = false;
  document.body.classList.add('dialog-open');
  confirmArrivalBtn.focus();
}

function closeArrivalConfirmation() {
  arrivalDialog.hidden = true;
  document.body.classList.remove('dialog-open');
}

arrivedBtn.addEventListener('click', () => {
  arrivalConfirmationIndex = 0;
  showArrivalConfirmation();
});

confirmArrivalBtn.addEventListener('click', () => {
  arrivalConfirmationIndex += 1;

  if (arrivalConfirmationIndex === arrivalConfirmations.length) {
    closeArrivalConfirmation();
    showScene('step3', 3);
    return;
  }

  showArrivalConfirmation();
});

cancelArrivalBtn.addEventListener('click', () => {
  closeArrivalConfirmation();
  arrivedBtn.focus();
});

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
