const express = require('express');
const router = express.Router();
const assert = require('assert');
const mongoose = require('mongoose');

const url = 'admin:admin@ds133368.mlab.com:33368/little-url-fcc'
mongoose.connect(url);
const Schema = mongoose.Schema;

var urlDataSchema = new Schema({
  original_url: String,
  short_url: String
}, { collection: 'url-data' });

var UrlData = mongoose.model('UrlData', urlDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
