const osmosis = require("osmosis");
const atob = require('atob');
const fs = require('file-system');

const base = atob('aHR0cHM6Ly9lYmF5LmNvbS9zY2gvaS5odG1s');
const par = atob('P19ua3c9');

// Replacements
const sponPromo = atob('U1BPTlNPUkVE');
const newListPromo = atob('U1BPTlNPUkVE');

const testSearchTerm = 'xbox+360+console';

const date = Date.now();

let prodSearchUrl = base + par + testSearchTerm;

function fetchProdData() {
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
                list.push(scrubData(data));
            })
            .error(err => reject(err))
            .done(() => resolve(list));
    });
}

fetchProdData().then(list => {
    fs.writeFile(`./data/market/${date}/data.json`, JSON.stringify(list), (err) => {
        // console.log(list);
    });
});

function scrubData(data) {
    data.title = data.title.replace(sponPromo, '');
    data.title = data.title.replace(newListPromo, '');
    data.link = data.link.substring(0, data.link.indexOf('?'));
    data.price = data.price.replace('$', '');
    data.price = parseFloat(data.price);
    return data;
}