// truck-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'truck';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    truckname: { type: String, required: true },
    truckno: { type: String, required: true , unique : true},
    //trucktype: { type: String, required: true },
    insurance_expire: { type: Date },


    vehicle_type: { type:  Schema.Types.ObjectId , rel : 'vehicletype'},
    make: { type: String },
    model: { type: String },
    year: { type: String },
    vehicle_no: { type: String },
    plate_no: { type: String },
    owned_by: { type: String },
    insurance_expire: { type: Date },
    registration_expiry: { type: Date },

    vehicle_color: { type: String },
    default_driver: { type: Schema.Types.ObjectId , rel : 'users' },
    max_load_capacity: { type: String },
    min_load_capacity: { type: String },
    max_speed: { type: String },
    files: { type: String },


    // users: { type: Schema.Types.ObjectId , rel : 'users' },
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
