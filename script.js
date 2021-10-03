let alreadyCalled = false;
let weatherData;

let latitude, longitude;


getLocation();

async function getWeather(){
    alreadyCalled = true;
    let urlString = 'https://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=3e5646a7f6d2244871efd9d9312f61f5';
    let response = await fetch(urlString, {mode:'cors'});
    weatherData = await response.json();
    console.log(weatherData);
    console.log(weatherData.clouds);
}

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
}

function processWeatherData(){
    
}


