'use strict'

var request = require('request');
//request.setCharacterEncoding("UTF-8");
var iconv = require('iconv-lite');

var scraper = {
	2015: require("./scraper2015")
};

/**
 * TESTING
 */

var fs = require('fs');


//var departmentPage = fs.readFileSync("../www.tut.fi/wwwoppaat/opas2015-2016/perus/laitokset/Arkkitehtuuri/index.html", "UTF-8");
//var coursePage = fs.readFileSync("../www.tut.fi/wwwoppaat/opas2015-2016/perus/laitokset/Arkkitehtuuri/ARK-11000.html", "UTF-8");

/**
 * Test Department Scraping
 */

request({
  uri: "http://www.tut.fi/wwwoppaat/opas2015-2016/perus/laitokset/Arkkitehtuuri/index.html",
  encoding: null,
  method: "GET"
  },
  function(err, res, body) {
    if(err) console.log("HTTP request failed!");

    body = fixCharset(res, body);
    console.log(scraper["2015"].scrapeDepartment(body));
}
);


/**
 * Test Course Scraping
 */

request({
  uri: "http://www.tut.fi/wwwoppaat/opas2015-2016/perus/laitokset/Arkkitehtuuri/ARK-11000.html",
  encoding: null,
  method: "GET"
},  function(err, res, body) {
  if(err) console.log("HTTP request failed!");

  body = fixCharset(res, body);

  console.log(scraper["2015"].scrapeCourse(body));
});

var fixCharset = function fixCharset(res, body) {
  var charset = res.headers["content-type"].split("=", 2)[1].toLowerCase();

  var buf = new Buffer(body)
  return iconv.decode(buf, charset);
}

//console.log(scraper["2015"].scrapeDepartment(departmentPage));
//console.log(scraper["2015"].scrapeCourse(coursePage));
//console.log(page);


/**
 * Export tut-guide-scraper (with )
 */

exports = module.exports = scraper;

/*
  Export the version
*/

exports.version = require('./package').version;

