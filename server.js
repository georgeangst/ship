var express = require('express')
stylus = require('stylus');

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/public');

app.set('view engine', 'jade');


app.use(stylus.middleware(
    { src: __dirname + '/public', compile: compile }
));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('index');
});

var port = process.env.PORT || 1337;

app.listen(port, function(){
    console.log('http://127.0.0.1:' + port + '/');
});
