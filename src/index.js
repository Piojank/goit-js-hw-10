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
        .catch((error) => console.log(error));
};

const renderCountriesList = (countries) => {
    
    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        listReset();
    } else if (countries.length > 10 && countries.length >= 2) {

    countries.map(({ name, flags }) => {
    const liItem = `
        <li class="country-list_item">
            <img src="${flags.svg}" alt="country flag" class="flags-mini_img">
            <p class="country-list_name">${name}</p>
        </li>
    `;
    return liItem;
    });

    } else if (countries.length === 1) {
        listReset();


    } else if (countries.length < 1) {
        Notiflix.Notify.info('Please type correct country.');
    }
};

const listReset = () => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
};

searchBox.addEventListener("input", debounce(searchBoxValue, DEBOUNCE_DELAY));

