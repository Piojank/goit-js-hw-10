import './css/styles.css';
import Notiflix from 'notiflix';



const qs = s => document.querySelector(s);
const searchBox = qs('#search-box');
const countryList = qs('.country-list');
const countryInfo = qs('.country-info');

const DEBOUNCE_DELAY = 300;

