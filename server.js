// const cheerio = require('cheerio');
// const axios = require('axios');


// const proxy = {
//     protocol: 'http',
//     host: '140.227.210.163', // Free proxy from the list 
//     port: 3128,
// };

// (async () => {
//     const { data } = await axios.get('https://www.nike.com/jp/w/baby-toddler-kids-shoes-2j488zv4dhzy7ok', { proxy });
//     console.log(data);
//     // const $ = cheerio.load(data);
//     // console.log($);
//     // { origin: '202.212.123.44' } 
// })(); 


const playwright = require('playwright');
const axios = require('axios');
const cheerio = require('cheerio');

const getHtmlPlaywright = async url => {
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url);
    const html = await page.content();
    await browser.close();

    return html;
};

const getHtmlAxios = async url => {
    const { data } = await axios.get(url);

    return data;
};

(async () => {
    const html = await getHtmlPlaywright('https://www.nike.com/jp/w/baby-toddler-kids-shoes-2j488zv4dhzy7ok');
    const $ = cheerio.load(html);
    const content = extractContent($);
    console.log('getHtmlPlaywright', content);
})();

// (async () => {
//     const html = await getHtmlAxios('https://www.nike.com/jp/w/baby-toddler-kids-shoes-2j488zv4dhzy7ok');
//     const $ = cheerio.load(html);
//     const content = extractContent($);
//     console.log('getHtmlAxios', content);
// })();

const extractContent = $ =>
    $('.product-card')
        .map((_, product) => {
            const $product = $(product);

            return {
                // img: $product.find('a[class="product-card__img-link-overlay]').attr('href'),
                title: $product.find('.product-card__link-overlay').text(),
                img: $product.find('.product-card__img-link-overlay').attr('href'),
                price: $product.find('.product-price').text(),
            };
        })
        .toArray(); 
