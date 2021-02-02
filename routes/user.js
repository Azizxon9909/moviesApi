const express = require("express");
const router = express.Router();
const DbUsers = require("../model/User");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  bcryptjs.hash(password, 10, (err, hash) => {
    const db = new DbUsers({
      username,
      password: hash,
    });
    db.save()
      .then((data) => res.send(data))
      .catch((err) => console.log(err));
  });
});
router.post("/auth", (req, res) => {
  const { username, password } = req.body;
  DbUsers.findOne({ username }, (err, data) => {
    if (err) throw err;
    if (!data) {
      res.json({
        status: 404,
        msg: "Username xato kiritildi!",
      });
    } else {
      bcryptjs.compare(password, data.password).then((user) => {
        if (!user) {
          res.json({
            status: false,
            msg: "Parol notogri kiritildi",
          });
        } else {
          const payload = { username };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720
          })
          res.json({
            status:true,
            token
          })
        }
      });
    }
  });
});
module.exports = router;
