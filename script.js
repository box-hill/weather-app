let alreadyCalled = false;
let weatherData;

let latitude, longitude;


getLocation();


function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((location)=>{
            latitude = location.coords.latitude;
            longitude = location.coords.longitude;
            getWeatherForecast(latitude, longitude);
        });
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

async function getWeatherForecast(lat,long){
    let urlString = 'https://api.openweathermap.org/data/2.5/onecall?lat=' 
    + lat + '&lon=' + long + '&&appid=3e5646a7f6d2244871efd9d9312f61f5';
    let response = await fetch(urlString, {mode:'cors'});
    weatherData = await response.json(); // await will block only the code within async func
    console.log(weatherData);
    const dataObject = processWeatherData(weatherData);
    renderWeatherData(dataObject);
}

function processWeatherData(data){
    let daily = data.daily;
    let hourly = data.hourly;
    let current = data.current;
    return{daily, hourly, current};
}

function renderWeatherData(dataObj){
    console.log(dataObj);
    renderDOM('current-title', 'Current Weather');
    renderDOM('current-feels-like', 'Feels like: ' + Math.round(kToC(dataObj.current.feels_like)) + '°C');
    renderDOM('current-temp', 'Temperature: ' + Math.round(kToC(dataObj.current.temp)) + '°C');
    renderDOM('current-humidity', 'Humidity = ' + dataObj.current.humidity+ '%');
    renderDOM('current-description', capitaliseFirst(dataObj.current.weather[0].description));

}

function kToC(kelvin){
    return kelvin - 273.15;
}

function renderDOM(id, string){
    const element = document.getElementById(id);
    element.innerHTML = string;
}

function capitaliseFirst(string){
    if(typeof string != 'string') return;
    let output = string.charAt(0).toUpperCase() + string.slice(1);
    return output;
}
