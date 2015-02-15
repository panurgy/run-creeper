# Run Creeper

Perform a simultaneous search through the results of many running events.
<hr>
Every year, there are lots of long-distance running events that take place. 
Many of those races have the results available via an easily searchable web site.
The hardest about finding someone's info is knowing (or remembering) the distance and year of the event.

The solution
--
Since this problem requires lots of parallel HTTP requests to a bunch of web-sites, 
the easiest choice was Node.js (or io.js) and Promises (like [bluebird](https://github.com/petkaantonov/bluebird))

The initial commit of this code will search through the following races:
   * [Monster Dash 10-mile and half-marathon](http://www.minnesotamonster.org/), 2010-2014
   * [Grandma's Marathon and half-marathon](http://www.grandmasmarathon.com/), 2011-2014
   * [Twin Cities Marathon and 10-mile](https://www.tcmevents.org/), 2010-2014

Currently, all of those sites return data in the form of markup (lots of `<TR>` and `<TD>` elements), 
but I prefer JSON for my AJAX calls. The easy fix here is the [cheerio](https://github.com/cheeriojs/cheerio) module.

The front end
--
Since [Google's Material Design](http://www.google.com/design/spec/material-design/introduction.html) is the hottest thing
since [Twitter Bootstrap](http://getbootstrap.com/), I had to try out [Angular Material Design](https://material.angularjs.org/#/).


Easy to deploy
--
This app can be deployed right into most PaaS providers (like (Heroku)[http://www.heroku.com])). 
There may still be an instance of this app available here at http://runcreeper.herokuapp.com/


