const bodyParser = require('body-parser');
const express = require('express');
const Blockchain = require('./blockchain');

const app = express();
const bitcoin = new Blockchain();

app.use(bodyParser.json());

app.get('/api/blocks', (req, res) => {
    res.json(bitcoin.chain);
});

app.post('/api/mine', (req, res) => {
    const { data } = req.body;

    bitcoin.addBlock({ data });

    res.redirect('/api/blocks');
})

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listen on port: ${PORT}`));