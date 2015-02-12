/**
 * Sample command-line app, useful for testing providers and 
 * search query stuff.
 */

var megaSearch = require('./providers/all');

var query = {fname:'', lname:'Anderson', city:'', state:'MN' };

megaSearch.search(query).then(console.log).done();

