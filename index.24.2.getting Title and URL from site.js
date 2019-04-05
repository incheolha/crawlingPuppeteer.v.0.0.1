const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true
 //   devtools: true            // 자동으로 chrome browser의 inspector를 open해주는 tools
  });

  const page = await browser.newPage();
  await page.goto('https://naver.com');
 
  // Getting URL and title of site
  // let title = await page.title();
  // console.log(`Title of the Page is ${title}`)
  // let url = await page.url();
  // console.log(`URL of the page is ${url}`);

  
  debugger
 // await browser.close();
  
})();