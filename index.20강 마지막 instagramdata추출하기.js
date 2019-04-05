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

    // 실제 우리가 원하고자하는 정보영역
    // object.entry_data.ProfilePage[0].graphql.user
  
  // 단계 1: ProfilePage를 보고자 할때
  // let { entry_data: { ProfilePage } } = JSON.parse(script_regex[1]);
  //  console.log(ProfilePage);

  // 단계 2: ProfilePage중 array[0]를 보고자 할때
  // let { entry_data: { ProfilePage: { [0] : test } } } = JSON.parse(script_regex[1]);
  //  console.log(test);

   // 단계 3: ProfilePage중 array[0] > graphql > user 정보를 보고자 할때
  // let { entry_data: { ProfilePage: { [0] : { graphql: { user } } } } } = JSON.parse(script_regex[1]);
  //  console.log(user);

  // 단계 4: 실제 user정보를 사용자 정의 json object를 만든다
  let { entry_data: { ProfilePage: { [0] : { graphql: { user } } } } } = JSON.parse(script_regex[1]);
   
  let instagram_data1 = {
    followers: user.edge_followed_by.count,
    following: user.edge_follow.count,
    uploads: user.edge_owner_to_timeline_media.count,
    fullname: user.full_name,
    picture_url: user.profile_pic_url_hd
  }
  
  console.log(instagram_data1);


    debugger;
})();