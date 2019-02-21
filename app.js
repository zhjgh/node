var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var app = express();

app.get('/', function (req, res, next) {

  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

  superagent.get('https://coll.jd.com/list.html?sub=11859').end(function (err, sres) {
      if (err) {
        return next(err);
      }

      var $ = cheerio.load(sres.text);
      var items = [];
      $('#plist .gl-item').each(function (idx, element) {
        var $element = $(element);
        items.push({
          link: $element.find('.p-img a').attr('href') || '',
          pic: $element.find('.p-img img').attr('src') || '',
          price: $element.find('.p-price i').text() || '',
          desc: $element.find('.p-name em').text() || '',
        });
      });
      
      res.send(items);
    });
});


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});