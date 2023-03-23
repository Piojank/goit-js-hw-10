import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
let debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const qs = s => document.querySelector(s);
const searchBox = qs('#search-box');
const countryList = qs('.country-list');
const countryInfo = qs('.country-info');

Notiflix.Notify.info('Please type in correct country.');

const searchBoxValue = () => {
    fetchCountries(searchBox.value.trim())
        .then((countries) => {
            console.log(countries);
            renderCountriesList(countries);
        })
        .catch(error => console.log(error));
};

const renderCountriesList = countries => {
    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches, please enter more characters.');
        listReset();
    } else if (countries.length <= 10 && countries.length >= 2) {
    listReset();

    const liItem = countries.map(({ name, flags }) => 
    `<li class="country-list_item">
        <img src="${flags.svg}" alt="country flag" class="flags-mini_img">
        <p class="country-list_name">${name}</p>
    </li>`).join("");

    countryList.insertAdjacentHTML("beforeend", liItem);

    } else if (countries.length === 1) {
        listReset();

        const finalCountry = countries.map(({ name, flags, capital, population, languages }) => {
        return `<h1 class="country-info_name"><img src="${flags.svg}" class="flags-big_img"/>${name}</h1>
            <p class="country-info_item"><span>Capital: </span> ${capital} </p>
            <p class="country-info_item"><span>Population: </span> ${population} </p>
            <p class="country-info_item"><span>Languages: </span> 
            <ul>${languages.map(lang => `<li>${lang.name}</li>`).join('')}</ul></p>`;
        });
        countryInfo.innerHTML = finalCountry;

    } else if (countries.length < 1) {
        Notiflix.Notify.info('Please type correct country.');
    }
};

const listReset = () => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
};

searchBox.addEventListener("input", debounce(searchBoxValue, DEBOUNCE_DELAY));

