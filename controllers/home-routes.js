const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

// Route to render homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
               {
                model: User,
                attributes: ['username']
               },
               {
                model: Comment,
                attributes: ['comment_text']
               }
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
            showTitle: true
        });
    } catch (err) {
        console.error('Error in GET /:', err);  
        res.status(500).json(err);
    }
});

// Route to render individual post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: [{model: User, attributes: ['username']}]
                }
            ]
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        const post = postData.get({ plain: true });
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        console.error('Error in GET /post/:id:', err);  
        res.status(500).json(err);
    }
});

// Route to render dashboard
router.get("/dashboard", withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: { user_id: req.session.user_id },
        include: [{ model: User, attributes: ["username"] }],
      });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render("dashboard", {
        posts,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.error('Error in GET /dashboard:', err);  
      res.status(500).json(err);
    }
});

// login route
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    }
    res.render("login", { showTitle: false });
});

// signup route
router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    }
    res.render("signup", { showTitle: false });
});

//render the new post page
router.get("/new-post", (req, res) => {
    if (req.session.logged_in) {
      res.render("new-post");
      return;
    }
    res.redirect("/login", { showTitle: false });
});

//render the edit post page
router.get("/edit-post/:id", async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ["username"] },
          {
            model: Comment,
            include: [{ model: User, attributes: ["username"] }],
          },
        ],
      });
      if (!postData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
      }
      const post = postData.get({ plain: true });
      res.render("edit-post", {
        ...post,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.error('Error in GET /edit-post/:id:', err); 
      res.status(500).json(err);
    }
});

module.exports = router;




