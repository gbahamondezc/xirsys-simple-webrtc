var  express = require('express');
var  app = express();


app.use( express.static(__dirname + '/public/'));


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.listen(3000, function() {
  console.log('Server started at http://127.0.0.1:3000/');
});
