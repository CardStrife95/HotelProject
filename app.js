/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), http = require('http'), path = require('path');

var client = require('./routes/client');
var chambre = require('./routes/chambre');
var reservation = require('./routes/reservation');

// Les modules pour la base de données
var mysql = require('mysql');
var connexion = require('express-myconnection');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// Connexion avec la base de données
app.use(connexion(mysql, {
	host : '127.0.0.1',
	user : 'root',
	password : '',
	port : 3306,
	database : 'hotel'
}, 'pool'));

// Les routes
app.get('/', routes.index);
app.get('/users', user.list);

// les routes du client
app.get('/client', client.list);
app.get('/client/add', client.add);
app.post('/client/add', client.save);
app.get('/client/edit/:id', client.edit);
app.post('/client/edit/:id', client.save_edit);
app.get('/client/delete/:id', client.delete_save);

// Les routes de la chambre
app.get('/chambre', chambre.list);
app.get('/chambre/add', chambre.add);
app.post('/chambre/add', chambre.save);
app.get('/chambre/edit/:id', chambre.edit);
app.post('/chambre/edit/:id', chambre.save_edit);
app.get('/chambre/delete/:id', chambre.delete_save);

// les routes de la reservation
app.get('/reservation', reservation.list);
app.get('/reservation/add', reservation.add);
app.post('/reservation/add', reservation.save);
app.get('/reservation/edit/:id', reservation.edit);
app.post('/reservation/edit/:id', reservation.save_edit);
app.get('/reservation/delete/:id', reservation.delete_save);

app.use(app.router);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
