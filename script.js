function fetchAllCountries() {
    const countriesAPI = "https://restcountries.com/v3.1/all";
    fetch(countriesAPI)
        .then((response) => response.json())
        .then(countryData => {
            let countryCards = "";
            countryData.forEach((country) => {
                countryCards += `<div class="country-card" id="${country.name.common}" onclick="fetchCountryByName('${country.name.common}')">
                                    <img src="${country.flags.svg}" width="100px">
                                    <h1 class="country-name"><b>${country.name.common}</b></h1>
                                    <p class="country-population"><b>Population</b>: <span>${country.population}</span></p>
                                    <p class="country-region"><b>Region</b>: <span>${country.region}</span></p>
                                    <p class="country-capital"><b>Capital</b>: <span>${country.capital}</span></p>
                                </div>`;
            });
            document.querySelector(".country-cards").innerHTML = countryCards;
        })
        .catch(error => console.log("Error: ", error));
}

window.addEventListener('load', fetchAllCountries);


// Search functionality for countries

function searchCountryByName(event) {
    event.preventDefault();
    const searchInput = document.querySelector("#countrySearch").value;

    if (searchInput.length > 1) {
        const searchAPI = `https://restcountries.com/v3.1/name/${searchInput}`;
        
        fetch(searchAPI)
            .then((response) => response.json())
            .then(searchData => {
                let searchCards = "";
                searchData.forEach((country) => {
                    searchCards += `<div class="country-card">
                                        <img src="${country.flags.svg}" class="countryImage">
                                        <h1 class="country-name">${country.name.common}</h1>
                                        <p class="country-population"><b>Population</b>: <span>${country.population}</span></p>
                                        <p class="country-region"><b>Region</b>: <span>${country.region}</span></p>
                                        <p class="country-capital"><b>Capital</b>: <span>${country.capital}</span></p>
                                    </div>`;
                });
                document.querySelector(".country-cards").innerHTML = searchCards;
            })
            .catch(error => console.error("Error: ", error));
    } else if (searchInput === "") {
        fetchAllCountries();
    }
}

document.querySelector("#countrySearch").addEventListener("keyup", searchCountryByName);


// Dropdown filter functionality

function filterByContinent() {
    const selectedRegion = document.querySelector("#regionFilter").value;
    console.log("Region selected: ", selectedRegion);
    const regionAPI = `https://restcountries.com/v3.1/region/${selectedRegion}`;
    
    fetch(regionAPI)
        .then((response) => response.json())
        .then(regionData => {
            let regionCards = "";
            regionData.forEach((country) => {
                regionCards += `<div class="country-card">
                                    <img src="${country.flags.svg}">
                                    <h1 class="country-name">${country.name.common}</h1>
                                    <p class="country-population"><b>Population</b>: <span>${country.population}</span></p>
                                    <p class="country-region"><b>Region</b>: <span>${country.region}</span></p>
                                    <p class="country-capital"><b>Capital</b>: <span>${country.capital}</span></p>
                                </div>`;
            });
            document.querySelector(".country-cards").innerHTML = regionCards;
        })
        .catch(error => console.error("Error: ", error));
}

document.getElementById("regionFilter").addEventListener("change", filterByContinent);


// Toggle dark/light mode functionality

let darkModeButton = document.querySelector("#toggleDarkMode");
let lightModeButton = document.querySelector("#toggleLightMode");
let mainContent = document.querySelector(".main-container");
let dropdownSelect = document.querySelector("#regionFilter");
let searchInputField = document.querySelector("#countrySearch");
let navBar = document.querySelector(".header-bar");

function activateDarkMode() {
    darkModeButton.style.cursor = "pointer";
    lightModeButton.style.display = "block";
    darkModeButton.style.display = "none";
    mainContent.style.backgroundColor = "hsl(207, 26%, 17%)";
    mainContent.style.color = "hsl(0, 0%, 100%)";
    dropdownSelect.style.backgroundColor = "hsl(207, 26%, 17%)";
    dropdownSelect.style.color = "hsl(0, 0%, 100%)";
    searchInputField.style.backgroundColor = "hsl(207, 26%, 17%)";
    searchInputField.style.color = "hsl(0, 0%, 100%)";
    navBar.style.borderBottom = "none";
}

darkModeButton.addEventListener("click", activateDarkMode);


function activateLightMode() {
    lightModeButton.style.cursor = "pointer";
    lightModeButton.style.display = "none";
    darkModeButton.style.display = "block";
    mainContent.style.backgroundColor = "hsl(0, 0%, 98%)";
    mainContent.style.color = "black";
    dropdownSelect.style.backgroundColor = "white";
    dropdownSelect.style.color = "black";
    searchInputField.style.backgroundColor = "white";
    searchInputField.style.color = "black";
    navBar.style.borderBottom = "lightgrey";
}

lightModeButton.addEventListener("click", activateLightMode);