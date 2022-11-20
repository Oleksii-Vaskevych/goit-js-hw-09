import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.target;

  console.log(
    `delay: ${delay.value}, step: ${step.value}, position: ${amount.value}`
  );

  for (let i = 0; i < Number(amount.value); i++) {
    createPromise(i + 1, Number(delay.value) + i * Number(step.value));
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        );
      } else {
        reject(Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}

createPromise(2, 1500)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
  });
