// order-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'order';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    delivery_invoice_no: { type: String},
    orderno: { type: String},
    delivery_location: { type: String},
    customer_name: { type: String},
    addressaspercustomer: { type: String},
    mobilenumber: { type: String},
    finaltotal: { type: String},
    paymentmethod: { type: String},
    no_of_item: { type: String},
    amount_payable: { type: String},
    delivery_date: { type: String},
    delivery_time: { type: String},
    delivery_type: { type: String},
    net_total: { type: String},
    rounded_net_total: { type: String},
    status: { type: String , enum : ['open','assigned','delivered'],
    default: 'open' },

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
