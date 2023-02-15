const sequelize = require("../config/connection");
const { Blog, User } = require("../models");
const blogData = require("./seedBlogs.json");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    let user = await User.create(blogData.user, {
        individualHooks: true,
        returning: true,
    });
    for (let post of blogData.posts) {
        await Blog.create(
            { 
                ...post, 
                user_id: user.id
            },
            {
                individualHooks: true,
                returning: true,
            }
        );
    }
    process.exit(0);
};

seedAll();
