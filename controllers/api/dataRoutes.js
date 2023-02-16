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

router.post('update-blog', async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
    }
})

module.exports = router