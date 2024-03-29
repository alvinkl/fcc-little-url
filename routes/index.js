const express = require('express');
const router = express.Router();

const db = require('monk')('admin:admin@ds133368.mlab.com:33368/little-url-fcc');
const URL = db.get('url-data');

const validateUrl = require('../controller/validateUrl');
const linkGenerator = require('../controller/linkGenerator');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Little-url' });
  console.log(req.headers.host);
});

router.get('/new/', (req, res, next) => {
  res.render('error', { message: 'Invalid URL' });
})

router.get('/new/:url*', (req, res, next) => {
  var url = req.url.replace(/.*:\/\//g, '');
  console.log(url);
  var urlObj = {};
  if (validateUrl(url)) {
    urlObj = {
      "original_url": 'http://' + url,
      "short_url": req.headers.host + '/' + linkGenerator()
    };
    res.send(urlObj);
    URL.insert(urlObj);
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
  console.log(process.env.APP_URL);
  URL.findOne({ "short_url": url }).then((data) => {
    if (data) {
      res.redirect(data.original_url);
    }
    else {
      res.send('Invalid url!');
    }
  })
})


module.exports = router;
