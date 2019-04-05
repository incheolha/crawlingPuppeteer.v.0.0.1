const puppeteer = require('puppeteer');

const BASEURL = 'https://twitter.com/';
const LOGINURL = 'https://twitter.com/login/';

let browser = null;
let page = null;

const twitter = {
    initialize: async() => {
        browser = await puppeteer.launch({
            headless: false
        });
        page = await browser.newPage();
        await page.goto(BASEURL);
    },
    login: async(username, password) =>  {

        await page.goto(LOGINURL);
        // waitFor를 사용하는 이유는 사용자가 로그인을 클릭한것처럼 하기위해서 반드시 필요
        // await page.waitFor('input[name="session[username_or_email]"]');
        // await page.type('input[name="session[username_or_email]"]', USERNAME);

        await page.waitFor('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]');
        await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]', username, { delay: 25 });

        await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[password]"]', password);
        
        // react방식으로 버튼이 구성되어있다면 반드시 selector를 react button을 선택하여야만 한다
        await page.click('button[type="submit"][class="submit EdgeButton EdgeButton--primary EdgeButtom--medium"]');
  
    },
    end: async () => {
        await browser.close();
    }
};

module.exports = twitter;