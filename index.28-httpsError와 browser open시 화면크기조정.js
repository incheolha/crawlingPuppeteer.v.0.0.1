const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
      //만일 HttpsErrors 메세지를 모시하고 싶을때
      ignoreHTTPSErrors: true,
      // puppeteer 기본 포틔 800 * 600 이 브라우저 오픈시 크기를 바꾸기를 원할때
      defaultViewport: {
        width: 1920,
        height: 1080
      }
 //   devtools: true            // 자동으로 chrome browser의 inspector를 open해주는 tools
  });


  const page = await browser.newPage();

  await page.goto('https://amazon.com');
  
  debugger
 // await browser.close();
  
})();