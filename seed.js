// This module will seed the Pets Mongo DB

require("dotenv").config();
require("./config/db.connection.js");

const Song = require("./models/Songs");
// add another model here

// The seed data is being stored in a separate data.js module, we need to require this
const data = require("./seed-data");
const Songs = require("./models/Songs");

// await needs an async function - use an async IIFE! Clear the db initially.
(async function () {
  let results = await Song.deleteMany({});
  // results will be whatever the promise
  // returned by the deleteMany method resolves to
  console.log(results);

  results = await Promise.all([
    Song.create(data.songs),
    // add another schema here
  ]);
  console.log("Songs Created:  ", results[0]);
  // console.log("Created performers:", results[1]);

  // Associate a pet entity to another entity example below
  // results = await Promise.all([
  //   // Using regular expressions allows a partial match
  //   Movie.findOne({ title: /Star / }),
  //   // Performer.findOne({ name: /Mark / }),
  // ]);
  // // One day we'll destructure results like this:
  // // const [starWars, mark] = results;
  // const starWars = results[0];
  // const mark = results[1];
  // starWars.cast.push(mark._id);
  // await starWars.save();
  // console.log("Star Wars with Mark Hamill", starWars);


  // Lastly, use process.exit() to "cleanly" shut down the Node program
  process.exit();
})();
