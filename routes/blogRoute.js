
const express = require('express');
const router = express.Router();

let Blog = require('../Modals/Blog');

router.get('/', (req, res) => {
    res.redirect('/blog')
})

router.get('/blog', async (req, res) => {

    let blogs = await Blog.find().sort({ createdAt: -1 });

    res.render('home', {
        blogs,
        title: 'Home'
    });
})

router.get('/create', (req, res) => {
    res.render('blog/create', {
        title: 'Blog Create'
    })
})

router.post('/blog-create', async (req, res) => {

    let { title, intro, body } = req.body;

    let createBlog = new Blog({
        title,
        intro,
        body
    })

    await createBlog.save();

    res.redirect('/blog?success=Blog added successfully!');
})

router.get('/blog-single/:id', async (req, res, next) => {
    let id = req.params.id;

    try {
        let blog = await Blog.findById(id);

        res.render('blog/show', {
            blog,
            title: 'single blog detail'
        })
    }
    catch (e) {
        res.redirect('/blog?error=Internal server error: !' + e);
        next();
    }
})

router.post('/blog-edit/:id', async (req, res, next) => {
    let id = req.params.id;

    try {
        let blog = await Blog.findById(id);

        if (!blog) {
            return res.redirect('/blog?error=Blog not found.');
        }

        await Blog.findByIdAndDelete(id);

        res.redirect('/blog?success=Blog-title:[' + blog.title + '] Successfully deleted.');
    } catch (e) {
        res.redirect('/blog?error=Internal server error: ' + e);
        next(e);
    }
});

router.post('/blog-delete/:id', async (req, res, next) => {
    let id = req.params.id;

    try {
        let blog = await Blog.findById(id);

        if (!blog) {
            return res.redirect('/blog?error=Blog not found.');
        }

        await Blog.findByIdAndDelete(id);

        res.redirect('/blog?success=Blog-title:[' + blog.title + '] Successfully deleted.');
    } catch (e) {
        res.redirect('/blog?error=Internal server error: ' + e);
        next(e);
    }
});

module.exports = router;
