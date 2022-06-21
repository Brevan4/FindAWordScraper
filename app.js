//'use strict';
const PORT = 5001;
const axios = require('axios').default;
const cheerio = require('cheerio');
const express = require('express');
//Using express for convinence please use 'npm run start' to start the program
const AppExpress = express();
//please enter var, seartches for 'lookfor' in entered web page under 'inp'
const inp = 'https://www.thisisbeacon.com/blog/';
const lookfor = 'blog';
AppExpress.listen(PORT, () => console.log("server running on PORT " + PORT));

badScraper(inp);
scrapeWebPage(inp)

//This function searches the webpages container classes for number of times the desired word appears.
function scrapeWebPage(rhsWebsite) {  
    axios(rhsWebsite).then((response) => response.data).catch((error) => { console.log("error: Website not found (func: scrapeWebPage)") }).then((response) => {
        const $ = cheerio.load(response);
        let amount = 0;
        $('.container').each((i,ele) => {     
            //$(ele).text().match(lookfor) ? amount++ : amount;
            $(ele).text().replace(/"/g, ' ').split(' ').forEach(function (item) {
                if (item.trim().includes(lookfor)) {
                    amount++;
                };
            })
        })       
        console.log(`The webpage for ${inp} contains the word ${lookfor}: ${amount} times.(Cap sensitive)`);
    })    
}
//This function will split the the html into strings and count the amount of strings containing the desired word.
function badScraper(rhsWebsite) {
    axios(rhsWebsite).then((response) => response.data).catch((error) => { console.log("error: Website not found (func: scrapeWebPage)") }).then((response) => {       
        var html = response;
        var amount = 0;
        html.toLowerCase().replace(/"/g, ' ' ).split(' ').forEach(function (item) {
            if (item.trim().includes(lookfor)) {                
                amount++;
            };            
        });
        console.log(`The HTML for ${inp} contains the word ${lookfor}: ${amount} times.(Not cap sensitive)`)
    })
}