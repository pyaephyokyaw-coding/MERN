const port = 9000;
const express = require('express');
const { times } = require('lodash');
let morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Blog = require('./Modals/Blog');
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


app.use(express.urlencoded({extended: true}))
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

app.post('/blog-create', async (req, res) => {

    let {title, intro, body} = req.body;

    let createBlog = new Blog({
        title,
        intro,
        body
    })

    await createBlog.save();

    // Redirect to home with a success message
    res.redirect('/?success=Blog added successfully!');

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

    // let blogs = [
    //     { title: 'title1', page: 'Ch-3-Ep-5-ep-16-ejs-view-engine Ch-3-Ep-6-ep-17-ejs-pass-data-and-render-dynamic-contents' },
    //     { title: 'title2', page: 'page2' },
    //     { title: 'title3', page: 'page3' }
    // ]

    let blogs = await Blog.find().sort({createdAt: -1});

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

app.get('/create', (req, res) => {
    res.render('blog/create', {
        title: 'Blog Create'
    })
})

app.post('/blogs', async (req, res) => {
    let{title,intro,body} = req.body;

    let blog = new Blog({
        title,
        intro,
        body
    })

    blog.save();
})

app.get('/about-us', (req, res) => {
    // res.redirect('/about')
    res.render('about', {
        title: 'About-us'
    })
})

app.get('/single-blog', (req, res) => {

    let blog = Blog.findById('67d77a942bf84aebc5204144')

    res.render('blog/show', {
        blog,
        title: 'Blog detail'
    })
})

app.get('/blog/:id', async(req, res) => {
    let id = req.params.id;

    let blog = await Blog.findById(id);

    // res.json(blogs)

    res.render('blog/show', {
        blog,
        title: 'single blog detail'
    })
})

app.use((req, res) => {
    res.statusCode = 404;
    // res.sendFile('./chapter2/404.html', {root : __dirname})
    res.render('404', {
        title: '404'
    })
})





