
let searchBtn = document.getElementById('search-btn');
let searchText = document.getElementById('search');
let city = document.getElementById('city');
let cloudName = document.getElementById('cloud-name');
let cloudDesc = document.getElementById('cloud-desc');
let degrees = document.getElementById('degrees');
let wind = document.getElementById('wind');
let humidity = document.getElementById('humidity');
let cloudSituation = document.getElementById('cloud-situation');
let resultContainer = document.getElementById('result');

async function getWeatherForecast(cityName){
    let API_URL= `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=[ADD_KEY]`;
    resultContainer.classList.add("result-container-display");
    try {
        const response = await fetch(API_URL);
        weatherResult = await response.json();
        showResult();
    } catch(error) {
        console.log(error);
    }
};

searchBtn.addEventListener('click', () => fireResult());

searchText.addEventListener('keydown', (e) => {
    let key = e.keyCode || e.key;
    if(key === 13) fireResult();
})

function fireResult() {
    cityName = searchText.value;
    getWeatherForecast(cityName);
    searchText.value = "";
}

function showResult() {
    if (weatherResult.name.toString !== "undefined") {
        resultContainer.style.display = "block";
        resultContainer.classList.add("result-container-display");
        city.innerText = "Weather in " + weatherResult.name;
        let newTemp = Math.round(kelToCel(weatherResult.main.temp));
        degrees.innerText = newTemp;
        wind.innerText = "Wind: " + weatherResult.wind.speed + 'm/h';
        humidity.innerText = "Humidity: " + weatherResult.main.humidity + "%";
        loadWeatherSky(weatherResult.weather[0].main);
        cloudName.innerText = weatherResult.weather[0].main;
        cloudDesc.innerText = weatherResult.weather[0].description;
    } else {
        resultContainer.classList.remove("result-container-display");
    }
}

function kelToCel(k) {
    return c = (k - 273.15);
}

function loadWeatherSky(skyTitle) {
    cloudSituation.innerHTML = eval(skyTitle.toString().toLowerCase());
}
