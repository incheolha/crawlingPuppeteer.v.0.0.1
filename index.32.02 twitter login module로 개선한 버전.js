const puppeteer = require('puppeteer');
const twitter = require('./twitter31.02 최초버전');

(async () => {
  
  const USERNAME = 'incheolha@gmail.com';
  const PASSWORD = 'Tony4023933$';

  await twitter.initialize();

  await twitter.login(USERNAME, PASSWORD);
  
  debugger
 // await browser.close();
  
})();