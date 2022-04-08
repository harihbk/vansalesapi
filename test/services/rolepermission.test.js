const app = require('../../src/app');

describe('\'rolepermission\' service', () => {
  it('registered the service', () => {
    const service = app.service('rolepermission');
    expect(service).toBeTruthy();
  });
});
