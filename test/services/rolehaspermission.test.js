const app = require('../../src/app');

describe('\'rolehaspermission\' service', () => {
  it('registered the service', () => {
    const service = app.service('rolehaspermission');
    expect(service).toBeTruthy();
  });
});
