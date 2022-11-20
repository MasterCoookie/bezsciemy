const { request } = require('express');
const express = require('express');
const session = require('express-session');
const multer = require('multer');
const mongoose = require('mongoose'); ///
const User = require('./models/user');
// const store = new session.MemoryStore();

const app = express();
const upload = multer();

const dbURI =
	'mongodb+srv://bezsciemy-dev:gabrys@bezsciemy-main.ydqazk8.mongodb.net/?retryWrites=true&w=majority';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(
	session({
		secret: 'ZMiTAC',
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

const port = 3000;

mongoose
	.connect(dbURI, {})
	.then((result) => {
		console.log('db connection established');
		app.listen(port, () => {
			console.log('B E Z Ś C I E M Y listeining to requests on %s', port);
		});
	})
	.catch((err) => {
		console.log(err);
	});

app.get('/', (req, res) => {
	res.send('<h1>Witamy na B E Z Ś C I E M Y</h1>');
});

app.get('/login', (req, res) => {
	if (!req.session.authenticated) {
		console.log('unauth..ed');
		res.render('auth/login');
	} else {
		res.redirect('./protected/page');
		console.log('auth..ed');
	}
});

app.post('/login', upload.none(), async (req, res) => {
	//console.log(req.body);
	const { username, password } = req.body;

	if (username && password) {
		if (req.session.authenticated) {
			res.json({ redirect: '/' });
		} else {
			try {
				const user = await User.login(username, password);
				if (user) {
					console.log('OK');
					req.session.authenticated = true;
					req.session.user = { username };
					res.json(req.session);
				} else {
					res.status(403).json({ msg: 'Invalid credentials' });
					res.end();
				}
			} catch (err) {
				console.log(err);
			}
		}
	} else {
		res.status(403).json({ msg: 'Invalid credentials' });
		res.end();
	}
});

//TMP, for auth tests
app.get('/protected/page', (req, res) => {
	res.render('protected/page');
});

app.post('/logout', (req, res) => {
	req.session.destroy();
	res.json({ redirect: '/login' });
});

app.put('/register', upload.none(), async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.create({ username, password });
		res.status(201);
		res.end();
	} catch (err) {
		console.log(err);
		res.status(500);
		res.end();
	}
});
