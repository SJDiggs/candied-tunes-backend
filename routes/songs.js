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

// SONGS SHOW ROUTE
router.get("/:id",songsCtrl.show)

// SONGS DELETE ROUTE
router.delete("/:id",songsCtrl.delete)

// DELETE SONG BY SONG NAME AND ARTIST
router.delete("/", songsCtrl.destroyBySongName)


// UPDATE ALL SONGS ROUTE
// router.put("/:id", songsCtrl.update)
router.put("/", songsCtrl.updateAll)

// UPDATE A SONG ROUTE
// router.put("/:id", songsCtrl.update)


module.exports = router