const request = require('request-promise');
const cheerio = require('cheerio');
(async () => {

    const USERNAME = 'willsmith'
    // const BASE_URL = 'https://instagram.com' + USERNAME;  일번적인 자바스크립 언어사용시
    const BASE_URL = `https://instagram.com/${USERNAME}`;    // es2016버젼
    
    let response = await request(BASE_URL);

  //  console.log(response);          1번

    let $ = cheerio.load(response);

    // syntax 설명
    // type=text/javascript검색결과 4번째에 위치한 JSON데이타를 가져오도록 한다
    
    let script = $('script[type="text/javascript"]').eq(3).html();   // 원하는 위치의 정보만 가저온다
       
    let script_regex = /window._sharedData = (.+);/g.exec(script);
    let instagram_data = JSON.parse(script_regex[1]);
    console.log(instagram_data);
    debugger;
})();