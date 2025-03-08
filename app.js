const express = require('express');
const app = express();
const port = 9000;

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
})

app.get('/', (req, res) => {
    res.sendFile('./chapter2/home.html', {root : __dirname})
})

app.get('/contact', (req, res) => {
    res.sendFile('./chapter2/contact.html', {root : __dirname})
})

app.get('/about', (req, res) => {
    res.sendFile('./chapter2/About.html', {root : __dirname})
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.use((req, res) => {
    res.statusCode=404;
    res.sendFile('./chapter2/404.html', {root : __dirname})
})
