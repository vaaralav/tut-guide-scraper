'use strict'

var scraper = {
	2015: require("./scraper2015")
};

/**
 * TESTING
 */

var fs = require('fs');

var departmentPage = fs.readFileSync("../www.tut.fi/wwwoppaat/opas2015-2016/perus/laitokset/Arkkitehtuuri/index.html", "UTF-8");
var coursePage = fs.readFileSync("../www.tut.fi/wwwoppaat/opas2015-2016/perus/laitokset/Arkkitehtuuri/ARK-11000.html", "UTF-8");


console.log(scraper["2015"].scrapeDepartment(departmentPage));
console.log(scraper["2015"].scrapeCourse(coursePage));
//console.log(page);


/**
 * Export tut-guide-scraper (with )
 */

exports = module.exports = scraper;

/*
  Export the version
*/

exports.version = require('./package').version;

