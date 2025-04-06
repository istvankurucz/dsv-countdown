// #region Functions
function calculateCountdownValues(diff) {
	const seconds = Math.floor(diff / 1000) % 60;
	const minutes = Math.floor(diff / (1000 * 60)) % 60;
	const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
	const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 7;
	const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

	return { weeks, days, hours, minutes, seconds };
}

function formatTwoDigits(value) {
	return value.toString().padStart(2, "0");
}

function formatCountdownValues({ weeks, days, hours, minutes, seconds }) {
	return {
		weeks: weeks.toString(),
		days: days.toString(),
		hours: formatTwoDigits(hours),
		minutes: formatTwoDigits(minutes),
		seconds: formatTwoDigits(seconds),
	};
}

function updateCountdownValues({ weeks, days, hours, minutes, seconds }) {
	weeksElement.textContent = weeks;
	daysElement.textContent = days;
	hoursElement.textContent = hours;
	minutesElement.textContent = minutes;
	secondsElement.textContent = seconds;
}
//#endregion

//#region DOM elements
const weeksElement = document.querySelector(".box--weeks .box__value");
const daysElement = document.querySelector(".box--days .box__value");
const hoursElement = document.querySelector(".box--hours .box__value");
const minutesElement = document.querySelector(".box--minutes .box__value");
const secondsElement = document.querySelector(".box--seconds .box__value");
const celebrationElement = document.querySelector(".celebration__p");
//#endregion

// #region Main
const goalDate = new Date(2025, 3, 14, 8, 0, 0);

const intervalId = setInterval(() => {
	// Get diff
	const now = new Date();
	const diff = goalDate.getTime() - now.getTime();

	if (diff <= 0) {
		updateCountdownValues({ weeks: "0", days: "0", hours: "00", minutes: "00", seconds: "00" });
		celebrationElement.classList.add("celebration__p--show");
		clearInterval(intervalId);
		return;
	}

	// Calculate values
	const values = calculateCountdownValues(diff);
	const formattedValues = formatCountdownValues(values);

	// Update DOM elements
	updateCountdownValues(formattedValues);
}, 1000);
//#endregion
