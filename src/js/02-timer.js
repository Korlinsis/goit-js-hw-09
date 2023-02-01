import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTime = document.getElementById('datetime-picker');
const startButton = document.querySelector('button');
const daysElement = document.querySelector('.value[data-days]');
const hoursElement = document.querySelector('.value[data-hours]');
const minutesElement = document.querySelector('.value[data-minutes]');
const secondsElement = document.querySelector('.value[data-seconds]');
let selectDate = 0;
let intervalId = null;
let isActive = false;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {
            startButton.disabled = true;
            return Notify.failure('Please choose a date in the future!');
        }
        Notify.success(`Selected date ${selectedDates[0]}!`);
        startButton.disabled = false;
        selectDate = selectedDates[0].getTime();
    },
};

flatpickr(dateTime, options);
startButton.disabled = true;
startButton.addEventListener('click', startTimer);

function startTimer() {
    if (isActive) return;
    isActive = true;

    intervalId = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(selectDate - Date.now());
        daysElement.textContent = addLeadingZero(days);
        hoursElement.textContent = addLeadingZero(hours);
        minutesElement.textContent = addLeadingZero(minutes);
        secondsElement.textContent = addLeadingZero(seconds);
        if (selectDate < Date.now()) {
            clearInterval(intervalId);
            isActive = false;
            startButton.disabled = true;
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            Notify.warning('Time is over!');
        }
    }, 1000);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  }