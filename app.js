const port = 9000;
const express = require('express');
const { times } = require('lodash');
let morgan = require('morgan');
const app = express();
let mongoDBUrl = 'mongodb+srv://pyaephyokyawdev:Kk74&kl99@onfkeevan.wc5gy.mongodb.net/?retryWrites=true&w=majority&appName=ONFKEEVAN';
const mongoose = require('mongoose');
const blog = require('./Modals/Blog');

mongoose.connect(mongoDBUrl).then(() => {
    console.log('Connected to db');
    app.listen(port, () => {
        console.log(`App running at http://localhost:${port}`);
    })
}).catch(e => {
    console.log(`Exception error occur: ${e}`);
});



app.set('views', './chapter2');
app.set('view engine', 'ejs');


// app.use((req, res, next) => {
//     console.log('Middleware is running!');
//     next();
// });

// let logger = (content) => {
//     return (req, res, next) => {
//         if (content == 'dev'){
//             console.log(`${req.method} ${req.originalUrl} --`);
//         }
//         next();
//     }
// }

// app.use(logger('dev'));
app.use(morgan('dev'))
app.use(express.static('public'))

app.get('/blog-create', async(req, res) =>{
    let createBlog = new blog({
        title: 'new blog title 2',
        intro: 'new blog intro 2',
        body: 'new blog body 2'
    })

    await createBlog.save();
    res.send('Blog added!')
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
