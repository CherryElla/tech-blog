const router = require('express').Router();
const User = require("../models/User")

router.get("/", async(req,res)=>{
    try {
        // const userData = await User.findAll()

        res.render("homepage", {

        });
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router