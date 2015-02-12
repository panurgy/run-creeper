var request = require('request');
var _ = require('lodash');
var bluebird = require('bluebird');
var cheerio = require('cheerio');

/**
 * Prepares an instance that will make requests for the specified
 * race ID.
 */
function Prepare(whichRaceNumber, eventName) {
    
    var baseInfo = {
        uri : 'http://www.mtecresults.com/race/runnerSearch',
        method : 'GET'
    };
    
    var requestAsync = bluebird.promisify(request.defaults(baseInfo));
    var resultParser = _.bind(parseResponse, this, eventName);

    return {
        "search" : function search(parms) {
            var query = _.clone(parms);
            query.raceid = whichRaceNumber;
            return requestAsync({qs: query}).then(resultParser);
        }
    };
};

var FIELDS = [false, 'bib', 'name', 'gender', 'age', 'city', 'state', 'time', 'race'];

function parseResponse(eventName, response) {
    var body = response[1];
    var $ = cheerio.load(body);
    var rows = [];

    $('tr').each(function() {
        var info = {
            event: eventName
        };

        // There's a big problem here - if the search is for a specific
        // person (fname or lname), then mTec doesn't return their
        // finish time.
        // If you search by City, then it will list the participant's time.
        var fieldsToUse = FIELDS;
    
        $(this).children('td').each(function(index) {
            if (index === 0) {
                rows.push(info);
            
            }

            if (!fieldsToUse[index]) return;
            var key = fieldsToUse[index];
            info[key] = $(this).text();
        });
    });
    var deferred = bluebird.defer();
    deferred.resolve(rows);
    return deferred.promise;
}

module.exports = Prepare;
