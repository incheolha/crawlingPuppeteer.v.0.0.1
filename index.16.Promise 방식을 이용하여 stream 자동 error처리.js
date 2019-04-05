const requestPromise = require('request-promise');  // es2016에 맞게 requesrt를 upgrade한버전
const request = require('request');     // 오리지날 버전

const cheerio = require('cheerio');
const fs = require('fs');
const URLS = [{ url: 'https://www.imdb.com/title/tt9914156/?ref_=vi_close', id: 'tony1' },
             { url: 'https://www.imdb.com/title/tt5968394/?ref_=inth_ov_i', id: 'tony2' }
            ];


(async () => {

    let movieData = [];
    for (let movie of URLS) {

        const response = await requestPromise({
                        url: movie.url,
                        headers: {
                            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                            'accept-encoding': 'gzip, deflate, br',
                            'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                            'cache-control': 'max-age=0',
                            'referer': 'https://www.imdb.com/title/tt9914156?ref_=vi_close',
                            'upgrade-insecure-requests': '1',
                            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
                        },
                        gzip: true
                    }
            );
            let $ = cheerio.load(response);

            let title = $('div[class="title_wrapper"] > h1').text().trim();
            let rating = $('div[class="ratingValue"] > strong > span').text();
            let poster = $('div[class="poster"] > a > img').attr('src');
            let totalRatings = $('div[class="imdbRating"] > a > span').text();
            let releaseDate = $('a[title="See more release dates"]').text();
            let user = $('#title-overview-widget > div.minPosterWithPlotSummaryHeight > div.plot_summary_wrapper > div.titleReviewBar > div > div:nth-child(2) > span > a').text().trim();
            let genres = [];
            $('div[class="title_wrapper"] a[href^="/genre/"]').each((i, ele) => {
                    let genre = $(ele).text();
                    genres.push(genre);
            });

            movieData.push({
                title,
                rating,
                poster,
                totalRatings,
                releaseDate,
                user,
                genres
            });

// fs stream을 사용할경우 반드시 close해야만 한다 그렇치 않으면 많은 파일을 다운로드시 많은 문제가 생긴다
// 다음 예제에서는 fs stream개량버전을 보자

        await new Promise((resolve, reject) => {
            let file = fs.createWriteStream(`${movie.id}.jpg`);
            let stream = request({
                url: poster,          // img poster url
                headers: {
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'accept-encoding': 'gzip, deflate, br',
                    'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                    'cache-control': 'max-age=0',
                    'upgrade-insecure-requests': '1',
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
                },
                gzip: true
            })
            .pipe(file)
            .on('finish', () => {
                console.log(`${movie.id} has finished downloading the image`);
                resolve(); })
            .on('error', (error) => {
                reject(error);
            })
        })
        .catch( error => {
            console.log(`${movie.id} has an error on download. ${error}` );
        });
            // Promise방식이 적동되는지 확인하는 모드
            // let test = new Promise( (resolve, reject) => {
            //     let is_home = true;
            //     if(is_home) {
            //         resolve('12345');
            //     } else {
            //         reject('its failed');
            //     }
            // })
            // .catch((error) => {
            //     console.log(error);
            // });
          
        }
})()


