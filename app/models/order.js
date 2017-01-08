var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = Schema(
  {
    "updatedAt": {
      type: Date
    },
    "createdAt": {
      type: Date
    },
    "ACL": String,
    "customer": String,
    "shipping_address": String,
    "billing_address": String,
    "line_items": [{
      "updatedAt": Date,
      "createdAt": Date,
      "product": String,
      "quantity": Number,
      "unit_price": Number,
      "origin_currency": String,
      "target_currency": String,
      "exchange_rate": Number
    }],
    "total_weight": Number,
    "currency": String,
    "subtotal": Number,
    "cart_tax_rate": Number,
    "shipping_total": Number,
    "shipping_tax_rate": Number,
    "total": Number,
    "status": String,
  }
);
module.exports = mongoose.model('Order', OrderSchema);

// example
// db.orders.insert({
//   "updatedAt": new Date(),
//   "createdAt": new Date(),
//   "ACL": "??? Forgot what this is",
//   "customer": "John Doe",
//   "shipping_address": "Bismarckstrasse 12, Berlin, Germany",
//   "billing_address": "Bismarckstrasse 12, Berlin, Germany",
//   "line_items": [
//     {
//       "updatedAt": new Date(),
//       "createdAt": new Date(),
//       "product": "Original French Teapot",
//       "quantity": 2,
//       "unit_price": 25,
//       "origin_currency": "EUR",
//       "target_currency": "CNY",
//       "exchange_rate": 7.29112
//     },
//     {
//       "updatedAt": new Date(),
//       "createdAt": new Date(),
//       "product": "Italian Fine Jacket",
//       "quantity": 1,
//       "unit_price": 354,
//       "origin_currency": "EUR",
//       "target_currency": "CNY",
//       "exchange_rate": 7.29112
//     }
//   ],
//   "total_weight": 4,
//   "currency": "EUR",
//   "subtotal": 379,
//   "cart_tax_rate": 21,
//   "shipping_total": 400,
//   "shipping_tax_rate": 100,
//   "total": 500,
//   "status": "ok"
// });
