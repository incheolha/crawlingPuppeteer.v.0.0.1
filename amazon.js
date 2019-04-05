const puppeteer = require('puppeteer');

let browser = null;
let page = null;

const BASE_URL = 'https://amazon.com';

const amazon = {

    initialize: async () => {
        console.log('Starting the scraper....');
        browser = await puppeteer.launch({
            headless: false
        })
        page = await browser.newPage();

        //console을 통해 제공되는 모든 messages 이벤트를 확인하는 코드

        page.on('console', message => {
            console.log(`Message from puppeteer: ${message.text()}`);
        })


        await page.goto(BASE_URL, { waitUntil: 'networkidle2'});
        console.log('Initialization is completed...');
    },

    getProductDetails: async (link) => {
        console.log(`Going to the Product Page... ( ${link} )`);
        await page.goto(link, { waitUntil: 'networkidle2'});

        let details = await page.evaluate(() => {

            let title = document.querySelector('#productTitle').innerText;
            let manufacturer = document.querySelector('#bylineInfo').innerText;

            // 아마존은 다양한 형태의 가격정책을 설정하므로 해당 ID를 반드시 설정해주어야한다
            // 예를들면 어떤제품은 세일이 없는 가격이 있을수 있고 어떤제품은 deal한 가격이 있을수 있으므로
            // 해당 제품에 대한 가격 ID에 대한 scraping하때 모두 표기해야한다

            let currentPrice = document.querySelector('#priceblock_ourprice, #priceblock_dealprice').innerText;
            let rating = document.querySelector('#acrPopover').getAttribute('title');
            let reviewText = document.querySelector('#acrCustomerReviewText').innerText;

            console.log('text....');
            return {
                title,
                manufacturer,
                currentPrice,
                rating,
                reviewText
            }
        });
        return details;
    },

    end: async() => {
        console.log('Stopping the scraper....');
        await browser.close();

    }
}

module.exports = amazon;