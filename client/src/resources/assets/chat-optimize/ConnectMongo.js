var mongoose = require('mongoose');


mongoose.connect(process.env.mongoDB_URI, (err, data) => {
    console.log('mongoosedb connected in client');
  })