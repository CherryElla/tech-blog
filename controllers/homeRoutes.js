const router = require('express').Router();
const {Blog,User} = require("../models")
const isAuth = require("../utils/auth")

// Get all blogs for homepage
router.get("/", async(req, res) =>{ 
    try {
    const blogData = await Blog.findAll({
        include: [{
            model: User,
            attributes: ["name"],
        },
        ],
    });
    const blogs = blogData.map((blog) =>
    blog.get(
        {
            plain: true
        }
    ));
    res.render("homepage", {
        blogs,
        logged_in: req.session.logged_in
    });
    } catch (err){
        console.log(err)
        res.status(500).json(err)
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