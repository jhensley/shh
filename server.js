var express = require('express');
var path = require('path');

var app = express();

var html_dir = './www/';

app.use(express.static(html_dir));

app.get('/', function(req, res) {
    res.sendFile(html_dir + 'index.html');
});

var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})