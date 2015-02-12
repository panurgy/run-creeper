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
    }

    if (! (query.fname) && ! (query.lname) ) {
        res.status(400).send("Please provide a first name and/or last name.");
    }

    if (! (query.city) && ! (query.state) ) {
        query.state = 'MN';
    }

    raceSearch.search(query).then( function(data) {
        data = _.flatten(data);
        console.log(data);
        res.json(data);
    })
    .catch(function(err) {
        res.status(500).send(err);
        console.log("kaboom", err);
    });
});

var port = 3000;
app.listen(port, function() {
    console.log("Listening on port " + port);
    maybeStartLiveReload();
});


function maybeStartLiveReload() {
    if (process.env.NODE_ENV === 'dev') {
        livereload = require('express-livereload');
        var dirname = process.cwd() + "/human-ui";
        livereload(app, config={watchDir:dirname});
        console.log("LiveReload started too");
    }
}

