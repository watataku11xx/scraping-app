const axios = require('axios');
const cheerio = require('cheerio');

async function getTextFromUrl(url) {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const text = $('body').text().replace(/\s+/g, ' ').trim();
    return text;
}

getTextFromUrl('https://www.alpha.co.jp/biz/devel/strength/')
    .then(text => console.log(text))
    .catch(error => console.error(error));