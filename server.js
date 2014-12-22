var express = require('express');
var path = require('path');

var app = express();

var html_dir = path.join(__dirname, '/www/');
var port = process.env.PORT || 3000;


app.get('/', function(req, res) {
    res.sendFile(html_dir + 'blank.html');
});

app.use(express.static(html_dir));

//app.get("/", function(req, res) {
//    res.send("Heroku Demo!");
//});

var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('App listening at http://%s:%s', host, port)

});