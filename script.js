const FURL = "https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=";
const WURL = "https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=";
const APIKEY = "2fb6bb54643b7d3b769254c9ec70fea1";

const forecasturl = FURL + APIKEY;
const weatherurl = WURL + APIKEY;

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecast = document.getElementById("forecast");
const temp = document.getElementById("tempToday")
const forecastToday = document.getElementById("forecastToday");
const title = document.getElementById("title");
const imageIcon = document.getElementById("icon");

const fetchForecast = () => {
  fetch(forecasturl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const sr = new Date(data.city.sunrise).toLocaleTimeString("sv-SE", {hour: '2-digit', minute:'2-digit'});
      const ss = new Date(data.city.sunset).toLocaleTimeString("sv-SE", {hour: '2-digit', minute:'2-digit'});

      sunrise.innerText += `sunrise ${sr}`;
      sunset.innerText += `sunset ${ss}`;
      if(data.list) {
          data.list.forEach((weather) => {
            const date = weather.dt_txt.split(' ')[0]
            if (dates[date]) {
              dates[date].push(weather)
            }
            else {
              dates[date] = [weather]
            }
          })
          Object.entries(dates).forEach((item) => {
            const date = item[0]
            const weather = item[1]
            const temps = weather.map((value) => value.main.temp)
            const maxTemp = Math.max(...temps)
            const roundedTemp = Math.round(maxTemp * 10) / 10;
            const day = getDays(date);
            console.log(weather.map((value) => value.weather));

            forecast.innerHTML += `
                <div>
                  <p>${day}</p>
                  <p>${roundedTemp} °C</p>
                </div>
              `;
          })
        }
      })
    };

const fetchWeather = () => {
  fetch(weatherurl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      temp.innerText += Math.round(data.main.temp) + " °C";
      const today = data.weather[0].description;
      forecastToday.innerHTML += today;

      if(today === 'clear sky') {
      title.innerHTML += `
        <h1>Today we have a ${today}, enjoy your day</h1>
      `;
      imageIcon.classList.add("sunnyImg");
      }
       else if(today === 'light rain') {
        title.innerHTML += `
        <h1>Todays forecast is ${today}, don't forget your umbrella</h1>
      `;
      imageIcon.classList.add("cloudyImg");
      } else if(today === 'clear') {
        title.innerHTML += `
        <h1> Get your sunnies on. Stockholm is looking rather ${today} today.</h1>
      `;
      imageIcon.classList.add("sunnyImg");
      } else if (today === 'overcast clouds') {
        title.innerHTML += `
        <h1>Stockholm is covered with ${today} and looking gloomy today.</h1>
      `;
      imageIcon.classList.add("cloudyImg");
      } else if (today === 'scattered clouds') {
        title.innerHTML += `
        <h1>Stockholm is covered with ${today} and looking gloomy today.</h1>
      `;
      imageIcon.classList.add("cloudyImg");
      } else if(today === 'broken clouds') {
        title.innerHTML += `
        <h1>Stockholm is covered with ${today} and looking gloomy today.</h1>
      `;
      imageIcon.classList.add("cloudyImg");
      } else {
        title.innerHTML += `
        <h1> Todays forecast is ${today}. Enjoy your day!</h1>
      `;
      imageIcon.classList.add("cloudyImg");
      }
    });  
};

let dates = {}

const getDays = (date) => {
  const dayOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const wholeDate = new Date(date)
  const day = (dayOfTheWeek[wholeDate.getDay()])
  return day;
}

fetchWeather();
fetchForecast();