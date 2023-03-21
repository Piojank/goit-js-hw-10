export function fetchCountries(name) {
    const API = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

    return fetch(API).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
            console.log(response);
            return response.json();
        })
    .catch(error => console.log(error));
}
