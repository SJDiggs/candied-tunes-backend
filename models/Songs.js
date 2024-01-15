
// DEPENDENCIES

const mongoose = require('mongoose');
const Schema = mongoose.Schema

// SONG MODEL SCHEMA

const SongsSchema = new Schema({
    songName: {
        type: String,
        required: true,
    },
    songArtist: {
        type: String,
    },
    songInstrument: {
        type: String,
        enum: ['Guitar', 'Ukulele', 'Keyboard'],
        default: 'Guitar' 
    },
    songIsOriginal:  {
        type: Boolean,
        default: false
    },
  songPlayed: {
    type: Boolean,
    default: false},
  },
    {timestamps: true});

module.exports = mongoose.model('Songs', SongsSchema);