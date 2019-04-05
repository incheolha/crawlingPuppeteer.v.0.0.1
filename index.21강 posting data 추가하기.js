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
  // let { entry_data: { ProfilePage: { [0] : { graphql: { user } } } } } = JSON.parse(script_regex[1]);
 
  // 이제 가장 최근에 posting된 내용을 가져오기로 하자
  // 먼저 regex를 사용하여 JSON parse한다
  // 최근에 posting된 내용을 접어넣기 위한 array를 설정한다
  // es2016을 사용하여 data를 추출한다
  // entry_data > ProfilePage > graphql > user > edge_owner_to_timeline_media > edges 를 위치시킨다
  // 최신 posting 정보가 총 12개로 구성된 array임을 확인할수 있으면 이것을 우리가 구성한 posts array에
  // JSON object형태로 저장한다.
  // 저장한  data안 posts를 instagram_data1에 통합한다
  
  let instagram_data = JSON.parse(script_regex[1]);
  let posts = [];
  let { entry_data: { ProfilePage: { [0] : { graphql: { user : { edge_owner_to_timeline_media : { edges }} } } } } } = JSON.parse(script_regex[1]);
   
    for ( let edge of edges ) {
      let { node } = edge;

      posts.push({
        id: node.id,
        shortcode: node.shortcode,
        timestamp: node.taken_at_timestamp,
        likes: node.edge_media_to_comment.count,
        comments: node.edge_media_to_comment.count,
        video_views: node.video_views_count,
        caption: node.edge_media_to_caption.edges[0].node.text,
        image_url: node.display_url
      })
    }
  
      
  let instagram_data1 = {
    followers: user.edge_followed_by.count,
    following: user.edge_follow.count,
    uploads: user.edge_owner_to_timeline_media.count,
    fullname: user.full_name,
    picture_url: user.profile_pic_url_hd,
    posts
  }
 
  console.log(instagram_data1);
  debugger;
})();