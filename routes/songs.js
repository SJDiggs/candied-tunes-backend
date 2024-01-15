// ./routes/songs.js

// DEPENDENCIES
const express = require('express')
const router = express.Router()

// import conroller
const songsCtrl = require('../controllers/songs')


// SONGS INDEX ROUTE
router.get("/", songsCtrl.index)

// SONGS CREATE ROUTE
router.post("/", songsCtrl.create)
// router.post("/", async (req, res) =>  {
//     // req.body is the data provided by the frontend (client) post route
// 	res.json({message: "Songs create route", data: {...req.body}})
//     console.log(req.body)
// });

// SONGS SHOW ROUTE
router.get("/:id",songsCtrl.show)

// SONGS DELETE ROUTE
router.delete("/:id",songsCtrl.delete)

// SONGS UPDATE ROUTE
router.put("/:id", songsCtrl.update)

module.exports = router