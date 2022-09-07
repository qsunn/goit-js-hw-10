export async function fetchCountries(name) {
    const response = await fetch(`https://restcountries.com/v2/name/${name}`);
    const data = await response.json();
    return data;
};