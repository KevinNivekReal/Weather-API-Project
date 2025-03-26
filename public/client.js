function geoFindMe() {
    const status = document.querySelector("#status");
  
    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const api_url = '/weather/' + latitude + '/' + longitude;
        const response = await fetch(api_url);
        const json = await response.json();
        status.textContent = "";

        const weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",];
        var array = document.getElementsByClassName("day-container");
        console.log(array);

        for (var i = 0; i < array.length; i++){
            var weather = json.forecast.forecastday[i].day.condition.text;
            var weather_icon = "https:" + json.forecast.forecastday[0].day.condition.icon;

            var high = json.forecast.forecastday[i].day.maxtemp_f;
            var low = json.forecast.forecastday[i].day.mintemp_f;

            var day_date = json.forecast.forecastday[i].date;
            var d = new Date(day_date);
            let day = weekday[d.getDay()];

            
            var container_children = array[i].getElementsByTagName("p");
            array[i].querySelector(".weather-icon").src = weather_icon;
            console.log(container_children);
            
            for (var j = 0; j < container_children.length;j++){
                switch(container_children[j].className){
                      case "day-name": 
                          container_children[j].innerHTML = day;
                          break;
                      case "weather-info high": 
                          container_children[j].innerHTML = "High: " + high + " F";
                          break;
                      case "weather-info low":
                          container_children[j].innerHTML = "Low: "+ low + " F";
                          break;
                      case "weather-info weather":
                          container_children[j].innerHTML = weather;
                          break;
                      default:
                          console.log("error happened somewhere");
                          
                  }
            }
        }
    }
  
    function error() {
      status.textContent = "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  
document.querySelector("#find-me").addEventListener("click", geoFindMe);


