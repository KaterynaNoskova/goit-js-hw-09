import flatpickr from "/node_modules/flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';


const startBtn = document.querySelector('[data-start]');
const picker = document.querySelector('#datetime-picker');
const timerTotal = {
    timerDays: document.querySelector('span[data-days]'),
    timerHours: document.querySelector('span[data-hours]'),
    timerMinutes: document.querySelector('span[data-minutes]'),
    timerSeconds: document.querySelector('span[data-seconds]'),
};

picker.value = '';

picker.setAttribute('placeholder', 'Choose your date');

startBtn.setAttribute('disable', 'disable');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: null,
    minuteIncrement: 1,
        onClose(selectedDates) {
        console.log(selectedDates[0]);
        const currentTime = Date.now();
        if (selectedDates[0].getTime<currentTime){
            Report.warning('Check a date! Please, choose a date in the future!');
        } else {
            startBtn.removeAttribute('disable');
        }
        },
};

flatpickr('#datetime-picker', options);

function getConversionMs(ms){
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms/day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return {days, hours, minutes, seconds};
};

function conversionInString(value){
    return String(value).padStart(2, '0');
};

startBtn.addEventListener("click", onClick);

let counter = null;

function onClick(){
    counter = setInterval(newCounter, 1000);
    function newCounter (){
        let inputDate = new Date(picker.value);
        const currentDate = Date.now();
        const needsTime = inputDate.getTime() - currentDate;
      const { days, hours, minutes, seconds } = getConversionMs(needsTime);
        timerTotal.timerMinutes.textContent = minutes;
      timerTotal.timerSeconds.textContent = seconds;
      timerTotal.timerDays.textContent = conversionInString(days);
    timerTotal.timerHours.textContent = conversionInString(hours);
    timerTotal.timerMinutes.textContent = conversionInString(minutes);
    timerTotal.timerSeconds.textContent = conversionInString(seconds);
    };
};