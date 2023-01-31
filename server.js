const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helper');

const sequelize = require('./config/connection');
const SeqStore = require("connect-session-sequelize")(session.Store)

const app = express();
const PORT = process.env.PORT || 3001;

const handlebars = exphbs.create({ helpers });

app.use(session({
    secret: "vegan dream",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SeqStore({
        db: sequelize
    })
}));




app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// app.set("views", "./views")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Listening'))
});