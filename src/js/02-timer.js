import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const TIME_DELAY = 1000;
const refs = {
  input: document.getElementById('datetime-picker'),
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
  },

  onClose(selectedDates) {
    const dfTime = options.defaultDate.getTime();
    const futureTime = selectedDates[0].getTime();
    if (dfTime - futureTime >= 0) {
      console.log('onClose ~ dfTime - futureTime', dfTime - futureTime);
      this.isActive = false;
      refs.button.disabled = true;
      Notify.warning('Please choose a date in the future');
      return;
    }
    console.log(selectedDates[0]);
    refs.button.disabled = false;

    const setIntId = setInterval(() => {
      const deltaTime = futureTime - Date.now();
      console.log('dfTime', dfTime);

      const time = convertMs(deltaTime);
      refs.input.disabled = true;
      updateClockface(time);

      if (deltaTime < 1000) {
        clearInterval(setIntId);
      }

      console.log(time);
    }, TIME_DELAY);
  },
};

// refs.input.addEventListener('input', onInput);
refs.button.addEventListener('click', onClickBtn);

refs.button.disabled = true;

flatpickr(refs.input, options);

// function onInput(event) {}

function onClickBtn() {
  options.start();

  Notify.success('Go-Go-Go');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
