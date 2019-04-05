const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
(async () => {
  const browser = await puppeteer.launch({
    headless: false
 //   devtools: true            // 자동으로 chrome browser의 inspector를 open해주는 tools
  });


  const page = await browser.newPage();
  await page.goto('https://instagram.com/');
  await page.waitFor('a[href="/accounts/login/?source=auth_switcher"]');
  await page.click('a[href="/accounts/login/?source=auth_switcher"]');
  await page.waitFor(500);
  // waitFor를 사용하는 이유는 사용자가 로그인을 클릭한것처럼 하기위해서 반드시 필요
  await page.waitFor('input[name="username"]');
  await page.type('input[name="username"]', 'incheolha@gmail.com');
  await page.type('input[name="password"]', '359000aa');
  
  // react방식으로 버튼이 구성되어있다면 반드시 selector를 react button을 선택하여야만 한다
  await page.click('#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(3) > button');
  
  debugger
 // await browser.close();
  
})();