// orderitem-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'orderitem';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    order: { type: Schema.Types.ObjectId , rel : 'order' },
    orderno : { type: String } ,
    materialid: { type: String},
    description: { type: String},
    quantity: { type: String},
    uom: { type: String},
    unit_price: { type: String},
    gross_price: { type: String},
    discount: { type: String},
    discount_amt: { type: String},
    tax: { type: String},
    tax_amount: { type: String},
    net_amount: { type: String},

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
