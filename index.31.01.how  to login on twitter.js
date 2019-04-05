const puppeteer = require('puppeteer');
(async () => {
  const BASEURL = 'https://twitter.com/';
  const LOGINURL = 'https://twitter.com/login/';
  const USERNAME = 'incheolha@gmail.com';
  const PASSWORD = 'Tony4023933$';

  const browser = await puppeteer.launch({
    headless: false
  });


  const page = await browser.newPage();
  await page.goto(LOGINURL);
  // waitFor를 사용하는 이유는 사용자가 로그인을 클릭한것처럼 하기위해서 반드시 필요
  // await page.waitFor('input[name="session[username_or_email]"]');
  // await page.type('input[name="session[username_or_email]"]', USERNAME);

  await page.waitFor('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]');
  await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]', USERNAME, { delay: 25 });

  await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[password]"]', PASSWORD);
  
  // react방식으로 버튼이 구성되어있다면 반드시 selector를 react button을 선택하여야만 한다
  await page.click('button[type="submit"][class="submit EdgeButton EdgeButton--primary EdgeButtom--medium"]');
  
  debugger
 // await browser.close();
  
})();