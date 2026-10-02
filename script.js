const apiKey = "86cf030d427e04a9aff48c0733455b43"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const loader = document.querySelector(".loader")

async function checkWeather(city) {

    loader.style.display = "block"
    document.querySelector(".error").style.display = "none"
    document.querySelector(".weather").style.display = "none"

    try {

        const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

        if (response.status == 404) {

            document.querySelector(".error").style.display = "block"
            document.querySelector(".weather").style.display = "none"

        }
        else if (!response.ok) {
            document.querySelector(".error").style.display = "block"
            document.querySelector(".weather").style.display = "none"
        }

        else {

            const data = await response.json()

            console.log(data)

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&degc";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "attachments/clouds.png"
            }
            else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "attachments/clear.png"
            }
            else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "attachments/rain.png"
            }
            else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "attachments/drizzle.png"
            }
            else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "attachments/mist.png"
            }
            else if (data.weather[0].main == "Snow") {
                weatherIcon.src = "attachments/snow.png"
            }
            else if (data.weather[0].main == "Wind") {
                weatherIcon.src = "attachments/wind.png"
            }
            else if (data.weather[0].main == "Humidity") {
                weatherIcon.src = "attachments/humidity.png"
            }

            document.querySelector(".weather").style.display = "block"
            document.querySelector(".error").style.display = "none"

        }
    } catch (error) {

        console.log(error)

        document.querySelector(".weather").style.display = "none"
        document.querySelector(".error").style.display = "block"
    } finally {
        loader.style.display = "none"
    }

}


searchBtn.addEventListener("click", async () => {
    if (searchBox.value.trim() ===""){
        return;
    }
    checkWeather(searchBox.value.trim())
})

searchBox.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
})

