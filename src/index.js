import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import round from 'lodash.round';

const DEBOUNCE_DELAY = 300;

const qs = s => document.querySelector(s);
const searchBox = qs('#search-box');
const countryList = qs('.country-list');
const countryInfo = qs('.country-info');

Notiflix.Notify.info('Please type in correct country.');

// Handle input event
const handleInput = event => {
    const countryName = event.target.value.trim();

    clearMarkup();
    if (countryName.length === 0) return;

    fetchCountries(countryName)
        .then(countries => {
            console.log(countries);
            if (countries.length > 10) {
                Notiflix.Notify.info('Too many matches, please enter more characters.');
            } else if (countries.length <= 10 && countries.length >= 2) {
                renderList(countries);
            } else {
                renderCountryInfo(countries);
            }
        })
        .catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"));
}

// Render countries list
const renderList = countries => {
    const liItem = countries.map(({ name, flags }) => {

    return `<li data-country="${name.official}"style="display:flex; align-items:center; gap:10px">
                <img src="${flags.svg}" alt="${flags.alt}" width=35 height=25 />
                <p>${name.official}</p>
            </li>`;
    }).join("");

    countryList.innerHTML = liItem;

    // Add click listener to each list item to get more info
    // const listItems = document.querySelectorAll('.country-list li');
    // listItems.forEach(item => {
    //     item.addEventListener("click", event => {
    //         const countryName = event.currentTarget.getAttribute('data-country');
    //         const country = countries.find(country => country.name.official === countryName);
    //         renderCountryInfo(country);
    //     });
    // });
};

// Render country info
const renderCountryInfo = (countries) => {
    if (countries.length > 0) {
        const languagesArray = Object.values(countries[0].languages).join(", ");
        const populationValue = fixPopulationAmount(countries[0].population);

        const finalCountry = countries.map(({ name, flags, capital }) => {
        return `<div>
            <div style="display:flex; align-items:center; gap:10px; height:50px">
                <img src="${flags.svg}" alt="${flags.alt}" width=35 height=25 />
                <p style="font-size:24px; font-weight:bold; color:black">${name.official}</p>
            </div>
            <p><b>Capital</b>: ${capital}</p>
            <p><b>Population</b>: ${populationValue}</p>
            <p><b>Languages</b>: ${languagesArray}</p>
            </div>`;
        }).join("");

        countryInfo.innerHTML = finalCountry;
    }
};

// List reset
const clearMarkup = () => {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
};

// Fix population amount
const fixPopulationAmount = (number) => {
    let result = 0;
    if (number.toString().length >= 10) {
        result = `${round(number / 1000000000, 2)} mld`;
    } else if (number.toString().length >= 7) {
        result = `${round(number / 1000000, 2)} mln`;
    } else if (number.toString().length >= 4) {
        result = `${round(number / 1000, 0)} tys.`;
    }
    return result;
}

// Input listener
searchBox.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));