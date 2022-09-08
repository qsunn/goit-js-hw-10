export async function fetchCountries(name) {
    const response = await fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`);
    const data = await response.json();
    console.log(data)
    return data;
};