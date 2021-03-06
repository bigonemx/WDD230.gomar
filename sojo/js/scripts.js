// Menu
function toggleMenu () {
    document.getElementById("primaryNav").classList.toggle("hide");
}

// current weather
const apiURL = "//api.openweathermap.org/data/2.5/weather?id=5781770&appid=994a7d4fb87b563dad7d75913d018070&units=imperial&lang={en}"
fetch(apiURL)
  .then((response) => response.json())
  .then((weatherInfo) => {
    console.log(weatherInfo);
    document.getElementById("current-temp").textContent = weatherInfo.main.temp;
    document.getElementById('humidity').textContent = weatherInfo.main.humidity;
    document.getElementById('current').textContent = weatherInfo.weather[0].description;
    document.getElementById('announcement').textContent = weatherInfo.precipitation.mode;
  });
  

// Forecast
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?id=5781770&units=imperial&appid=994a7d4fb87b563dad7d75913d018070&units=imperial';
fetch(forecastURL)
  .then((response) => response.json())
  .then((forecastObject) => {
      console.table(forecastObject);
      var forecast = forecastObject.list.filter(x => x.dt_txt.includes('18:00:00'));
      console.table(forecast);
      const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      for (let day = 0; day < forecast.length; day++) {
          const d = new Date(forecast[day].dt_txt);
          const imagesrc = 'https://openweathermap.org/img/wn/' + forecast[day].weather[0].icon + '@2x.png';
          const desc = forecast[day].weather[0].description;
          document.getElementById(`dayofweek${day+1}`).textContent = weekdays[d.getDay()];
          document.getElementById(`forecast${day+1}`).textContent = Math.round(forecast[day].main.temp);
          document.getElementById(`icon${day+1}`).setAttribute('src', imagesrc);
          document.getElementById(`icon${day+1}`).setAttribute('alt', desc);
      }
  });

// update info (footer)  
const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
document.getElementById('Modified').textContent = new Date().toLocaleDateString('en-US', options);


//Lazyload
let imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
};

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    });
    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}


// directory
const requestURL = 'js/sojo.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const directory = jsonObject['directory'];

    for (let i = 0; i < directory.length; i++) {
        let card = document.createElement('section');
        let bname = document.createElement('h2');
        let bphone= document.createElement('p');
        let baddress= document.createElement('p');
        let bweb = document.createElement('p');
        let blogo = document.createElement('img');  

        bname.textContent = directory[i].name;
        bphone.textContent = "Phone: " + directory[i].phone;
        baddress.textContent = "Address: " + directory[i].address;
        bweb.textContent = "web: " + directory[i].web;
        blogo.setAttribute('src', 'images/partners/' + directory[i].logo);
        blogo.setAttribute('alt', `${directory[i].name}`);
        blogo.setAttribute('loading', 'lazy');

      card.appendChild(bname);
      card.appendChild(blogo);
      card.appendChild(bphone);
      card.appendChild(baddress);
      card.appendChild(bweb);

      document.querySelector('div.cards').appendChild(card);
    }
  });
