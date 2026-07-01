function getWeather()
{
    var city = document.getElementById("city").value;

    if(city=="")
    {
        alert("Please enter a city name");
        return;
    }

    var api="https://api.weatherapi.com/v1/forecast.json?key=b146a6f943e747fdac643211260107&q="+city+"&days=3&aqi=no&alerts=no";

    fetch(api)

    .then(function(response)
    {
        return response.json();
    })

    .then(function(data)
    {

        if(data.error)
        {
            alert("City not found");
            return;
        }

        document.getElementById("cityName").innerHTML =
        data.location.name + ", " + data.location.country;

        document.getElementById("date").innerHTML =
        data.location.localtime;

        document.getElementById("temperature").innerHTML =
        data.current.temp_c + " °C";

        document.getElementById("condition").innerHTML =
        data.current.condition.text;

        document.getElementById("humidity").innerHTML =
        data.current.humidity + " %";

        document.getElementById("wind").innerHTML =
        data.current.wind_kph + " km/h";

        document.getElementById("icon").src =
        "https:" + data.current.condition.icon;

        var weather=data.current.condition.text;

        if(weather=="Sunny")
        {
            document.body.style.background="linear-gradient(to right,#f6d365,#fda085)";
        }
        else if(weather=="Cloudy" || weather=="Overcast")
        {
            document.body.style.background="linear-gradient(to right,#bdc3c7,#2c3e50)";
        }
        else if(weather=="Rain" || weather=="Light rain" || weather=="Moderate rain")
        {
            document.body.style.background="linear-gradient(to right,#4facfe,#00f2fe)";
        }
        else
        {
            document.body.style.background="linear-gradient(to right,#74b9ff,#0984e3)";
        }

        var forecast="";

        for(var i=0;i<3;i++)
        {
            forecast +=

            "<div class='day'>" +

            "<h3>" +
            data.forecast.forecastday[i].date +
            "</h3>" +

            "<img src='https:" +
            data.forecast.forecastday[i].day.condition.icon +
            "'>" +

            "<p><b>" +
            data.forecast.forecastday[i].day.avgtemp_c +
            " °C</b></p>" +

            "<p>" +
            data.forecast.forecastday[i].day.condition.text +
            "</p>" +

            "</div>";
        }

        document.getElementById("forecast").innerHTML=forecast;

    })

    .catch(function()
    {
        alert("Something went wrong.");
    });

}

function logout()
{
    window.location.href="index.html";
}

document.getElementById("city").addEventListener("keypress",function(event)
{
    if(event.key=="Enter")
    {
        getWeather();
    }
});