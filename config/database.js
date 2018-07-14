module.exports = {
    database: process.env.MONGODB_URI || 'mongodb://localhost:27017/news' //is 'allthenews' the right thing? or perhaps 'news'
  };

// ````do I need this below```````?
//   // Set mongoose to leverage built in JavaScript ES6 Promises
// // Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);