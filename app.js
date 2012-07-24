/**
 *  * Module dependencies.
 *  
 */

var express = require('express')
, routes = require('./routes');
var connect = require('connect');
var nodemailer = require('nodemailer');
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
    app.use(connect().use(connect.favicon()));
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});


// Routes
app.get('/', routes.index);
//app.get('/contact', routes.contact);
//app.get('/about', routes.about);
//app.get('/cv', routes.cv);
app.post('/', function(req, res){
    console.log(req.body.user);
    console.log(req.body.user["name"]);
    var name = req.body.user["name"];
    /**
     * Configuration for SMTP sending mail
     */
    // Create a SMTP transport object
    var transport = nodemailer.createTransport("SMTP", {
        //  service: 'Gmail', // use well known service
host: "smtp.nvie.fr",
        port:25,
        auth: {
user: "user@nvie.fr",
        pass: "passward"
        }
    });

    console.log('SMTP Configured');

    //Message object 
    var message = {

        // sender info
from: 'Postmaster <postmaster@nvie.fr>',

      // Comma separated list of recipients
      to: '"ZHU Yinan" <zhuyinan1988@gmail.com>',

      // Subject of the message
      subject: 'Nodemailer is unicode friendly .', //

      headers: {
          'X-Laziness-level': 1000
      },

      // plaintext body
text: 'Hello to myself!',

      // HTML body
      html:'<p><b>Hello</b> to myself <img src="cid:note@node"/></p>'+
          '<p>Here\'s a nyan cat for you as an embedded attachment:<br/></p>',


    };

    console.log('Sending Mail');
    if(name==2){
        transport.sendMail(message, function(error){
            if(error){
                console.log('Error occured');
                console.log(error.message);
                return;
            }
            console.log('Message sent successfully!');

            // if you don't want to use this transport object anymore, uncomment following line
            //transport.close(); // close the connection pool
        });
    }
    res.redirect('/#/success');
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


app.listen(3001, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

