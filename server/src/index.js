require('dotenv').config(); // loads environment variable from server/.env
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); // enable Cross-Origin Resource Sharing
app.use(express.json());

// test Route
app.get('/', (req, res) => {
    res.send('Hello, the server is working!')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});