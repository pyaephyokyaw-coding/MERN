const port = 9000;
const express = require('express');
const { times } = require('lodash');
let morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const blog = require('./Modals/Blog');
const expresslayout = require('express-ejs-layouts')

let mongoDBUrl = 'mongodb+srv://pyaephyokyawdev:Kk74&kl99@onfkeevan.wc5gy.mongodb.net/?retryWrites=true&w=majority&appName=ONFKEEVAN';


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
app.use(expresslayout);
app.set('layout', 'layouts/default');


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

app.get('/blog-create', async (req, res) => {
    let createBlog = new blog({
        title: 'new blog title 3',
        intro: 'new blog intro 3',
        body: 'new blog body 3'
    })

    await createBlog.save();
    res.send('Blog added!')
})

// app.get('/', async (req, res) => {
//     // res.sendFile('./chapter2/home.html', {root : __dirname})

//     // let blogs = [
//     //     { title: 'title1', page: 'Ch-3-Ep-5-ep-16-ejs-view-engine Ch-3-Ep-6-ep-17-ejs-pass-data-and-render-dynamic-contents' },
//     //     { title: 'title2', page: 'page2' },
//     //     { title: 'title3', page: 'page3' }
//     // ]

//     // let blogs = await blog.find().sort({createdAt: -1});
//     let blogs;
// try {
//     blogs = await blog.findById('67d77afe953c901ece3d2a7c');
//     res.json(blogs)
// } catch (err) {
//     console.error(err);
// //     // return res.status(500).send('Error retrieving blog');
// }


//     // res.render('home', {
//     //     // name: 'Personal Website',
//     //     // type: 'website'

//     //     blogs,
//     //     title: 'Home'
//     // });
// })


app.get('/', async (req, res) => {

    let blogs = [
        { title: 'title1', page: 'Ch-3-Ep-5-ep-16-ejs-view-engine Ch-3-Ep-6-ep-17-ejs-pass-data-and-render-dynamic-contents' },
        { title: 'title2', page: 'page2' },
        { title: 'title3', page: 'page3' }
    ]

    res.render('home', {
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

app.get('/blogcreate', (req, res) => {
    res.render('blog/create', {
        title: 'Blog Create'
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
