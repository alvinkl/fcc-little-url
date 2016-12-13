const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var urlDataSchema = new Schema({
  original_url: String,
  short_url: String
}, { collection: 'url-data' });

module.exports = mongoose.model('UrlData', urlDataSchema);
