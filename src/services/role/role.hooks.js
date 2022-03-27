const { authenticate } = require('@feathersjs/authentication').hooks;

 const registerRole = async (context) => {
   const { result  } = context;
   let rolepermission = await context.app.service('rolepermission').find();
   let obj = rolepermission.map(e=>({
    name : e.name,
    slug : e.slug,
    permission : false,
    role       : result._id,
    rolepermission : e._id
   }))
   context.app.service('rolehaspermission').create(obj)

 }

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [authenticate('jwt') ],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ registerRole ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
