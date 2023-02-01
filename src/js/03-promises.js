import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formForPromisesGeneration = document.querySelector('.form');
const {elements: { delay, step, amount }} = formForPromisesGeneration;

formForPromisesGeneration.addEventListener('submit', createPromises);

function createPromises(e) {
    e.preventDefault();
    for (let i = 0; i < amount.value; i += 1) {
    let timerDelay = (i * step.value) + Number(delay.value);
    createPromise(i + 1 , timerDelay)
        .then(({ position, delay }) => {
            Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
            Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    };
    e.currentTarget.reset();
}

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldResolve = Math.random() > 0.3;
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}
