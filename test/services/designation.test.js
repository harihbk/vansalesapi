const app = require('../../src/app');

describe('\'Designation\' service', () => {
  it('registered the service', () => {
    const service = app.service('designation');
    expect(service).toBeTruthy();
  });
});
