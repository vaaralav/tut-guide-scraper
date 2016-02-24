'use strict'

var scraper = {
	2015: require("./scraper2015")
};

/**
 * Export tut-guide-scraper (with )
 */

exports = module.exports = scraper;

/*
  Export the version
*/

exports.version = require('./package').version;

