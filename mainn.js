class API {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getData = async (path) => {
        try {
            const { data } = await axios.get(`${this.baseUrl}${path}`);
            return data;
        } catch (errors) {
            console.error(errors);
        }
    };
}



const countryApi = new API("http://127.0.0.1:8000/")


const crateTempBox = (data) => {
    const countryContainer = document.querySelector(".city-container");

    data.map(
        ({ dateweather }) =>
        (countryContainer.innerHTML += `<div class="temps">
            <div class="day">
    <div class="sky">${dateweather[0].sky}</div>
    <p class="temp">${dateweather[0].temp}</p>
    <p class="time">${dateweather[0].time}</p>
        </div>
        <div class="day">
    <div class="sky">${dateweather[0].sky6}</div>
    <p class="temp">${dateweather[0].temp6}</p>
    <p class="time">${dateweather[0].time6}</p>
        </div>
        <div class="day">
    <div class="sky">${dateweather[0].sky9}</div>
    <p class="temp">${dateweather[0].temp9}</p>
    <p class="time">${dateweather[0].time9}</p>
        </div>
        <div class="day">
    <div class="sky">${dateweather[0].sky12}</div>
    <p class="temp">${dateweather[0].temp12}</p>
    <p class="time">${dateweather[0].time12}</p>
        </div>
        <div class="day">
    <div class="sky">${dateweather[0].sky15}</div>
    <p class="temp">${dateweather[0].temp15}</p>
    <p class="time">${dateweather[0].time15}</p>
        </div>
        <div class="day">
    <div class="sky">${dateweather[0].sky20}</div>
    <p class="temp">${dateweather[0].temp20}</p>
    <p class="time">${dateweather[0].time20}</p>
        </div>
        <div class="day">
    <div class="sky">${dateweather[0].sky23}</div>
    <p class="temp">${dateweather[0].temp23}</p>
    <p class="time">${dateweather[0].time23}</p>
    </div>
    </div>`));
}

const crateTimeBox = (data) => {
    const countryContainer = document.querySelector(".city-time-container");

    data.map(
        ({ dateweather }) =>
        (countryContainer.innerHTML += `
        <div class="big">
        <div class="small">
            div class="pict"></div>
            <p class="times">${dateweather[0].timeRise}</p>
        </div>
        <div class="small">
            <div class="pict"></div>
            <p class="times">${dateweather[0].timeSet}</p>
        </div>
    </div>`));
}

const crateAttentBox = (data) => {
    const countryContainer = document.querySelector(".city-attent-container");

    data.map(
        ({ dateweather }) =>
        (countryContainer.innerHTML += `
            <div class="attent">
        <p class="att">${dateweather[0].attent_name}</p>
    </div>`));
}



const getContinentNames = async () => {
    let continentNames = await countryApi.getData("continentsAll/");
    console.log(continentNames)
    continentNames = continentNames?.map((item) => item.continent_name);
    return (continentNames);
};

const getCountryNames = async (continent) => {
    let countryNames = await countryApi.getData("continentsAll/");
    countryNames = countryNames.find(
        (item) => item.continent_name == continent)?.country;
    return countryNames;
};

const getCityNames = async (continent) => {
    const country = await getCountryNames(continent);
    let cities = country.find((item) => item.country_name == country)?.city;
    return cities;
};

const main = async () => {
    const continentNames = await getContinentNames();

    const continentsTitle = document.querySelectorAll(".country-box .title");
    const continentsLink = document.querySelectorAll("continent-container a");
    continentsTitle.forEach((item, index) => {
        item.innerText = continentNames[index];
        continentsLink[index].setAttribute(
            "data-continent-name",
            continentNames[index]
        );
        continentsLink[index].addEventListener("click", (event) => {
            localStorage.setItem("continent", event.target.innerText);
        });
    });
    const countries = await getCountryNames(localStorage.getItem("continent"));
    countries?.map(({ country_name }) => {
        const cityDiv = document.querySelector(".city-country-container");
        cityDiv.innerHTML += `<a href="Europe.">
            <div class="city-box">
            <p class="title">${country_name}</p>
            </div>
            </a>`;
    });
    const cityLink = document.querySelectorAll(".city-country-container a")

    cityLink.forEach((item) =>
        item.addEventListener("click", () => {
            localStorage / setItem("city", item.getAttribute("data-city-name"));
        })
    );
    const cityNames = await getCityNames(
        localStorage.getItem("city"),
        localStorage.getItem("continent")
    );
    console.log(cityNames);

    createWeatherBox(cityNames);

};

main()