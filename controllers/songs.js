// DEPENDENCIES
const express = require('express')
// const {Songs} = require('../models')
// below imports multiple models ->
const db = require('../models')
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
        res.status(200).json((await db.Songs.findByIdAndDelete(req.params.id)))
    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}

// UPDATE SONG
async function update(req,res,next){
    try {
        res.status(200).json(
            await db.Songs.findByIdAndUpdate(req.params.id, req.body, {new:true})
          )
        //   findByAndUpdate requires 3 arguments:
            // object id
            // data to be updated
            // response options ({new:true} provides doc w/new data)

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
    update
}