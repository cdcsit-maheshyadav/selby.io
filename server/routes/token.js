fs = require('fs');

module.exports = function(app) {
  app.post('/token', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.grant_type === 'password') {
      if (req.body.username === 'selby' && req.body.password === 'b91d6aeb736d7325a62407f3c0c6ee55147d090f6144157ce0a0da58c0aecffe') {
        var ac = 'b91d6aeb736d7325a62407f3c0c6ee55147d090f6144157ce0a0da58c0aecffe';
        fs.readFile('.secret', 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          if(data)
            ac = data;
          res.send({ access_token: ac });
        });

      } else {
        res.status(400).send({ error: 'invalid_grant' });
      }
    } else {
      res.stauts(400).send({ error: 'unsupported_grant_type' });
    }
  });

  app.post('/revoke', function(req, res) {
    if (req.body.token_type_hint === 'access_token' || req.body.token_type_hint === 'refresh_token') {
      res.send('');
    } else {
      res.stauts(400).send({ error: 'unsupported_token_type' });
    }
  })
};
