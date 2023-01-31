const router = require('express').Router();
const User = require("../models/User")
const isAuth = require("../utils/auth")

router.get("/", isAuth, async(req,res)=>{
    try {
        const userData = await User.findAll({
            attributes: { exclude: ["password"]},
            order: [["name", "ASC"]]
        })
        const users = userData.map((blog) => blog.get({plain: true}))
        res.render("homepage", {
            users,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get("/login", (req,res)=>{
    if(req.session.logged_in) {
        res.redirect("/");
        return
    }
    res.render("login")
})

module.exports = router