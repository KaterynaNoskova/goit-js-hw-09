import {Notify} from '/node_modules/notiflix/build/notiflix-notify-aio';

const totalForm = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

totalForm.form.addEventListener('submit', onClick);

function onClick(evt){
  evt.preventDefault();

  const amountP = parseInt(totalForm.amount.value);
  const delayStep = Number(totalForm.step.value);
  let fistDelay = Number(totalForm.firstDelay.value);

  for (let i = 1; i <= amountP; i += 1) {
    createPromise(i, fistDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

    fistDelay += delayStep;
  }
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};


