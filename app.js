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
