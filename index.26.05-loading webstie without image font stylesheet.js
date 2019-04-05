const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  
    
 //   devtools: true            // 자동으로 chrome browser의 inspector를 open해주는 tools
  });


  const page = await browser.newPage();
  await page.setRequestInterception(true);

  page.on('request', (request) => {
  //  if(request.resourceType() == 'image' || request.resourceType() == 'stylesheet') {
    if(['image', 'stylesheet', 'font'].includes(request.resourceType())) {
     request.abort();
    } else {
      request.continue();
    }
  })

  await page.goto('https://amazon.com');
  
  debugger
 // await browser.close();
  
})();