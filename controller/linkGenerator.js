module.exports = function() {
  var num = Math.floor(100000 + Math.random() * 900000);
  return num.toString().substring(0, 4);
}
