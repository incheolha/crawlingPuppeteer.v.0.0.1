const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--proxy-server=127.0.0.1:9876']
 //   devtools: true            // 자동으로 chrome browser의 inspector를 open해주는 tools
  });


  const page = await browser.newPage();

  await page.goto('https://amazon.com/');
  
  debugger
 // await browser.close();
  
})();