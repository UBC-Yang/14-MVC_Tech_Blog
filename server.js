const path = require('path');
const routes = require('./controllers');
const express = require('express');
const session = require('express-session')
const sequelize = require('./config/connection');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers: require("./utils/helpers") });

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.DB_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
};

app.use(routes);
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
  });