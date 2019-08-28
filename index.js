const osmosis = require("osmosis");
const atob = require('atob');
const fs = require('file-system');

// Main Cfg
const ebase = atob('aHR0cHM6Ly9lYmF5LmNvbS9zY2gvaS5odG1s');
const ebaseSuffix = atob('P19ua3c9');
const soldParam = atob('JkxIX1NvbGQ9MQ==');
const completedParam = atob('JkxIX0NvbXBsZXRlPTE=');

// Replacements
const sponPromo = atob('U1BPTlNPUkVE');
const newListPromo = atob('TmV3IExpc3Rpbmc=');

// Prod term
const activeProdsSearchTerm = 'xbox+360+console';

const date = Date.now();

// URLs
let prodSearchUrl = ebase + ebaseSuffix + activeProdsSearchTerm;
let completedSoldSearchUrl = ebase + ebaseSuffix + activeProdsSearchTerm + soldParam + completedParam;

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
                shipping: 'div.s-item__info > div.s-item__details > span.s-item__shipping',
                link: 'a.s-item__link@href',
                condition: '.SECONDARY_INFO',
                title: '.s-item__title'
            })
            .data(data => {
                data = scrubData(data);
                list.push(data);
            })
            .error(err => reject(err))
            .done(() => resolve(list));
    });
}

function fetchSoldData() {
    return new Promise((resolve, reject) => {
        let list = [];

        console.log(completedSoldSearchUrl);
        osmosis
        // Scrape top free apps
            .get(completedSoldSearchUrl)
            // All apps exist inside of a div with class card-content
            .find('.s-item__wrapper')
            // Create an object of data
            .set({
                price: '.s-item__price',
                shipping: 'div.s-item__info > div.s-item__details > span.s-item__shipping',
                link: 'a.s-item__link@href',
                condition: '.SECONDARY_INFO',
                title: '.s-item__title',
                soldDate: 'div.s-item__title--tag'
            })
            .data(data => {
                data = scrubData(data);
                list.push(data);
            })
            .error(err => reject(err))
            .done(() => resolve(list));
    });
}

function scrubData(data) {
    data.title = data.title.replace(sponPromo, '');
    data.title = data.title.replace(newListPromo, '');
    data.link = data.link.substring(0, data.link.indexOf('?'));
    if (data.soldDate) {
        data.soldDate = data.soldDate.replace('Sold', '').trim();
    }
    if (data.title && data.title.indexOf(data.soldDate)) {
        data.title = data.title.substring(data.title.indexOf(data.soldDate), data.title.length);
        data.title = data.title.replace(data.soldDate, '');
    }
    data.price = data.price.replace('$', '');
    data.price = parseFloat(data.price);
    return data;
}

fetchProdData().then(list => {
    fs.writeFile(`./data/active/${date}/data.json`, JSON.stringify(list), (err) => {
        // console.log(list);
    });
});

fetchSoldData().then(list => {
    fs.writeFile(`./data/sold/${date}/data.json`, JSON.stringify(list), (err) => {
        // console.log(list);
    });
});