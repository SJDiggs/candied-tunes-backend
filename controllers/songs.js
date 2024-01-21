// DEPENDENCIES
const express = require('express')
// const {Songs} = require('../models')
const {ObjectId} = require('mongodb')  //change to mongoose if fails

const db = require('../models/Index')
console.log(db.Songs)

// INDEX (SHOWS ALL SONGS)
async function index(req,res,next){
    try {
        res.status(200).json(await db.Songs.find({}))
    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}

// CREATE SONG
async function create(req,res,next){
    try {
        res.status(201).json(await db.Songs.create(req.body));
    console.log(req.body)

    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}

// SHOW (SHOWS AN INDIVIDUAL SONG)
async function show(req,res,next){
    try {
        res.status(200).json(await db.Songs.findById(req.params.id))
    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}

// DELETE SONG
async function destroy(req,res,next){
    try {
        console.log('params.id = ', req.params.id)
        res.status(200).json((await db.Songs.findByIdAndDelete(req.params.id)))
    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}

//  FIND SONG BY NAME AND ARTIST THEN DELETE SONG
async function destroyBySongName(req, res, next) {
    try {
        const { songName, songArtist } = req.query;

        if (!songName || !songArtist) {
            return res.status(400).json({ error: 'Both songName and songArtist are required parameters.' });
        }

        const song = await db.Songs.findOne({ songName, songArtist });

        if (!song) {
            return res.status(404).json({ error: 'Song not found.' });
        }
        console.log('Song Found - ID= ', song._id)
        // Use ObjectId to perform the deletion
        await db.Songs.findByIdAndDelete(song._id);

        res.status(200).json(song);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// UPDATE ALL SONGS
async function updateAll(req, res, next) {
    try {
        const result = await db.Songs.updateMany({}, { $set: { songPlayed: false } });
        res.status(200).json({ success: true, message: 'All songs updated successfully.' })
    } catch (err) {
        res.status(400).json({ err: err.message })
    }
}
// UPDATE SONG
async function update(req,res,next){
    try {
        res.status(200).json(
            await db.Songs.findByIdAndUpdate(req.params.id, req.body, {new:true})
          )
    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}


module.exports = {
    index,
    create,
    show,
    delete: destroy,
    destroyBySongName,
    updateAll,
    update
}