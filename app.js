const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const contentListRoutes = require('./routes/contentListRoutes');
const secret = require('./secret');
// const store = new session.MemoryStore();

const app = express();

const dbURI =
	'mongodb+srv://bezsciemy-express:' + secret.dbPWD + '@bezsciemy-main.ydqazk8.mongodb.net/?retryWrites=true&w=majority';

const port = 3000;

console.log("B E Z Ś C I E M Y server starting...");

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

app.use('/', contentListRoutes);
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
