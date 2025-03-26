function geoFindMe() {
    const status = document.querySelector("#status");
  
    async function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const api_url = '/weather/' + latitude + '/' + longitude;
        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json);
        status.textContent = json.forecast.forecastday[0].date;
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

