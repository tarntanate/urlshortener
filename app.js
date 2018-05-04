// Built-in Node Modules
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const urlRegex = require('url-regex');

// User modules
const shortUrl = require('./models/shortUrl');
const urlValidator = require('./src/url-validator');
const urlGenerator = require('./src/url-generator');
const config = require('./src/config');

// Catch an uncaught exception
process.addListener('uncaughtException', function (err, stack) {
  console.log('Caught exception: ' + err + '\n' + err.stack);
  console.log('\u0007'); // Terminal bell
});



app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrls');

// Create the routes entry
app.get('/', (req, res) => {
  console.log('test');
  res.json();
});

// Get a short url link and redirect to full url
app.get('/g/:shortenUrl', (req, res, next) => {
  var {
    shortenUrl
  } = req.params;

  // TODO: Add check for security injection

  // Search for a shorten url in MongoDb
  shortUrl.findOne({
      shortenUrl: shortenUrl,
    },
    (err, data) => {
      if (err) {
        return res.send('Error reading from database', err);
      }

      var originalUrl = data.originalUrl;
      console.log('originalUrl =', originalUrl);

      res.redirect(data.originalUrl);
      return;
    },
  );

  let shortUrlIsAUrl = urlRegex({
    exact: true,
    strict: false,
  }).test(shortenUrl);

  if (shortUrlIsAUrl) {
    console.log('this shorten url is also a valid url');
    res.redirect('http://' + shortenUrl);
  }
});

// Short URL generator api
app.get('/new/:urlToShorten(*)', (req, res, next) => {
  var {
    urlToShorten
  } = req.params;

  // Check for a valid url
  urlValidator(urlToShorten)
    .then(() => {
      // If input url is valid then do a shortener
      // var shorten = Math.floor(Math.random() * 100000).toString();
      const shortenUrl = urlGenerator.generate(config.urlLength || 5).toLowerCase();
      console.log(`Generated shorten url for ${urlToShorten} = ${shortenUrl}`);

      // TODO: Add checking for existing url in DB

      // create data object to insert into DB
      var data = new shortUrl({
        originalUrl: urlToShorten,
        shortenUrl: shortenUrl,
      });

      // Save a data to mongoDB
      data.save(err => {
        if (err) {
          console.error('Error saving to mongoDb');
          return res.send('Error saving to mongoDb');
        }
        console.log('saving to mondoDb');
      });

      // Return result as JSON output
      res.json({
        data,
      });
    })
    .catch(err => {
      console.error(err);
      // return err;
      res.json(err);
    });
});

// Start HTTP server
app.listen(config.port, function () {
  console.log(`Express server listening on port ${config.port} in ${config.mode} mode.`);
});