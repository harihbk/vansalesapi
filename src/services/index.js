const users = require('./users/users.service.js');
const role = require('./role/role.service.js');
const subrole = require('./subrole/subrole.service.js');
const modulepermission = require('./modulepermission/modulepermission.service.js');
const rolepermission = require('./rolepermission/rolepermission.service.js');
const rolehaspermission = require('./rolehaspermission/rolehaspermission.service.js');
const truck = require('./truck/truck.service.js');
const trip = require('./trip/trip.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(role);
  app.configure(subrole);
  app.configure(modulepermission);
  app.configure(rolepermission);
  app.configure(rolehaspermission);
  app.configure(truck);
  app.configure(trip);
};
 