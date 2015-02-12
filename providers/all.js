/**
 * Contains all of the races/events that we're interested in.
 */
var bluebird = require('bluebird');

var mtec = require('./mtec');

var allProviders = [];
allProviders.push(mtec(198, "Monster Dash 2010 Ten Mile"));
allProviders.push(mtec(197, "Monster Dash 2010 Half Marathon"));
allProviders.push(mtec(560, "Monster Dash 2011 Ten Mile"));
allProviders.push(mtec(561, "Monster Dash 2011 Half Marathon"));
allProviders.push(mtec(1224, "Monster Dash 2012"));
allProviders.push(mtec(1937, "Monster Dash 2013"));
allProviders.push(mtec(2771, "Monster Dash 2014"));


allProviders.push(mtec(176, "Twin Cities Ten Mile 2010"));
allProviders.push(mtec(177, "Twin Cities Marathon 2010"));
allProviders.push(mtec(509, "Twin Cities Ten Mile 2011"));
allProviders.push(mtec(507, "Twin Cities Marathon 2011"));
allProviders.push(mtec(1141, "Twin Cities Ten Mile 2012"));
allProviders.push(mtec(1146, "Twin Cities Marathon 2012"));
allProviders.push(mtec(1762, "Twin Cities Ten Mile 2013"));
allProviders.push(mtec(1760, "Twin Cities Marathon 2013"));
allProviders.push(mtec(2571, "Twin Cities Ten Mile 2014"));
allProviders.push(mtec(2569, "Twin Cities Marathon 2014"));

// Seems that mtec will search and return results from both
//    the half marathon and the full marathon.
//allProviders.push(mtec(365, "Grandma's Half Marathon 2011"));
allProviders.push(mtec(355, "Grandma's Marathon 2011"));
//allProviders.push(mtec(735, "Grandma's Half Marathon 2012"));
allProviders.push(mtec(734, "Grandma's Marathon 2012"));
//allProviders.push(mtec(1394, "Grandma's Half Marathon 2013"));
allProviders.push(mtec(1393, "Grandma's Marathon 2013"));
//allProviders.push(mtec(2165, "Grandma's Half Marathon 2014"));
allProviders.push(mtec(2164, "Grandma's Marathon 2014"));

// mtec query string/args:
// "?fname=first&lname=last&bib=bib&city=city&state=state"

module.exports = allProviders;

/**
 * Searches all of the providers and all of the races for the
 * given object of information. Returns a promise which resolves
 * when all of the individual promises have resolved.
 *
 * fname - first name
 * lname - last name
 * city - duh
 * state - two letter abbrev
 */
allProviders.search = function(query) {
    var promises = [];
    allProviders.map(function(provider) {
        promises.push(provider.search(query));
    });

    return bluebird.all(promises);
};

