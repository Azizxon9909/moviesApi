const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const token = require('./middleware/tokenVerify')
const config = require('./config');
const { join } = require("path");
const app = express();
const rIndex = require('./routes/index');
const rDirector = require('./routes/director');
const rUser = require('./routes/user');


//// mongoDB

mongoose
  .connect(config.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDBga ulanish hosil qilindi...");
  })
  .catch((err) => {
    console.error("MongoDBga ulanish vaqtida xato ro'y berdi...", err);
  });

  app.set('api_secret_key', config.api_secret_key)

/// Body-parser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/// routes
app.use(rUser);
app.use(token);
app.use('/api/movies',rIndex);
app.use('/api/director',rDirector);


/// Pug

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))

/// Static folder

app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000, ()=>{
    console.log('3000 port is running');
})