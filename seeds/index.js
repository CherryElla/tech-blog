const sequelize = require('../config/connection')
const seedPost = require('./blogData')

const seedAll = async function() {
    await sequelize.sync({ force: true });
    await seedPost();

    process.exit(0);
};

seedAll()