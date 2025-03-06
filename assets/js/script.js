let searchInput = document.querySelector(".search__input");
let searchBtn = document.querySelector(".search__btn");
let positionName = document.querySelector(".position__name");
let daytimeDetail = document.querySelector(".daytime__detail");
let temperatureNumber = document.querySelector(".temperature__number");
let windDesc = document.querySelector(".wind__desc");
let visibilityNumber = document.querySelector(".visibility__number");
let windNumber = document.querySelector(".wind__number");
let sunriseNumber = document.querySelector(".sunrise__number");
let weatherDetail = document.querySelector(".weather__detail");
let contentTemperature = document.querySelector(".content__temperature");
let body = document.querySelector("body");

async function changeWeather() {
	let value = searchInput.value;
	if (!value) {
		return;
	}
	searchInput.value = "";
	body.removeAttribute("class");
	let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=044880fc94ab5598bbe2075b6016d119`;
	let res = await fetch(urlApi);
	let data = await res.json();

	if (data.cod == 200) {
		weatherDetail.classList.remove("hide");
		contentTemperature.classList.remove("hide");
		weatherDetail.classList.add("display");
		contentTemperature.classList.add("display");
		positionName.innerHTML = `${data.name}, <strong>${data.sys.country}</strong>`;
		let daytime = new Date().toLocaleString("en-US", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			timeZone: "Asia/Ho_Chi_Minh",
			hour12: true,
		});
		let temp = Math.round(data.main.temp - 273.15);
		daytimeDetail.innerHTML = daytime;
		temperatureNumber.innerHTML = `${
			temp < 10 ? "0" + temp : temp
		}&nbsp;<span><sup>o</sup>C</span>`; //`${Math.round(data.main.temp - 273.15)} &nbsp;<sup>o</sup>C`;
		if (temp < 20 && daytime.includes("AM")) {
			body.classList.add("cold-day");
		} else if (temp < 20 && daytime.includes("PM")) {
			body.classList.add("cold-night");
		} else if (temp > 20 && daytime.includes("AM")) {
			body.classList.add("hot-day");
		} else if (temp > 20 && daytime.includes("PM")) {
			body.classList.add("hot-night");
		}
		windDesc.innerHTML = titleCase(data.weather[0].description);
		visibilityNumber.innerHTML = `${data.visibility} <span>(m)</span>`;
		windNumber.innerHTML = `${data.wind.speed} <span>(m/s)</span>`;
		sunriseNumber.innerHTML = `${data.main.humidity} <span>(%)</span>`;
	} else {
		positionName.innerHTML = `Không tìm thấy thành phố`;
		daytimeDetail.innerHTML = "";
		temperatureNumber.innerHTML = "";
		windDesc.innerHTML = "";
		visibilityNumber.innerHTML = "";
		windNumber.innerHTML = "";
		sunriseNumber.innerHTML = "";
		weatherDetail.classList.add("hide");
		contentTemperature.classList.add("hide");
		weatherDetail.classList.remove("display");
		contentTemperature.classList.remove("display");
	}
}
function titleCase(str) {
	var splitStr = str.toLowerCase().split(" ");
	for (var i = 0; i < splitStr.length; i++) {
		splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
	}
	return splitStr.join(" ");
}

searchBtn.addEventListener("click", changeWeather);
searchInput.addEventListener("keydown", function (e) {
	if (e.key == "Enter") {
		changeWeather();
	}
});

window.onload = async function () {
	urlApi = `https://api.openweathermap.org/data/2.5/weather?q=Ho Chi Minh&appid=044880fc94ab5598bbe2075b6016d119`;
	let res = await fetch(urlApi);
	let data = await res.json();

	positionName.innerHTML = `${data.name}, <strong>${data.sys.country}</strong>`;
	daytimeDetail.innerHTML = new Date().toLocaleString("en-US", {
		timeZone: "Asia/Ho_Chi_Minh",
		hour12: true,
	});
	let temp = Math.round(data.main.temp - 273.15);
	temperatureNumber.innerHTML = `${temp < 10 ? "0" + temp : temp}&nbsp;<span><sup>o</sup>C</span>`;
	windDesc.innerHTML = titleCase(data.weather[0].description);
	visibilityNumber.innerHTML = `${data.visibility} <span>(m)</span>`;
	windNumber.innerHTML = `${data.wind.speed} <span>(m/s)</span>`;
	sunriseNumber.innerHTML = `${data.main.humidity} <span>(%)</span>`;
};
