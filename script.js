const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loading');
const weatherResult = document.getElementById('weatherResult');
const errorDiv = document.getElementById('error');

searchBtn.addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;

    // Show the spinner
    loadingSpinner.style.display = 'block';
    weatherResult.style.display = 'none';
    errorDiv.style.display = 'none';

    // Fetch details from API
    fetchWeather(city)
        .then(data => {
            // Populate the weather results
            const temperatureC = (data.main.temp - 273.15).toFixed(2); 
            document.getElementById('cityName').innerText = data.name;
            document.getElementById('temperature').innerText = temperatureC;
            document.getElementById('weather').innerText = data.weather[0].description;
            document.getElementById('humidity').innerText = data.main.humidity;
            document.getElementById('wind').innerText = data.wind.speed;

            updateBackgroundColor(temperatureC);

            weatherResult.style.display = 'block';
        })
        .catch(err => {
            // Handle display of error message
            errorDiv.style.display = 'block';
        })
        .finally(() => {
            // Stop spinner
            loadingSpinner.style.display = 'none';
        });
});

function fetchWeather(city) {
    const apiKey = '371205a58b94e46ac9127277a4a9d75d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        });
}

function updateBackgroundColor(temperature) {
    const tempValue = parseFloat(temperature);
    let backgroundColor;

    if (tempValue <= 0) {
        backgroundColor = '#a0d5e8'; 
    } else if (tempValue > 0 && tempValue <= 20) {
        backgroundColor = '#ffd700'; 
    } else if (tempValue > 0 && tempValue <= 30){
        backgroundColor = '#ff7f50'; 
    } else{
        backgroundColor = '#f50928';
    }

    weatherResult.style.backgroundColor = backgroundColor;
}