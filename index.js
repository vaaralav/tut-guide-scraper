'use strict'
var scraper2015 = require("./scraper2015");
var fs = require('fs');

var page = fs.readFileSync("../www.tut.fi/wwwoppaat/opas2015-2016/perus/laitokset/Arkkitehtuuri/ARK-11000.html", "UTF-8");


console.log(scraper2015.scrapeCourse(page));
//console.log(page);
