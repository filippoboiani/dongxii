var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  "_id": {
    type: String,
    required: true,
    unique: true
  },
  "name": {
    type: String,
    required: true
  },
  "lastname": {
    type: String,
    required: true
  },
  "pass":{
    type: String,
    required: true
  },
  "type": {
    type: String,
    required: true,
    enum: ["admin", "business", "customer"],
    default: "customer"
  },
  "sex": String,
  "history": [{
    "coordinates": {
      "lat": Number,
      "lng": Number
    },
    "mobility": {
      type: String,
      enum: ["walking", "running", "still", "car", "train"],
      default: "walking"
    },
    "time": {
      type: Date,
      required: true
    }

  }],
  "relatedPois": [String]
});

// for protected passwords: https://devdactic.com/restful-api-user-authentication-1/

module.exports = mongoose.model('User', UserSchema);



// db.users.insert([{
//   _id: "filippo.boiani@studio.unibo.it",
//   name: "Filippo",
//   lastname: "Boiani",
//   pass: "filippo.boiani",
//   type: "admin",
//   sex: "male",
//   history: [],
//   relatedPois: []
// },
// {
//   _id: "riccardo.sibani@studio.unibo.it",
//   name: "Riccardo",
//   lastname: "Sibani",
//   pass: "riccardo.sibani",
//   type: "admin",
//   sex: "male",
//   history: [],
//   relatedPois: []
// }
// ]);
