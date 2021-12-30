const express = require('express');
const path = require('path');
const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();

const app = express();
const port = process.env.PORT || 3000;

console.log(__dirname)
app.use('/public', express.static('public'));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get('/api',(request,response) => {
	database.find({},(err,data) => {
		if (err) {
			response.end();
			return;
		}
		response.json(data);
	});
});

app.post('/api', (request, response) => {
	console.log('Request received!');
	const data = request.body;
	database.remove({});
	database.insert({pixels:data});
	response.json(data);
});

