const sequelize = require("../config/connection");
const Blog = require("../models/Blog")
const blogData = require("./seedBlogs.json")

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await Blog.bulkCreate(blogData, {
        individualHooks: true,
        returning: true
    })
    process.exit(0);
};

seedAll();
