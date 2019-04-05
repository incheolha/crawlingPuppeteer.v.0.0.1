const puppeteer = require('puppeteer');

const BASEURL = 'https://twitter.com/';
const LOGINURL = 'https://twitter.com/login/';
const USERNAME_URL = (username) => `https:/twitter.com/${username}`;
// 위에 있는 코딩과 같은 구버전 구문
// const USERNAME_URL = function(username) {
//     return 'htts://twitter.com/'+ username;
// }

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
        // 실제 로그인한후 5초를 기다리게 한후 tweet값을 posting한다
        await page.waitFor('#tweet-box-home-timeline');
        await page.waitFor(1000);
  
    },
    postTweet: async (message) => {

        // tweet에 이미 로그인하였는지 안하였는지를 확인하는 과정

        let url = await page.url();
        if (url != BASEURL) {
            await page.goto(BASEURL);
        }
        
        await page.waitFor('#tweet-box-home-timeline');   // text box id 삽입
        await page.click('#tweet-box-home-timeline');     // text box id 클릭
        await page.waitFor(500);                          // 0.5초 기다린다
        await page.keyboard.type(message, { delay: 50 });  // 실제 메세지 삽입

        // tweet button을 클릭한다
        await page.click('button[class="tweet-action EdgeButton EdgeButton--primary js-tweet-btn"]');
    },
    getUser: async (username) => {
        let url = await page.url();
        if(url != USERNAME_URL(username)) {
            await page.goto(USERNAME_URL(username));
        }
        await page.waitFor('h1[class="ProfileHeaderCard-name"] > a');

        // 사용자 이름만 뽑아낼때 사용
        // let user = await page.evaluate(() => {
        //     return document.querySelector('h1[class="ProfileHeaderCard-name"] > a').innerText;  //udemy이름을 가져온다
        // })

        let details = await page.evaluate(() => {
            return {
                    fullname: document.querySelector('h1[class="ProfileHeaderCard-name"] > a').innerText,  //udemy이름을 가져온다 
                    description: document.querySelector('p[class="ProfileHeaderCard-bio u-dir"]').innerText,  // description 정보가져오기
                    followers: document.querySelector('li[class="ProfileNav-item ProfileNav-item--followers"] > a > span[data-count]').getAttribute('data-count') // followers정보가져오기

        }
        })

        debugger;
    },

    end: async () => {
        await browser.close();
    }
};

module.exports = twitter;