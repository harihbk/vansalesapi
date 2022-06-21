// trip-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'trip';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    truck: { type: Schema.Types.ObjectId , rel : 'truck' },
    driver: { type: Schema.Types.ObjectId , rel : 'users' },
    loadman: { type: Schema.Types.ObjectId , rel : 'users' },
    tripid: { type: String },
    tripidcount: { type: Number },


    status: { type: Number , default : 0},
  }, {
    timestamps: true
  });


  //status 0 - pending 1- completed

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }

  schema.post('save', async function(doc,next) {
    try {
      let count = await doc
      .model("trip").count();
       const str = count.toString();
        let h =  str.padStart(12, "0");
       await doc
        .model("trip")
        .updateOne({ _id: doc._id }, {  tripid: h });


    } catch (error) {
      console.log("get -> error", error);
      next(error);
    }

});

  return mongooseClient.model(modelName, schema);

};
