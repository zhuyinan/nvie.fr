
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {pretty: true});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//Error Handle
function NotFound(msg){
      this.name = 'TestNotFound';
        Error.call(this, msg);
          Error.captureStackTrace(this, arguments.callee);
}

NotFound.prototype.__proto__ = Error.prototype;

app.get('/404', function(req, res){
      throw new NotFound;
});

app.get('/500', function(req, res){
      throw new Error('keyboard cat!');
});
app.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.jade');
    } else {
        next(err);
    }
});

// Routes
app.get('/', routes.index);
//app.get('/contact', routes.contact);
//app.get('/about', routes.about);
//app.get('/cv', routes.cv);




app.listen(3001, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
