const Blog = require("../models")

const blogData = [
    {
        title: 'Best templating engines',
        date: 'January 20, 2023 07:00:00',
        description: 'After some good research and playing around I have found top engines for node.js to include ejs and mustache!',
      },
      {
        title: 'HTML cheat',
        date: 'January 23, 2023 05:00:00',
        description: 'A great little hint for HTML lovers.. type the ! to get a quick boilerplate onto your HTML page.',
      },
      {
        title: 'Thoughts on Chatgpt ai',
        date: 'December 29, 2022 09:00:00',
        description: 'An exciting and similarly scary ai technology. I shall be staying well away.',
      },

]
const seedPosts = () => Blog.bulkCreate(blogData)

module.exports = seedPosts