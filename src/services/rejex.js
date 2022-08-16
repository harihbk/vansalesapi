module.exports = function(ctx) {
   let query = ctx.params.query
     if(query.search){
        let keys = Object.keys(ctx.service.Model.find(ctx.service.Model).schema.obj)
        let gg = keys.reduce((prev,curr) => ( prev[curr] = new RegExp(query.search, "gi") ,prev),{} )
          query.$or = [ gg ]
          delete query.search
          // query.$text =  {
          //     $search: query.search
          //   }
        }

  return ctx;
}
