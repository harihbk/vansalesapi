// customer-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'customer';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    customer_name: { type: String, required: true },
    mobile_number: { type: String, required: true },
    email: { type: String, required: true },
    date_of_birth: { type: String, required: true },
    address1: { type: String },
    address2: { type: String },
    landmark: { type: String },
    postalcode: { type: String },
    country: { type: String },
    unique_id: { type: String },
    latitude: { type: String },
    longitude: { type: String},
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
