/*
  This module manages all the http requests.
  It can be considered a GRASP Controller (or a handler).
*/

var mongoose = require('mongoose'); // Mongodb connection

// Mongoose schemas
// var Poi = require('./models/poi');
// var User = require('./models/user');
var Order = require('./models/order');
// History

// var passport	= require('passport');
// var jwt = require('jwt-simple');
var config = require('../config/server/database'); // get db config file
var path = require('path');
var color = require('colors-cli/safe')
var error = color.red.bold;
var warn = color.yellow;
var notice = color.x45;

var qr = require('qr-image'); // TODO: move to a specific file

//TEST
// http://localhost:8080/api/order/586e78afc28d11215d2b5005
// http://localhost:8080/api/mockdb/
// http://localhost:8080/api/qrcode/ {"orderId": "586e78afc28d11215d2b5005"}
// Routing module related to app
module.exports = function (app) {

  // Test route
  app.get('/api/mockdb/', function(req, res, next){
    console.log('api/poi/mockdb');
    res.json({ message: "mockdb"});
  });

  // Get a single order
  // TODO:
  // 1 - Filter the informations in order to get only the product-related infos.
  // 2 - Use an Auth System

  app.get('/api/order/:orderId', function(req, res, next){
    var orderId = req.params.orderId;

    Order.findById(orderId, function(err, order){
      if (err) throw err;
      else {
        res.json({success: true, data: order});
      }
    });
  });

  // Generate the QR Code
  app.post('/api/qrcode/', function(req, res){
    console.log('api/qrcode');

    var id = req.body.orderId;
    var fileName = id+".png"
    var file = path.resolve('qrcodes/'+fileName);
    console.log("Creating "+fileName+" ...");

    var qrcodePNG = qr.image(id , { type: 'png' });
    qrcodePNG.pipe(require('fs').createWriteStream(file));

    res.json({ success: true, message: "QR code successfully created."});

  });

  app.get('/api/qrcode/:orderId', function(req, res, next){
    //res.json({success: false, data: "Still to implement..."})

    var id = req.params.orderId;
    var fileName = id+".png"
    var file = path.resolve('qrcodes/'+fileName);
    res.sendFile(file);
  });



    // app.get('/api/poi/customer/:id/:mobility/:lat/:lng', function(req, res, next) {
    //   console.log("api/poi/customer");
    //   var userRequest = {};
    //
    //   // Current time
    //   var time = new Date();
    //
    //   userRequest.coordinates = {};
    //   // TODO: Check data
    //   userRequest.coordinates.lat = parseFloat(req.params.lat);
    //   userRequest.coordinates.lng = parseFloat(req.params.lng);
    //   userRequest.mobility = req.params.mobility;
    //   userRequest.id = req.params.id;
    //   console.log(userRequest);
    //
    //   // Search for POI in radius
    //   /* Why this query is working:
    //     1 - The query sorts all the pois using the distance
    //     2 - If the distance is lower or equals to the radius the poi is valid
    //     3 - ... But a polygon doesn't have a radius (actually is set to 0) how does this thing works?
    //     4 - Easy! $geoNear is something similar to $geoIntersect: if a point is contained in a polygon the distance is
    //       negative or equal to 0. When it comes to check if the distance (0) is lte (lower or equals) the radius (0)
    //       the $project returns true and so the polygon.
    //
    //       KEY: $geoNear (near), $project GeoJSON within, $match, geoIndexes, 2dsphere
    //   */
    //   /*
    //     - $geoNear: Outputs documents in order of nearest to farthest from a specified point.
    //     - near field requires GeoJSON point
    //     - spherical true: because we are consideraing coordinates and 2dsphere index
    //     - distanceField: The output field that contains the calculated distance. To specify a field within
    //         an embedded document, use dot notation.
    //     - minDistance and maxDistance: optional
    //     - Aggreagtion: Aggregations operations process data records and return computed results.
    //         Aggregation operations group values from multiple documents together, and can perform a variety
    //         of operations on the grouped data to return a single result. MongoDB provides three ways to perform
    //         aggregation: the aggregation pipeline, the map-reduce function, and single purpose aggregation methods.
    //   */
    //
    //   Poi.aggregate([
    //
    //     // Match documents "near" the queried point
    //     { "$geoNear": {
    //       "near": {
    //           "type": "Point",
    //           "coordinates": [ userRequest.coordinates.lng , userRequest.coordinates.lat ]
    //       },
    //       "distanceField": "distance",
    //       "spherical": true
    //     }},
    //
    //     // Split the array of activities
    //     { "$unwind": "$activities"},
    //
    //     // Calculate if distance is within radius
    //     { "$project": {
    //         "name": 1,
    //         "location": 1,
    //         "radius": 1,
    //         "distance": 1,
    //         "activityName": "$activities.name",
    //         "message": "$activities.message",
    //         "fromHours": { $hour: "$interval.from" } ,
    //         "toHours": { $hour: "$interval.to" },
    //         "fromMin": { $minute: "$interval.from" },
    //         "toMin": { $minute: "$interval.to" },
    //         "within": { "$lte": [ "$distance", "$radius" ] }
    //     }},
    //
    //     /* Match only documents:
    //       - within the radius
    //       - within the specified time interval
    //       - with the activity-message pair relative to the user mobility
    //      */
    //     { "$match": {
    //       "within": true,
    //       "activityName": userRequest.mobility
    //       // "fromHours": { "$lte": time.getHours() },
    //       // "toHours": { "$gte": time.getHours() },
    //     } }
    //   ],
    //
    //     function (err, resultSet) {
    //     if (err) return next(err);
    //     else {
    //       res.json(resultSet);
    //     }
    //
    //   });
    //
    //
    //
    //   // Save the request in History
    //   User.findByIdAndUpdate(req.params.id,
    //     { "$push": {
    //       "history": {
    //         "coordinates": {
    //           "lat": req.params.lat,
    //           "lng": req.params.lng,
    //         },
    //         "mobility": req.params.mobility,
    //         "time": time
    //       }
    //     }
    //   }, function(err, numberAffected){
    //
    //   });
    // });
    //
    // // When a business user insert a poi
    // app.put("/api/poi", passport.authenticate('jwt', {session: false}), checkAuth, function(req, res, next){
    //   //console.log(req.user);
    //   console.log("Adding poi...");
    //   console.log(req.body);
    //   var poi = null;
    //   if (req.body.type == "polygon"){
    //
    //     poi = new Poi({
    //       name: req.body.name,
    //       activities: req.body.activities,
    //       sender: req.user._id,
    //       address: req.body.address,
    //       location: {
    //         type: "Polygon",
    //         coordinates: [req.body.pointList]
    //       },
    //       radius: 0,
    //       interval: {
    //         from: req.body.from,
    //         to: req.body.to
    //       }
    //     });
    //   } else if(req.body.type == "circle") {
    //     poi = new Poi({
    //       name: req.body.name,
    //       activities: req.body.activities,
    //       sender: req.user._id,
    //       address: req.body.address,
    //       location: {
    //         coordinates: [req.body.lng, req.body.lat]
    //       },
    //       radius: req.body.radius,
    //       interval: {
    //         from: req.body.from,
    //         to: req.body.to
    //       }
    //     });
    //   }
    //   console.log(poi);
    //   poi.save(function(err) {
    //     if (err) {
    //       errToSend = {
    //         success: false,
    //         err: err,
    //         msg: 'Error while salving the poi.'
    //       };
    //       console.log(error(err),error(errToSend));
    //
    //       return res.json(errToSend);
    //
    //     } else {
    //       msgToSend = {
    //         success: true,
    //         msg: 'Poi successfully created.'
    //       };
    //       console.log(notice("New poi created"),notice(JSON.stringify(msgToSend)));
    //       res.json(msgToSend);
    //     }
    //   });
    //
    // });
    //
    // // When a business user requires the list of pois
    // app.get("/api/pois", passport.authenticate('jwt', {session: false}), checkAuth, function(req, res, next){
    //   // If admin return all the pois
    //   if(req.user.type === "admin"){
    //     Poi.find(function(err, pois){
    //       if (err) throw err;
    //       else {
    //         res.json({success: true, data: pois});
    //       }
    //     });
    //   }else {
    //     // If business user, return only the related pois
    //     Poi.find({"sender": req.user._id}, function(err, pois){
    //       if (err) throw err;
    //       else {
    //         res.json({success: true, data: pois});
    //       }
    //     });
    //   }
    //
    // });
    //
    // // When a business user requires the list of pois
    // app.get("/api/users", passport.authenticate('jwt', {session: false}), checkAuth, function(req, res, next){
    //   // If admin return all the pois
    //   if(req.user.type === "admin"){
    //     console.log("The user is an Admin");
    //     User.find(function(err, users){
    //       if (err) throw err;
    //       else {
    //         res.json({success: true, data: users});
    //       }
    //     });
    //   }else {
    //     console.log("The user is NOT Admin");
    //     // If business user or customer, return only his/her profile
    //     User.find({
    //       _id: req.user._id
    //
    //     }, function(err, user){
    //       if (err) throw err;
    //       else {
    //         res.json({success: true, data: user});
    //       }
    //     });
    //
    //   }
    //
    // });
    //
    // // When a business user requires the list of pois
    // app.get("/api/user", passport.authenticate('jwt', {session: false}), checkAuth, function(req, res, next){
    //
    //   // If admin return all the pois
    //   User.findOne({
    //     _id: req.user._id
    //
    //   }, function(err, user){
    //     if (err) throw err;
    //     else {
    //       user.pass = undefined
    //       res.json({success: true, data: user});
    //     }
    //   });
    //
    //
    // });
    //
    // // Route to authenticate a user (POST http://localhost:8080/api/authenticate)
    // app.post('/api/authenticate', function(req, res) {
    //   console.log(warn("»   /api/authenticate called. Request Body is: \n"+JSON.stringify(req.body)));
    //   User.findOne({
    //     _id: req.body.email,
    //     pass: req.body.pass
    //
    //   }, function(err, user) {
    //     if (err) throw err;
    //     if (user) {
    //       console.log(notice("User correct!\n"), notice(user));
    //       // if user is found and password is right create a token
    //       var token = jwt.encode(user, config.secret);
    //       // return the information including token as JSON
    //       msgToSend = {
    //         success: true,
    //         token: 'JWT ' + token
    //       };
    //       console.log(notice("Got Token!\n"),notice(JSON.stringify(msgToSend)));
    //       res.json(msgToSend);
    //     } else {
    //       errToSend = {
    //         success: false,
    //         msg: 'Authentication failed. User not found.'
    //       };
    //       console.log(error(JSON.stringify(errToSend)));
    //       res.send(errToSend);
    //
    //     }
    //   });
    // });
    //
    // // User registration
    // app.post('/api/signup', function(req, res) {
    //
    //   console.log(warn("»   /api/signup called. Request Body is: \n" + JSON.stringify(req.body)));
    //   if (!req.body.email || !req.body.pass || !req.body.name || !req.body.lastname) {
    //     errToSend = {
    //       success: false,
    //       msg: 'Please insert at least email, password, name and surname'
    //     };
    //     console.info(warn("Error email/pass/name/surname"),warn(errToSend));
    //     res.json(errToSend);
    //   } else {
    //     // Create a new user
    //     var newUser = new User({
    //       _id: req.body.email,
    //       name: req.body.name,
    //       lastname: req.body.lastname,
    //       pass: req.body.pass,
    //       sex: req.body.sex,
    //       type: "business"
    //     });
    //     // save the user
    //     newUser.save(function(err) {
    //       if (err) {
    //         errToSend = {
    //           success: false,
    //           err: err,
    //           msg: 'The triple Name, Surname and Email already exists.'
    //         };
    //         console.log(error(err),error(errToSend));
    //
    //         return res.json(errToSend);
    //
    //       } else {
    //         msgToSend = {
    //           success: true,
    //           msg: 'User successfully created.'
    //         };
    //         console.log(notice("New user created"),notice(JSON.stringify(msgToSend)));
    //         res.json(msgToSend);
    //       }
    //     });
    //   }
    // });
};
