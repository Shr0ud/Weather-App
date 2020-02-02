// proxy for localhost
const proxy = "https://cors-anywhere.herokuapp.com/"

// function to change between celsius and farhenheit
function changeUnit(){
    const temperature = document.querySelector(".temperature-degree");
    const unit = document.querySelector(".degree span");

    if (unit.textContent === "F"){
        unit.textContent = "C";

        // formula for celsius
        const celsius = (temperature.textContent - 32)* 5/9;
        temperature.textContent = celsius.toFixed(2);

    }else{
        unit.textContent = "F";

        // formula for fahrenheit
        const fahrenheit = temperature.textContent * 9/5 + 32;
        temperature.textContent = fahrenheit.toFixed(2);
    }

}

// sky cons function to update icons
function setIcons(icon, iconID){
    //creates white icons
    const skycons = new Skycons({color: "white"});

    // update the icon string
    // replaces all dashes with underscores
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}

// main function to get the location and fetch weather from api and update DOM
function weather(){
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    

    //if location is enabled
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( position =>{
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // api from dark sky api
            const api = `${proxy}https://api.darksky.net/forecast/d80c799cfae7e20ea6de5f37d370dad9/${latitude},${longitude}`;

            fetch(api)
                .then(response => response.json())
                .then( data => {

                    //pull out temperature and summary and the weather icon name
                    const {temperature, summary, icon} = data.currently;

                    //update DOM elements
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    setIcons(icon, document.querySelector(".icon"));
                });

        });
    } // if ends here


}


// when loads then call the functions 
window.addEventListener("load", weather);

// event listener for onclick to change temperature units
const temperatureSection = document.querySelector(".degree");
temperatureSection.addEventListener("click", changeUnit);