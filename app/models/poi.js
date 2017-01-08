var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PoiSchema = Schema(
  {
    "name": {
      type: String,
      required: true
    },
    "activities": [{
        "name": String,
        "message": String
      }],
    "sender": {
      type: String,
      required: false
    },
    "address": {
      type: String,
      required: false
    },
    "location": {
      type: {
          type: String,
          required: true,
          enum: ["Point", "LineString", "Polygon"],
          default: "Point"
        },
      coordinates: {
        type: Array
      }
    },
    "radius": {
      type: Number,
      required: true
    },
    "interval": {
      "from": Date,
      "to": Date
    }
  }
);

module.exports = mongoose.model('Poi', PoiSchema);


// // List of POIs
// db.pois.insert([{
//   "name": "Feltrinelli",
//   "activity": "walking",
//   "message": "Un nuovo libro è disponibile",
//   "sender": "filippo.boiani@studio.unibo.it",
//   "location": {
//     "type": "Point",
//     "coordinates": [11.3459341, 44.494273]
//   },
//   "radius": 40,
//   "interval": {
//     "from": new Date("2016-07-14T09:30:00Z"),
//     "to": new Date("2016-07-29T23:30:00Z")
//   }
// },
// {
//   "name": "Impero",
//   "activity": "walking",
//   "message": "Le paste solo per oggi a 50 centesimi",
//   "sender": "filippo.boiani@studio.unibo.it",
//   "location": {
//     "type": "Point",
//     "coordinates": [11.3459035, 44.4939358]
//   },
//   "radius": 30,
//   "interval": {
//     "from": new Date("2016-07-14T09:30:00Z"),
//     "to": new Date("2016-07-29T23:30:00Z")
//   }
// },
// {
//   "name": "Tamburini",
//   "activity": "walking",
//   "message": "Aperitivi con mortadella e grana a partire da 5 euro",
//   "sender": "filippo.boiani@studio.unibo.it",
//   "location": {
//     "type": "Point",
//     "coordinates": [11.3456914, 44.4938902]
//   },
//   "radius": 70,
//   "interval": {
//     "from": new Date("2016-07-14T09:30:00Z"),
//     "to": new Date("2016-07-29T23:30:00Z")
//   }
// },
// {
//   "name": "Bar Otello",
//   "activity": "walking",
//   "message": "Inaugurazione, nuova gestione. ",
//   "sender": "riccardo.sibani@studio.unibo.it",
//   "location": {
//     "type": "Point",
//     "coordinates": [11.3447025, 44.4935804]
//   },
//   "radius": 20,
//   "interval": {
//     "from": new Date("2016-07-14T09:30:00Z"),
//     "to": new Date("2016-07-29T23:30:00Z")
//   }
// },
// {
//   "name": "Trattoria Gianni",
//   "activity": "walking",
//   "message": "Menù con tigelle a volontà a 15 euro",
//   "sender": "riccardo.sibani@studio.unibo.it",
//   "location": {
//     "type": "Point",
//     "coordinates": [11.3447204, 44.4932505]
//   },
//   "radius": 50,
//   "interval": {
//     "from": new Date("2016-07-14T09:30:00Z"),
//     "to": new Date("2016-07-29T23:30:00Z")
//   }
// }]);

//db.pois.createIndex( { location : "2dsphere" } )

// db.pois.aggregate([
//     // Match documents "near" the queried point
//     { "$geoNear": {
//       "near": {
//           "type": "Point",
//           "coordinates": [ 11.345238  , 44.493785  ]
//       },
//       "distanceField": "distance",
//       "spherical": true
//   }},
//
//     // Calculate if distance is within radius
//     { "$project": {
//         "name": 1,
//         "location": 1,
//         "radius": 1,
//         "distance": 1,
//         "within": { "$lte": [ "$distance", "$radius" ] }
//     }},
//
//     // Match only documents within the radius
//     { "$match": { "within": true } }
// ])
