const app = require('../../src/app');

describe('\'modulepermission\' service', () => {
  it('registered the service', () => {
    const service = app.service('modulepermission');
    expect(service).toBeTruthy();
  });
});
