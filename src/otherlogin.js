const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const { NotAuthenticated } =  require('@feathersjs/errors');


class MyLocalStrategy extends LocalStrategy {

  async findEntity(username) {
    const { entityUsernameField, service, errorMessage } = this.configuration;
    const query = await this.getEntityQuery({
      [entityUsernameField]: username
    });

    const entityService = this.app.service(service);

    const result = await entityService.find({
      query,
    })



    const list = Array.isArray(result) ? result : result.data;

   if(list[0].role.slug == 'admin'){
    throw new NotAuthenticated(errorMessage);
   }

    if (!Array.isArray(list) || list.length === 0) {
      throw new NotAuthenticated(errorMessage);
    }

    const [entity] = list;

    return entity;
  }


  async getEntityQuery(query, params) {
    // Query for user but only include users marked as `active`
    return {
      ...query,
      $populate : ({
        path : 'role',
        model : 'role',
      }),
      $limit: 1
    }
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new MyLocalStrategy());

  app.use('/login', authentication);
  app.configure(expressOauth());
};
