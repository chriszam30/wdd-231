// OpenWeatherMap API configuration
const API_KEY = '6ae878cafb54290ea13c5939515a5320'; 
const LAT = -1.0333; // Quevedo latitude
const LON = -79.4667; 
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

// Function to fetch current weather
async function fetchWeather() {
    try {
        const response = await fetch(WEATHER_URL);
        if (!response.ok) {
            throw new Error('Weather API request failed');
        }
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather-info').innerHTML = '<p>Unable to load weather data. Please try again later.</p>';
    }
}

// Function to fetch weather forecast
async function fetchForecast() {
    try {
        const response = await fetch(FORECAST_URL);
        if (!response.ok) {
            throw new Error('Forecast API request failed');
        }
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Function to display current weather
function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const weatherHTML = `
        <div class="weather-current">
            <div class="weather-temp">${temp}°C</div>
            <div class="weather-desc">${description.charAt(0).toUpperCase() + description.slice(1)}</div>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" class="weather-icon">
        </div>
        <div class="weather-forecast" id="forecast-container">
            <p>Loading forecast...</p>
        </div>
    `;

    document.getElementById('weather-info').innerHTML = weatherHTML;
    fetchForecast();
}

// Function to display 3-day forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    const dailyForecasts = {};

    // Group forecasts by day
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });

        if (!dailyForecasts[day]) {
            dailyForecasts[day] = {
                temps: [],
                icon: item.weather[0].icon
            };
        }
        dailyForecasts[day].temps.push(item.main.temp);
    });

    // Get next 3 days
    const days = Object.keys(dailyForecasts).slice(0, 3);

    const forecastHTML = days.map(day => {
        const temps = dailyForecasts[day].temps;
        const avgTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
        const icon = dailyForecasts[day].icon;

        return `
            <div class="forecast-day">
                <h4>${day}</h4>
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
                <div class="forecast-temp">${avgTemp}°C</div>
            </div>
        `;
    }).join('');

    forecastContainer.innerHTML = forecastHTML;
}

// Function to load members data
async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error('Error loading members:', error);
        document.getElementById('spotlights-container').innerHTML = '<p>Unable to load member spotlights.</p>';
    }
}

// Function to display random spotlights (gold and silver members only)
function displaySpotlights(members) {
    // Filter for gold and silver members (membership level 2 or 3)
    const eligibleMembers = members.filter(member => member.membership >= 2);

    // Get random 2-3 members
    const numSpotlights = Math.min(3, eligibleMembers.length);
    const selectedMembers = [];
    const usedIndices = new Set();

    while (selectedMembers.length < numSpotlights) {
        const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            selectedMembers.push(eligibleMembers[randomIndex]);
        }
    }

    const spotlightsHTML = selectedMembers.map(member => `
        <article class="spotlight-card">
            <h3>${member.name}</h3>
            <p>${member.info}</p>
            <div class="spotlight-contact">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            </div>
            <span class="membership-badge">${getMembershipLevel(member.membership)}</span>
        </article>
    `).join('');

    document.getElementById('spotlights-container').innerHTML = spotlightsHTML;
}

// Function to get membership level text
function getMembershipLevel(level) {
    const levels = {
        1: "Member",
        2: "Silver Member",
        3: "Gold Member"
    };
    return levels[level] || "Member";
}

// Initialize event listeners
function initializeEventListeners() {
    // Menu toggle for mobile
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.querySelector('nav').classList.toggle('open');
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load weather data
    fetchWeather();

    // Load member spotlights
    loadMembers();

    // Initialize event listeners
    initializeEventListeners();

    // Update copyright year and last modified
    const currentYear = new Date().getFullYear();
    document.getElementById('copyright-year').textContent = currentYear;
    document.getElementById('last-modified').textContent = document.lastModified;
});