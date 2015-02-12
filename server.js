var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var raceSearch = require('./providers/all');

// serve up the static stuff from this directory
app.use(express.static('human-ui'));
// and prepare to receive JSON input
app.use(bodyParser.json());

app.post('/search', function(req, res, next) {
    var query = req.body;
    if (!query) {
        res.status(400).send("Please provide a JSON payload with the search params.");
        return;
    }

    if (! (query.fname) && ! (query.lname) ) {
        res.status(400).send("Please provide a first name and/or last name.");
        return;
    }

    if (! (query.city) && ! (query.state) ) {
        query.state = 'MN';
    }

    console.log("Searching for", query);
    raceSearch.search(query).then( function(data) {
        data = _.flatten(data);
        if (isDevMode()) {
            console.log(data);
        }
        res.json(data);
    })
    .catch(function(err) {
        console.log("Error performing search", err);
        res.status(500).send(err);
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on port " + port);
    maybeStartLiveReload();
});


function maybeStartLiveReload() {
    if (isDevMode()) {
        livereload = require('express-livereload');
        var dirname = process.cwd() + "/human-ui";
        livereload(app, config={watchDir:dirname});
        console.log("LiveReload started too");
    }
}

function isDevMode() {
    return process.env.NODE_ENV === 'dev';
}
