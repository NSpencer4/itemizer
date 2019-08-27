const osmosis = require("osmosis");
const fs = require('file-system');

const baseUrl = '1566941652965';
const searchParam = '1566941680530';
const testSearchTerm = 'xbox+360+console';

const date = Date.now();

let testUrl = baseUrl + searchParam + testSearchTerm;

function topFreeApps() {
    return new Promise((resolve, reject) => {
        let list = [];

        osmosis
        // Scrape top free apps
            .get(testUrl)
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

topFreeApps().then(list => {
    fs.writeFile(`./data/market/${date}/data.json`, JSON.stringify(list), (err) => {
        console.log(list);
    });
});