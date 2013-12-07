
/*
 * GET users listing.
 */

var redis = require('redis'),
    client = redis.createClient(),
    querystring = require('querystring');

exports.index = function (req, res) {
  client.keys('page:*', function (err, pages) {
    // gotta remove dat prefix
    res.json(pages.map(function (page) {
      return page.substr(5);
    }));
  });
};

exports.get = function (req, res) {
  client.hgetall('page:' + querystring.unescape(req.params.id), function (err, page) {
    res.json(err ? {error: 'sorry'} : page);
  });
};

exports.set = function (req, res) {
  req.body.time = Date.now();
  client.hmset('page:' + req.body.title, req.body, function (err) {
    res.json({id: 'super good job everyone'});
  });
};

exports.delete = function (req, res) {
  client.del('page:' + querystring.unescape(req.params.id), function () {
    res.json({id: 'super good job everyone'});
  });
};
