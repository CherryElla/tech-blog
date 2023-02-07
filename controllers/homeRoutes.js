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

// Signup route to render page
router.get("/signup", (req,res) =>{
    console.log("what the f")
    res.render("signup")
})

// Login route to use session data, login and redirect to homepage
router.get("/login", (req,res)=>{
    if(req.session.logged_in) {
        res.redirect("/");
        return
    }
    res.render("login")
})

// Dashboard route
router.get("/dashboard", (req,res) =>{
    try{
        res.render("dashboard")
    } catch (err) {
        res.status(500).json(err)
    }

})

router.post("/post", async (req, res) => {
    try {
        let formData = {
            user_id: req.body.id,
            title: req.body.title,
            description: req.body.description
        };
        console.log(formData)
        let blogPost = await Blog.create(formData)
    } catch (err) {
        res.status(500).json.err
    }
})

module.exports = router