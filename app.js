const express = require('express');

const app = express();

const port = 3000;

app.listen(port, () => {
	console.log('B E Z Ś C I E M Y listeining to requests on %s', port);
});

app.get('/', (req, res) => {
	res.send('<h1>Witamy na B E Z Ś C I E M Y</h1>');
});
