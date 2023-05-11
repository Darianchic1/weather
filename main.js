import React from "react";
import axios from "axios";

class App extends React.Component {
    state = {
        newfiles: null,
    };
}

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

const countryApi = new API("http://127.0.0.1:8000/");


const getContinentNames = async () => {
    let continentNames = await countryApi.getData("continentsAll/");
    continentNames = continentNames?.map((item) => item.continent_name);
    return continentNames;
};

const getCountryNames = async (continent) => {
    let countryNames = await countryApi.getData(`continents/${continent}/`);
    /* countryNames = countryNames.find(
        (item) => item.continent_name == continent)?.country; */
    return countryNames?.country;
};

const getCityNames = async (continent) => {
    const country = await getCountryNames(continent);
    let cities = country.find((item) => item.country_name == country)?.city;
    return cities;
};

const main = async () => {
    const continentNames = await getContinentNames();

    const continentsTitle = document.querySelector(".countrybox .title");
    const continentsLink = document.querySelectorAll(".continent-container a");
    continentsTitle.forEach((item, index) => {
        item.innerText = continentNames[index];
        continentsLink[index].setAttribute(
            "data-continent-name",
            continentNames[index]
        );
        continentsLink[index].addEventListener("click", (event) => {
            localStorage.setItem(
                "continent",
                continentsLink[index].getAttribute("data-continent-name")
            );
        });
    });
    const cityLink = document.querySelectorAll(".city-container a");

    cityLink.forEach((item) =>
        item.addEventListener("click", () => {
            localStorage.setItem("city", item.getAttribute("data-city-name"));
        })
    );
    const cityNames = await getCityNames(
        localStorage.getItem("city"),
        localStorage.getItem("continent")
    );
    console.log(cityNames);

    createCountrBox(cityNames);

}

main();






