const port = 9000;
const express = require('express');
const { times } = require('lodash');
const app = express();

app.set('views', './chapter2');
app.set('view engine', 'ejs');


app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
})

app.get('/', (req, res) => {
    // res.sendFile('./chapter2/home.html', {root : __dirname})

    let blogs = [
        { title: 'title1', page: 'Ch-3-Ep-5-ep-16-ejs-view-engine Ch-3-Ep-6-ep-17-ejs-pass-data-and-render-dynamic-contents' },
        { title: 'title2', page: 'page2' },
        { title: 'title3', page: 'page3' }
    ]

    res.render('home', {
        // name: 'Personal Website',
        // type: 'website'

        blogs,
        title: 'Home'
    });
})

app.get('/contact', (req, res) => {
    // res.sendFile('./chapter2/contact.html', {root : __dirname})
    res.render('contact', {
        title: 'Contact'
    }
    );
})

app.get('/about', (req, res) => {
    // res.sendFile('./chapter2/About.html', {root : __dirname})
    res.render('about', {
        title: 'About'
    })
})

app.get('/about-us', (req, res) => {
    // res.redirect('/about')
    res.render('about', {
        title: 'About-us'
    })
})

app.use((req, res) => {
    res.statusCode = 404;
    // res.sendFile('./chapter2/404.html', {root : __dirname})
    res.render('404', {
        title: '404'
    })
})
