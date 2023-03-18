const puppeteer = require('puppeteer');
const url = require('url');

const inputUrl = 'https://ringbell-marriage.com/';

const containURL = (href, inputUrl) => {
    const parsedUrl = url.parse(inputUrl);
    if(href.toString().indexOf(parsedUrl.hostname.toString()) !== -1){
        return true
    }
    return false;
};

const getHref = async (inputUrl) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(inputUrl);
    const hrefs = await page.$$eval('a', (links) => {
        return links.map((link) => {
            return link.href
        });
    });
    const correctHref = hrefs.filter((href, index) => {
        return containURL(href, inputUrl) && hrefs.indexOf(href) === index;
    });
    console.log(correctHref);
    await browser.close();
    return correctHref;
};

getHref(inputUrl);