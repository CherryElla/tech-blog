const router = require("express").Router();
const { Blog, Comment } = require("../../models");

router.post("/create-blog", async (req, res) => {
    try {
        const formData = await Blog.create({
            title: req.body.title,
            user_id: req.session.user_id,
            description: req.body.description,
        });
        console.log(formData);
        res.status(200).json(formData);
    } catch (err) {
        res.status(500).json.err;
    }
});

router.post("/update-blog", async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect("/");
        return;
    }

    try {
        console.log(req.body);
        let id = parseInt(req.body.id);
        let post = await Blog.findByPk(id);
        if (post.user_id === req.session.user_id) {
            let blog = await Blog.update(
                {
                    title: req.body.title,
                    description: req.body.description,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            console.log(blog);
        }
        res.redirect("/dashboard");
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

router.post("/add-comment", async (req, res) => {
    try {
        let user_id = req.session.user_id;
        let text = req.body.text;
        let post_id = req.body.post_id;
        let comment = await Comment.create({
            text: text,
            user_id: user_id,
            blog_id: post_id,
        });
        console.log(comment);
        res.status(200);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

module.exports = router;
