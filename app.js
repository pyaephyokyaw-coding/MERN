const port = 9000;
const express = require('express');
const app = express();

app.set('views', './chapter2');
app.set('view engine', 'ejs');


app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
})

app.get('/', (req, res) => {
    // res.sendFile('./chapter2/home.html', {root : __dirname})
    res.render('home');
})

app.get('/contact', (req, res) => {
    // res.sendFile('./chapter2/contact.html', {root : __dirname})
    res.render('contact');
})

app.get('/about', (req, res) => {
    // res.sendFile('./chapter2/About.html', {root : __dirname})
    res.render('about')
})

app.get('/about-us', (req, res) => {
    // res.redirect('/about')
    res.render('about')
})

app.use((req, res) => {
    res.statusCode=404;
    // res.sendFile('./chapter2/404.html', {root : __dirname})
    res.render('404')
})
