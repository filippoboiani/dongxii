db.insert();

// order
{
  "objectId": "string",
  "updatedAt": "date",
  "createdAt": "date",
  "ACL": "object",
  "customer": "*_User",
  "shipping_address": "object",
  "billing_address": "object",
  "line_items": "array",
  "total_weight": "number",
  "shipping_details": "object",
  "shared_shipping_box": "*SharedShippingBox",
  "payment_details": "object",
  "currency": "string",
  "subtotal": "number",
  "cart_tax_rate": "number",
  "shipping_total": "number",
  "shipping_tax_rate": "number",
  "total": "number",
  "status": "string",
  "discount": "number",
  "coupon": "*Coupon"
}

{
  "updatedAt": new Date(),
  "createdAt": new Date(),
  "ACL": "??? Forgot what this is",
  "customer": "John Doe",
  "shipping_address": "Bismarckstrasse 12, Berlin, Germany",
  "billing_address": "Bismarckstrasse 12, Berlin, Germany",
  "line_items": [
    {
      "updatedAt": new Date(),
      "createdAt": new Date(),
      "product": "Original French Teapot",
      "quantity": 2,
      "unit_price": 25,
      "origin_currency": "EUR",
      "target_currency": "CNY",
      "exchange_rate": 7.29112
    },
    {
      "updatedAt": new Date(),
      "createdAt": new Date(),
      "product": "Italian Fine Jacket",
      "quantity": 1,
      "unit_price": 354,
      "origin_currency": "EUR",
      "target_currency": "CNY",
      "exchange_rate": 7.29112
    }
  ],
  "total_weight": 4,
  "currency": "EUR",
  "subtotal": 379,
  "cart_tax_rate": 21,
  "shipping_total": 400,
  "shipping_tax_rate": 100,
  "total": 500,
  "status": "ok"
}

// lineitem

{
  "objectId": "string",
  "updatedAt": "string",
  "createdAt": "string",
  "product": "*Product",
  "variation": "object",
  "quantity": "number",
  "unit_price": "number",
  "origin_currency": "string",
  "target_currency": "string",
  "exchange_rate": "number"
}
