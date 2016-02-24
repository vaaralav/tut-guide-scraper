"use strict"

var cheerio = require('cheerio');

/**
 * Scrapes a department page for courses
 * @param  STRING page HTML page as a String
 * @return OBJECT      Array of Courses offered by the department
 */
var scrapeDepartment = function scrapeDepartment(page) {
	var $ = cheerio.load(page,{ignoreWhitespace: true});

	// Get the department name and trim any extra whitespace
	var department = $("article h2").text().trim();
	var courses = [];
	
	// Read list of course links
	$("article ul li a").each(function readCourse(i, element) {
		// Get a link to a course and trim extra whitespace.
		var text = $(this).text().trim();

		// This course will be added to courses
		var course = splitCourseHeading(text);
		course.url = $(this).attr("href");
		course.department = department;
		console.log("Read course:\n" + JSON.stringify(course, null, 2));
		courses.push(course);
	});

	return courses;
}

/**
 * [scrapeCourse description]
 * @param  {[type]} page [description]
 * @return {[type]}      [description]
 */
var scrapeCourse = function scrapeCourse(page) {
	var $ = cheerio.load(page,{ignoreWhitespace: true});
	var h1 = $("article h1").text().trim();
	var course = {
		code: h1.split(" ",1)[0],
	}

	console.log($("article h1").text().trim().split(" ",1)[0]);
}

/**
 * Splits course heading eg. "ARK-11000 Johdatus yliopisto-opintoihin, 2 op"
 * @param  {String} heading Course code name and credits in one string.
 * @return {Object}         Course object with
 *                                 - code {String} Course code
 *                                 - name {String} Course name
 *                                 - credits {String} How many credits one gets 
 *                                 from the course
 *                          Return null if the heading param is invalid.
 */
var splitCourseHeading = function splitCourseHeading(heading) {
	// Remove extra white space
	heading = heading.trim();

	if(!heading || heading.length == 0 ) {
		return null;
	}

	return {
		code: heading.split(" ",1)[0],
		name: heading.slice(heading.indexOf(" ") + 1, heading.lastIndexOf(",")),
		credits: heading.slice(heading.lastIndexOf(", ") + 2, heading.lastIndexOf(" op")),
	}
}


module.exports = {
	scrapeDepartment: scrapeDepartment,
	scrapeCourse: scrapeCourse
};
