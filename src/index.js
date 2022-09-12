import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

const createCountryInfo = (data) => {
    return `
        <div style="display: flex; align-items: center;">
            <img src="${data[0].flags.svg}"/>
            <h1>${data[0].name}</h1>
        </div>
        <ul>
            <li>
                <span>Capital:</span><p>${data[0].capital}</p>
            </li>
            <li>
                <span>Population:</span><p>${data[0].population}</p>
            </li>
            <li>
                <span>Languages:</span><p>${data[0].languages.map(lng => lng.name).join(', ')}</p>
            </li>
        </ul>
    `;
};

const createCountryList = (country) => {
    return `
        <li>
            <img src="${country.flags.svg}"/>
            <p>${country.name}</p>
        </li>
    `;
};

const search = () => {
    const value = input.value.trim();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    if (value) {
        fetchCountries(value)
            .then(data => {
                if (data.length > 10) return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                if (data.length === 1) return countryInfo.innerHTML = createCountryInfo(data);
                for (const country of data) {
                    countryList.innerHTML += createCountryList(country);
                };
            })
            .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
    };
};

input.addEventListener('input', debounce(search, DEBOUNCE_DELAY));