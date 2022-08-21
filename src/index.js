import './css/styles.css';

const query = selector => document.querySelector(selector);

const searchBox = query('#search-box');
const countryList = query('.country-list');
const countryInfo = query('.country-info');

const DEBOUNCE_DELAY = 300;
