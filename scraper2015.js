"use strict"

var cheerio = require('cheerio');

/**
 * Scrapes a department page for courses
 * @param  {String} page HTML page as a String
 * @return {Object}      Array of Courses offered by the department
 */
var scrapeDepartment = function scrapeDepartment(page) {
	//console.log("Scraping department page...");
	var $ = cheerio.load(page,{ignoreWhitespace: true, decodeEntities: true});

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
		courses.push(course);
	});
	return courses;
}

/**
 * Scrapes a course page
 * @param  {String} page Course page as a string
 * @param  {Object} Options such as {textOnly: true}
 * @return {Object}      Course object
 *                              - {String} code
 *                              - {String} name
 *                              - {String} credits
 *                              - {Array.<Object>} info
 *                                - {String} title
 *                                - {String} type
 *                                - {String} content
 */
var scrapeCourse = function scrapeCourse(page, options) {
	var $ = cheerio.load(page,{ignoreWhitespace: true, decodeEntities: true});
	var h1 = $("article h1").text().trim();

	// Get basic info about the course from the heading
	var course = splitCourseHeading(h1);
  // Collect other stuff here
  course.info = [];

  // Default function without any options
  if(!options) {

    $("article h4").each(function readCourseItem(index, element) {
      var title = $(this).text();
      var type = "?";
      var content = "";
      var iter = $(this).next();

      while($(iter)["0"] && $(iter)["0"].name !== "h4") {

      if (!$(iter).text() || $(iter).text().length === 0) {
        iter = $(iter).next();
        continue;
      }
      if($(iter)["0"].name === "p") {
        content += $(iter).text();
        iter = $(iter).next();
        type = "text";
        continue;
      }
      content += $(iter).text();
      iter = $(iter).next();

    }
    //var content = $(this).nextUntil("h4").text().trim();



    //console.log(content);

    course.info.push({
      title: title,
      type: type,
      content: content
    });
  });

  }

	return course;
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

	// Check for dumb text
	if(!heading || heading.length === 0 ) {
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
