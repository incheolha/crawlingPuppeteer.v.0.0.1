const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false
 //   devtools: true            // 자동으로 chrome browser의 inspector를 open해주는 tools

  });
  const page = await browser.newPage();
  await page.goto('https://naver.com');
  await page.type('#query', 'Udemy Tutorials', {delay: 100}); // Types slower, like a user
  await page.keyboard.press('Enter');
  await page.waitForNavigation();

  await page.screenshot({path: 'example.png'});

 await browser.close();
  
})();