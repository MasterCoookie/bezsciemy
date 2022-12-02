const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const secret = require('./secret');
// const store = new session.MemoryStore();

const app = express();

const dbURI =
	'mongodb+srv://bezsciemy-express:' + secret.dbPWD + '@bezsciemy-main.ydqazk8.mongodb.net/?retryWrites=true&w=majority';

const port = 3000;

mongoose
	.connect(dbURI, {
		autoIndex: true
	})
	.then((result) => {
		console.log('db connection established');
		app.listen(port, () => {
			console.log('B E Z Ś C I E M Y listeining to requests on %s', port);
		});
	})
	.catch((err) => {
		console.log(err);
	});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(
	session({
		secret: secret.cookieSecret,
		resave: false,
		//change last number to specify session max age in hours
		cookie: { maxAge: 1000 * 3600 * 1 },
		saveUninitialized: false,
		// store
	})
);

app.use('/protected/', (req, res, next) => {
	console.log(req.session);
	// console.log(store);
	if (req.session.authenticated) {
		next();
	} else {
		res.redirect('../login');
	}
});

app.use('/', authRoutes);
app.use('/', postRoutes);

app.get('/', (req, res) => {
	res.send('<h1>Witamy na B E Z Ś C I E M Y</h1>');
});

//TMP, for auth tests
app.get('/protected/page', (req, res) => {
	res.render('protected/page');
});
