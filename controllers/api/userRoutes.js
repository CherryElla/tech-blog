const router = require("express").Router();
const {User} = require("../../models")

// Create a new user route
router.post("/create", async (req,res) => {
    try {
        console.log(User)
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.logged_in = true;
            res.status(200).json(userData)
        });
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})


// Login route
router.post("/login", async (req, res) => {
    try {
        console.log("working fine")
        const userData = await User.findOne({ 
            where: { 
                email: req.body.email
            },
        });

        console.log(userData)
        if (!userData) {
            res.status(400).json({message: "Email is incorrect, please try again"})
            return
        }

        const pwValid = await userData.checkPassword(req.body.password);

        if(!pwValid) {
            res.status(400).json({ message: "Password is incorrect, please try again."});
            return
        }

        req.session.save(() => {
            req.session.user_id = userData.id,
            req.session.logged_in = true
            res.json({ user: userData, message: "You are now logged in."})
        })
    } catch (error) {
        res.status(400).json(error)
    }
});


// Logout route
router.post("/logout", (req,res) => {
    if (req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})



module.exports = router