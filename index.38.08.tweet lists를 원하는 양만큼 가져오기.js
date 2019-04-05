const puppeteer = require('puppeteer');
const twitter = require('./twitter.38.08. 원하는 만큼의 tweet 명단을 가져오기');

(async () => {
  
  const USERNAME = 'incheolha@gmail.com';
  const PASSWORD = 'Tony4023933$';

  await twitter.initialize();

  await twitter.getTweets('Udemy', 50);
//  await twitter.login(USERNAME, PASSWORD);
//  let details = await twitter.getUser('TechSavvyMobile');
// await twitter.postTweet('hello, this is the second tweet here..');
  
  debugger
 // await browser.close();
  
})();