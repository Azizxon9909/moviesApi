const express = require("express");
const MoviesSchema = require("../model/Movies");
const router = express.Router();

router.get("/", (req, res) => {
  const movies = MoviesSchema.find({});
  movies
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  const movie = new MoviesSchema(req.body);
  movie
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/:movie_id", (req, res) => {
  // MoviesSchema.findById(req.params.movie_id, (err, data) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send(data);
  //   }
  // });
  const movie = MoviesSchema.findById(req.params.movie_id);
  movie
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.put("/:movie_id", (req, res) => {
  // MoviesSchema.findByIdAndUpdate(req.params.movie_id, req.body, (err, data) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send(data);
  //   }
  // });
  const movie = MoviesSchema.findByIdAndUpdate(req.params.movie_id, req.body);
  movie
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.delete("/:movie_id", (req, res) => {
  // MoviesSchema.findByIdAndRemove(req.params.movie_id, (err, data) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send(data);
  //   }
  // });
  const movie = MoviesSchema.findByIdAndRemove(req.params.movie_id);
  movie
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/top/top5", (req, res) => {
  // MoviesSchema.find({}, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     //res.send(err);
  //   } else {
  //     res.send(data);
  //   }
  // })
  //   .sort({ imbd_score: -1 })
  //   .limit(5);
  const movies = MoviesSchema.find({}).sort({ imbd_score: -1 }).limit(5);
  movies
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err.message);
    });
});
router.get("/between/:start_year/:end_year", (req, res) => {
  let { start_year, end_year } = req.params;
  const movies = MoviesSchema.find({
    $and: [{ year: { $gte: start_year } }, { year: { $lte: end_year } }],
  });
  movies
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

module.exports = router;
