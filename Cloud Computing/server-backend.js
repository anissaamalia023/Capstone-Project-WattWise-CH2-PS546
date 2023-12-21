const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./src/Routes');
const app = express();
const port = 8080;
const admin = require('firebase-admin');
const serviceAccount = require('./capstone-project---wattwise-firebase-adminsdk-4d3ko-b286ae6b5a.json');

app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.get('/', (req, res) => {
    res.send('Backend Wattwise');
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
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

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://capstone-project---wattwise.firebaseio.com'
  });


