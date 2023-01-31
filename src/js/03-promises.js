import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formForPromiseGeneration = document.querySelector('.form');
const {elements: { delay, step, amount }} = formForPromiseGeneration;

formForPromiseGeneration.addEventListener('submit', createPromises);

function createPromises(e) {
    e.preventDefault();
    for (let i = 0; i < amount.value; i += 1) {
    let timerDelay = (i * step.value) + Number(delay.value);
    createPromise(i + 1, timerDelay);
    }
}

function createPromise(position, delay) {
    setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        } else {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }
    }, delay);
}
