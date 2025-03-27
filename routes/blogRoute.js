
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

router.post('/blog-create/:id?', async (req, res) => {
    try {
        let id = req.params.id;
        let { title, intro, body } = req.body;

        console.log('Log : ' + id)

        if (id.toString() !== '0') {
            // Update existing blog
            await Blog.findByIdAndUpdate(id, { title, intro, body });
            res.redirect('/blog?success=Blog updated successfully!');
        } else {
            // Create new blog
            await new Blog({ title, intro, body }).save();
            res.redirect('/blog?success=Blog added successfully!');
        }
    } catch (error) {
        console.error('Error:', error);
        res.redirect('/blog?error=Something went wrong!');
    }
});

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

        res.render('blog/create', {
            blog,
            title: 'Blog Create'
        })

    } catch (e) {
        res.redirect('/blog?error=Internal server error: ' + e);
        next();
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
