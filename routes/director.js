const express = require("express");
const mongoose = require('mongoose');
const DbDirector = require("../model/Director");
const router = express.Router();

// router.get('/', (req,res)=>{
//   const db = DbDirector.find({});
//   db
//     .then((data) => res.send(data))
//     .catch((err) => res.send(err));
// })

router.post("/", (req, res) => {
  const db = new DbDirector(req.body);
  db.save()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});
router.put("/:director_id", (req, res) => {
  const db = DbDirector.findByIdAndUpdate(req.params.director_id, req.body);
  db
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});
router.delete("/:director_id", (req, res) => {
  const db = DbDirector.findByIdAndRemove(req.params.director_id);
  db
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});
router.get("/", (req, res) => {
  const db = DbDirector.aggregate([
    {
      $lookup: {
        from: "cinemas",
        localField: "_id",
        foreignField: "director_id",
        as: "film",
      },
    },
    {
      $unwind: {
        path: "$film",
      },
    },
    {
      $group: {
        _id :{
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        film: {
          $push: '$film'
        }
      }
    }, 
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        film: '$film'
      }
    }
  ]);
  db.then((data) => res.send(data)).catch((err) => res.send(err));
});
router.get("/:director_id", (req, res) => {
  const db = DbDirector.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: "cinemas",
        localField: "_id",
        foreignField: "director_id",
        as: "film",
      },
    },
    {
      $unwind: {
        path: "$film",
      },
    },
    {
      $group: {
        _id :{
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        film: {
          $push: '$film'
        }
      }
    }, 
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        film: '$film'
      }
    }
  ]);
  db.then((data) => res.send(data)).catch((err) => res.send(err));
});
router.get("/:director_id/best3film", (req, res) => {
  const db = DbDirector.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: "cinemas",
        localField: "_id",
        foreignField: "director_id",
        as: "film"
      },
    },
    {
      $unwind: {
        path: "$film",
      },
    },
    {
      $group: {
        _id :{
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        film: {
          $push: '$film',
        },
      }
    }, 
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        bio: '$_id.bio',
        film: '$film'
      }
    }
  ]);
  db.then((data) => res.send(data)).catch((err) => res.send(err));
});
module.exports = router;
