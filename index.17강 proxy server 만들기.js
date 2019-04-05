const request = require('request-promise').defaults({
    // 실제 가상 ip 주소를 사용하여 proxy 서버를 설정하는방법
    // proxy: 'http://user:password@ip:port'
    
    proxy: 'http://193.168.10.12:8080'

});

(async () => {
    let response = await request('https://httpbin.org/ip');
    debugger;
})();