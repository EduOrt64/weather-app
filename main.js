const img = document.querySelector('img');
const cityBtn = document.querySelector(".enter-city");
const userCity = document.querySelector('.city-input');
const temperatureText = document.querySelector(".temp-text");
const cityText = document.querySelector(".location-text");
const timeText = document.querySelector(".time-text");
const degreeSelector = document.querySelector("#check-5");

let weatherData = {};  
let gifImg = "cloudy"; 
let selectedDegrees = "farenheit";    

weatherGif();

async function getweather() {
  const city = userCity.value.trim();
  if (!city) {
    console.log('Please enter a city');
    return;
  }

  try {
    const weatherRequest = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=ES5F52MSY2DRR7WZFYUGBRAM7`, { mode: 'cors' });
    weatherData = await weatherRequest.json();
    console.log(weatherData);

    gifImg = weatherData.currentConditions.conditions;
    
   
    weatherGif();
  } catch (err) {
    console.error("Error fetching weather:", err.message);
  }
}

function weatherGif() {
  if (gifImg) {
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=LLgXgtJ6AcaTjziJurH0EEezMRWh3159&s=${gifImg}`, { mode: 'cors' })
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        img.src = response.data.images.original.url;
      })
      .catch(function(error) {
        console.error('Error fetching the GIF:', error);
      });
  }
}

cityBtn.addEventListener("click", () => {
  getweather().then(()=>{
  console.log(weatherData);
    renderDegrees();
    renderCity();
    renderTime();

  });
});

degreeSelector.addEventListener("click", ()=>{

if (selectedDegrees === "farenheit") {selectedDegrees = "celsius"

} else {selectedDegrees = "farenheit";}

if(weatherData.currentConditions){renderDegrees();

} else {renderExampleDegrees();}


})

function renderDegrees(){
   

let temperature = weatherData.currentConditions.temp;
let celsius = (temperature - 32) * 5 / 9;
celsius = celsius.toFixed(1);

if(selectedDegrees === "farenheit"){temperatureText.textContent = `${temperature} °F`;

} else temperatureText.textContent = `${celsius} °C`

}

function renderExampleDegrees(){
 
    let currentTemperature = 45;

    let celsius  = (currentTemperature - 32) * 5 / 9;
    let farenheit = currentTemperature;

    celsius = celsius.toFixed(1);

    if(selectedDegrees === "celsius"){temperatureText.textContent = `${celsius} °C`;

} else temperatureText.textContent = `${farenheit} °F`


}

function renderCity(){

let city = weatherData.resolvedAddress;
cityText.textContent = city;


}

function renderTime(){

let time = weatherData.currentConditions.conditions;

timeText.textContent = time;

}