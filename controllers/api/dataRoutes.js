const router = require("express").Router();
const {Blog} = require("../../models")

router.post("/create-blog", async (req, res) => {

    try {
        const formData = await Blog.create({
            title: req.body.title,
            description: req.body.description
        });
        console.log(formData)
        res.status(200).json(formData);
    } catch (err) {
        res.status(500).json.err
    }
})

module.exports = router