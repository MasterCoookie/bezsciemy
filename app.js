const express = require('express');
const session = require('express-session');
const multer = require('multer');
// const store = new session.MemoryStore();

const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

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
		res.redirect('login');
	}
});

const port = 3000;

app.listen(port, () => {
	console.log('B E Z Ś C I E M Y listeining to requests on %s', port);
});

app.get('/', (req, res) => {
	res.send('<h1>Witamy na B E Z Ś C I E M Y</h1>');
});

app.get('/login', (req, res) => {
	res.render('auth/login');
});

app.post('/login', upload.none(), (req, res) => {
	//console.log(req.body);
	const { username, password } = req.body;

	if (username && password) {
		if (req.session.authenticated) {
			res.json({ redirect: '/' });
		} else {
			//TODO MB: authorize
			if (username === 'JK' && password === 'warum') {
				req.session.authenticated = true;
				req.session.user = { username };
				res.json(req.session);
			} else {
				res.status(403).json({ msg: 'Invalid credentials' });
				res.end();
			}
		}
	} else {
		res.status(403).json({ msg: 'Invalid credentials' });
		res.end();
	}
});

//TMP, for auth tests
app.get('/protected/page', (req, res) => {
	res.send('Welcome to bezsciemy protected page');
});

app.post('/logout', (req, res) => {
	req.session.destroy();
	res.json({ redirect: '/login' });
});
