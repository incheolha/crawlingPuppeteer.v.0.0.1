const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true
 //   devtools: true            // 자동으로 chrome browser의 inspector를 open해주는 tools
  });

  const page = await browser.newPage();
  await page.goto('https://naver.com');
  await page.pdf({
    path: './naver.pdf',
    format: 'A4'
  })
  debugger
 // await browser.close();
  
})();