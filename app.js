const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
	secret: 'ZMiTAC',
	resave: false,
	//change last number to specify session max age in hours
	cookie: { maxAge: 1000 * 3600 * 1 },
	saveUninitialized: true
}));

const port = 3000;

app.listen(port, () => {
	console.log('B E Z Ś C I E M Y listeining to requests on %s', port);
});

app.get('/', (req, res) => {
	res.send('<h1>Witamy na B E Z Ś C I E M Y</h1>');
});

app.post('/login', (req, res) => {
	const { username, password } = req.body;

	if(username && password) {
		if(req.session.authenticated) {
			res.json( { redirect: '/' } );
		} else {
			//TODO: authorize
			if(username === "JK" && password === "warum") {
				req.session.authenticated = true;
				req.session.user = { username };
				res.json(req.session);
			} else {
				res.status(403).json({ msg: "Invalid credentials" });
				res.end();
			}
		}
	} else {
		res.status(403).json({ msg: "Invalid credentials" });
		res.end();
	}	
});
