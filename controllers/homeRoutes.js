const router = require("express").Router();
const { Blog, User } = require("../models");
const isAuth = require("../utils/auth");

// Get all blogs for homepage
router.get("/", async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        });
        const blogs = blogData.map((blog) =>
            blog.get({
                plain: true,
            })
        );
        res.render("homepage", {
            blogs,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Signup route to render page
router.get("/signup", (req, res) => {
    console.log("what the f");
    res.render("signup");
});

// Login route to use session data, login and redirect to homepage
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

// Dashboard route
router.get("/dashboard", async (req, res) => {
    try {
        let posts = await Blog.findAll({
            where: { user_id: req.session.user_id },
        });
        console.log(posts)
        res.render("dashboard", {
            posts: posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/edit/:", (req, res) => {
    if (req.session.logged_in) {
        // TODO: get blog post id from params
        // TODO: get the blog post data and pass to edit template
        // TODO: make sure the owner of the blog post is the one requesting to edit
        res.render("edit");
    } else {
        res.redirect("/signup");
    }
});

module.exports = router;
