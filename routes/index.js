const express = require('express');
const router = express.Router();
const assert = require('assert');
const mongoose = require('mongoose');

const validateUrl = require('../controller/validateUrl');
const linkGenerator = require('../controller/linkGenerator');

const url = 'admin:admin@ds133368.mlab.com:33368/little-url-fcc'
mongoose.Promise = global.Promise;
mongoose.createConnection(url);
var Url = require('../model/url_model');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Little-url' });
});

router.get('/new/', (req, res, next) => {
  res.render('error', { message: 'Invalid URL' });
})

router.get('/new/:url*', (req, res, next) => {
  var url = req.url.replace(/.*:\/\//g, '');
  console.log(validateUrl(process.env));
  var urlObj = {};
  if (validateUrl(url)) {
    urlObj = {
      "original_url": url,
      "short_url": 'localhost:8080/' + linkGenerator()
    };
    res.send(urlObj);
    var data = new Url(urlObj);
    data.save();
  }
  else {
    urlObj = {
      "error": "No short url found for given input"
    };
    res.send(urlObj);
  }
})

router.get('/:url*', (req, res, next) => {
  var url = req.get('host') + req.originalUrl;
  console.log(url + ' entering find');

  Url.findOne({ "short_url": url }, (err, result) => {
    if (err) throw err;
    if (result) {
      console.log('Found ' + result);
    }
    else {
      res.send('Site not found');
    }
  })
})


module.exports = router;
