// const request = require('request-promise');
const request = require('requestretry').defaults({ fullResponse: false });

const cheerio = require('cheerio');

const ObjectToCSV = require('objects-to-csv');

const url = 'https://sfbay.craigslist.org/d/softeware-qa-dba-etc/search/sof';

const scrapeResult = {
    title: 'Salesforce Consultant Opportunity - Flexible, Hourly',
    description: 'Third Wave Analytics (www.thirdwaveanalytics.com), a start-up Salesforce consulting firm headquartered in the Bay Area, provides Salesforce implementation services to life science and healthcare companies that are on the forefront of personalized medicine.',
    datePosted: new Date('2018-12-05'),
    url: 'https://sfbay.craigslist.org/sfc/sof/d/salesforce-consultant/6765691657.html',
    hood: 'SOMA / south beach',
    compensation: 'DOE',
    employmentType: 'part-time',
    telecommuting: 'okay',
    adddress: 'Legal to 50 Beale Street',
    state: 'CA'
}

const scrapeResults = [];

async function scrapeJobHeader() {
    
    try {
        const htmlReqult = await request.get(url);
        const $ = await cheerio.load(htmlReqult);
 
        $('.result-info').each((index, element) => {
            const resultTitle = $(element).children('.result-title');
            const title = resultTitle.text();
            const url = resultTitle.attr('href');
            const datePosted = new Date($(element).children('time').attr('datetime'));
            const hood = $(element).find('.result-hood').text();
            const scrapeResult = { title, url, datePosted, hood };
            scrapeResults.push(scrapeResult);
        });
        return scrapeResults;
    } catch (error) {
        console.log(error);
    }
}

async function scrapeJobDescription(jobWithHeaders) {
  return await Promise.all(
        jobWithHeaders.map(async job => {
            try {
                const htmlResult = await request.get(job.url);
                const $ = await cheerio.load(htmlResult);
                $('.print-qrcode-container').remove();
                job.description = $('#postingbody').text();
                job.adddress = $('div.mapaddress').text();
                const compensationText = $('.attrgroup').children().first().text();
                job.compensation = compensationText.replace('compensation: ', '');
                return job;
            } catch (error) {
                console.log(error);
            }
   
        })
    );
}

async function scrapeCraiglist() {
    const jobWithHeaders = await scrapeJobHeader();
    console.log(jobWithHeaders);
    const jobsFullData = await scrapeJobDescription(jobWithHeaders);
    await createCSvFile(jobsFullData);
    console.log(jobsFullData);
    console.log(jobsFullData.length);
}

async function createCSvFile(data) {
    let csv = new ObjectToCSV(data);
    await csv.toDisk('./test.csv');
}
scrapeCraiglist();