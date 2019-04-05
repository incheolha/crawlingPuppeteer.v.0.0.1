const puppeteer = require('puppeteer');
const twitter = require('./twitter');

(async () => {
  
  const USERNAME = 'incheolha@gmail.com';
  const PASSWORD = 'Tony4023933$';

  await twitter.initialize();

  await twitter.getTweets('Udemy');
//  await twitter.login(USERNAME, PASSWORD);
//  let details = await twitter.getUser('TechSavvyMobile');
// await twitter.postTweet('hello, this is the second tweet here..');
  
  debugger
 // await browser.close();
  
})();