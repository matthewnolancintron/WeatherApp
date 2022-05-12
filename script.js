document.addEventListener("DOMContentLoaded", () => {
    /**
     * Write the functions that hit the API.
     * You’re going to want functions
     * that can take a location
     * and return the weather data for that location.
     * For now, just console.log() the information.
     */
    async function getWeather(cityName){
        /**
         * api call for getting weather data
         * based on city name
         */
        try{
            const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=51b00e4b9a9ac396c9cff1eba15d3fe9&units=imperial`);
            return await apiCall.json();
        }catch(err){
            console.log(err);
        }
    }
    
    async function processJson(json){
        let weatherData = await json;
        console.log(weatherData.main)
        return weatherData.main;
    }
    
    function makeWeatherDataHTML(weatherData){
        weatherData.then((data)=>{
            console.log(data,'weatherData')
            let dataListElement = document.createElement('ul');
            for(property in data){
                console.log(`${property}: ${data[property]}`)
                let dataListItem = document.createElement('li');
                
                let dataLabel = document.createElement('p');
                dataLabel.textContent = property;

                let dataValue = document.createElement('p');
                dataValue.textContent = data[property];

                dataListItem.append(dataLabel);
                dataListItem.append(dataValue);

                dataListElement.append(dataListItem);
            }

            let weatherDataDisplay = document.querySelector('#weatherDataDisplay');
            console.log(weatherDataDisplay.children[1]);
            weatherDataDisplay.children[1].replaceWith(dataListElement)
        });
    }

   // processJson(getWeather('tokyo'));


    let form = document.querySelector('#weatherDataForm');

    form.addEventListener('submit',(e)=>{
        e.preventDefault();

        let startTime = performance.now()
        
        let usersCityWeatherSearch = document.getElementById('cityName').value;
        console.log(usersCityWeatherSearch);

        //call get weather
        let weatherData = processJson(getWeather(usersCityWeatherSearch));
        //add weatherData as html an append to the document
        makeWeatherDataHTML(weatherData);

        let endTime = performance.now();
        let runTime = endTime - startTime;

        let runTimeComponent = document.querySelector('#runtime');
        runTimeComponent.textContent = runTime;
    });


});

// check step7