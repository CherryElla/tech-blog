const router = require("express").Router();
const {Blog} = require("../../models")

router.post("/create-blog", async (req, res) => {

    try {
        console.log(req.body)
        const formData = await Blog.create({
            // user_id: req.body.id,
            title: req.body.title,
            description: req.body.description
        });
        console.log(formData)
        res.status(200).json(formData)
    } catch (err) {
        res.status(500).json.err
    }
})

module.exports = router