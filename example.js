"use strict"

var request = require('request'),
    iconv = require('iconv-lite'),
    scraper = require('./index.js');

var fixCharset = function fixCharset(res, body) {
  var charset = res.headers["content-type"].split("=", 2)[1].toLowerCase();

  var buf = new Buffer(body)
  return iconv.decode(buf, charset);
}


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
