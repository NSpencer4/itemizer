const osmosis = require("osmosis");
const atob = require('atob');
const fs = require('file-system');

const base = 'aHR0cHM6Ly9lYmF5LmNvbS9zY2gvaS5odG1s';
const par = 'P19ua3c9';
const testSearchTerm = 'xbox+360+console';

const date = Date.now();

let prodSearchUrl = atob(base) + atob(par) + testSearchTerm;

function prodSearch() {
    return new Promise((resolve, reject) => {
        let list = [];

        osmosis
        // Scrape top free apps
            .get(prodSearchUrl)
            // All apps exist inside of a div with class card-content
            .find('.s-item__wrapper')
            // Create an object of data
            .set({
                price: '.s-item__price',
                link: 'a.s-item__link@href',
                title: '.s-item__title'
            })
            .data(data => {
                // Each iteration, push the data into our array
                list.push(data);
            })
            .error(err => reject(err))
            .done(() => resolve(list));
    });
}

prodSearch().then(list => {
    fs.writeFile(`./data/market/${date}/data.json`, JSON.stringify(list), (err) => {
        console.log(list);
    });
});