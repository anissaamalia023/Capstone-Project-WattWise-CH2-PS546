const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Backend Wattwise');
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${3000}`);
});

app.get('/api/data', (req, res) => {
    db.query('SELECT * FROM tabel_data', (err, results) => {
        if (err) {
            console.error('Error query:', err);
            res.status(500).json({ error: 'Terjadi kesalahan server.' });
        } else {
            res.json(results);
        }
    });
});


