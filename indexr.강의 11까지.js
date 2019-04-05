// const request = require('request-promise');
const request = require('request-promise');

const cheerio = require('cheerio');

const URL = 'https://www.imdb.com/title/tt9914156/?ref_=vi_close';

(async () => {
    const response = await request({
                url: URL,
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
    let genres = [];
    $('div[class="title_wrapper"] a[href^="/genre/"]').each((i, ele) => {
            let genre = $(ele).text();
            genres.push(genre);
    });
    console.log(`Title: ${title}`);
    console.log(`rating: ${rating}`);
    console.log(`poster: ${poster}`);
    console.log(`totalRatings: ${totalRatings}`);
    console.log(`releaseDate: ${releaseDate}`);
    console.log(`genres: ${genres}`);
    
})()

