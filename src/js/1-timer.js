import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDateTimeEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

let userSelectedDate = '';
let intervalId = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      startBtn.removeAttribute('disabled');
      userSelectedDate = selectedDates[0];
    } else {
      startBtn.setAttribute('disabled', '');
      addErrorMessage();
    }
  },
};

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

flatpickr(inputDateTimeEl, options);

function changeElementDayTimeValue(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  if (!days && !hours && !minutes && !seconds) {
    clearInterval(intervalId);
    inputDateTimeEl.removeAttribute('disabled');
  }

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

function calculateTimeLeft() {
  const currentDateMs = new Date().getTime();
  const selectedDateMS = new Date(userSelectedDate).getTime();
  const ms = selectedDateMS - currentDateMs;
  changeElementDayTimeValue(ms);
}

startBtn.addEventListener('click', startTimer);

function startTimer() {
  intervalId = setInterval(calculateTimeLeft, 1000);
  disableBtn();
  inputDateTimeEl.setAttribute('disabled', '');
}

function addErrorMessage() {
  iziToast.error({
    backgroundColor: 'red',
    message: 'Please choose a date in the future',
    messageColor: 'white',
    messageSize: '20',
    position: 'topRight',
    close: true,
    displayMode: 2,
  });
}
