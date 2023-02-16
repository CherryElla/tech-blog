const router = require("express").Router();
const {Blog} = require("../../models")

router.post("/create-blog", async (req, res) => {

    try {
        const formData = await Blog.create({
            title: req.body.title,
            user_id: req.session.user_id,
            description: req.body.description
        });
        console.log(formData)
        res.status(200).json(formData);
    } catch (err) {
        res.status(500).json.err
    }
})

router.post('/update-blog', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/')
        return
    }

    try {
        console.log(req.body)
        let id = parseInt(req.body.id)
        let post = await Blog.findByPk(id)
        if (post.user_id === req.session.user_id) {
            let blog = await Blog.update({
                title: req.body.title,
                description: req.body.description
            }, {
                where: {
                    id: id
                }
            })
            console.log(blog)
        }
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err)
        res.statusCode(500)
    }
})

module.exports = router