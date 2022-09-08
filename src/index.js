import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

const search = () => {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    const countries = [];
    const value = input.value.trim();

    if (value) {
        fetchCountries(value)
            .then(data => {
                countries.push(...data);
                if (countries.length > 10) return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                if (countries.length === 1) {
                    countryInfo.innerHTML = `
                        <div style="display: flex; align-items: center;">
                            <img src="${countries[0].flags.svg}"/>
                            <h1>${countries[0].name}</h1>
                        </div>
                        <ul>
                            <li>
                                <span>Capital:</span><p>${countries[0].capital}</p>
                            </li>
                            <li>
                                <span>Population:</span><p>${countries[0].population}</p>
                            </li>
                            <li>
                                <span>Languages:</span><p>${countries[0].languages.map(lng => lng.name).join(', ')}</p>
                            </li>
                        </ul>
                    `;
                } else {
                    for (const country of countries) {
                        countryList.innerHTML += `
                            <li>
                                <img src="${country.flags.svg}"/>
                                <p>${country.name}</p>
                            </li>
                        `;
                    };
                };
            })
            .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
    };
}

input.addEventListener('input', debounce(search, DEBOUNCE_DELAY));