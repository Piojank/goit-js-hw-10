import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
let debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const qs = s => document.querySelector(s);
const searchBox = qs('#search-box');
const countryList = qs('.country-list');
const countryInfo = qs('.country-info');

const searchBoxValue = () => {
    fetchCountries(searchBox.value.trim())
        .then((countries) => {
            console.log(countries);
            renderCountriesList(countries);
        })
        .catch((error) => console.log(error));
};

const renderCountriesList = () => {
    
}

Notiflix.Notify.info('Please type in correct country.');

searchBox.addEventListener("input", debounce(searchBoxValue, DEBOUNCE_DELAY));