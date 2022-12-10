const express = require('express');
const path = require('path')
const {readFile} = require('fs').promises;
const cors = require('cors');
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();
app.use(express.static(path.join(__dirname, '/ai_tts')));
app.use(cors());

app.get('/', async (req, res) => {
	res.status(200)
		.header('Content-Type', 'text/html')
		.send(await readFile('./index.html', 'utf8'));
});
app.get('/p5.sound.min.js', async (req, res) => {
	res.status(200)
		.header('Content-Type', 'text/javascript')
		.send(await readFile('./assets/p5.sound.min.js', 'utf8'));
});
app.get('/p5.sound.min.js.map', async (req, res) => {
	res.status(200)
		.header('Content-Type', 'text/javascript')
		.send(await readFile('./assets/p5.sound.min.js.map', 'utf8'));
});
app.get('/getAudio', async (req, res) => {
	console.log('getting audio');
	res.status(200)
		.header('Content-Type', 'audio/wav')
		.send(await readFile('./assets/test.wav'));
});

app.listen(process.env.PORT || 3000, () => console.log(`App Available`));