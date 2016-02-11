"use strict"

var cheerio = require('cheerio');

/**
 * Scrapes a department page for courses
 * @param  {[type]} page [description]
 * @return {[type]}      Courses offered by the department
 */
var scrapeDepartment = function scrapeDepartment(page) {
	var $ = cheerio.load(page,{ignoreWhitespace: true});

	// Get the department name and trim any extra whitespace
	var department = $("article h2").text().trim();
	var courses = [];
	
	$("article ul li a").each(function readCourse(i, element) {
		// Get a link to a course and trim extra whitespace.
		var text = $(this).text().trim();

		// This course will be added to courses
		var course = {
			// The course code. Eg. ARK-94006
			// STRING
			code: text.split(" ",1)[0],
			url: $(this).attr("href"),
			department: department
		};
		courses.push(course);
	});

	return courses;
}


var scrapeCourse = function scrapeCourse(page) {
	var $ = cheerio.load(page,{ignoreWhitespace: true});
}

module.exports = {
	scrapeDepartment: scrapeDepartment
};
