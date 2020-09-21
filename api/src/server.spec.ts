
import chai = require('chai')
import chaiHttp = require('chai-http')

import { main } from './server';

chai.use(chaiHttp);
const { expect } = chai;

const testEndPoint = `http://localhost:4848`;
describe('Integration tests', function() {

  this.beforeAll(async function () {
    this.server =  await main();
  });

  describe('Starting up', function() {
    it('listens to our hacked conf', function() {
      expect(this.server.listening).to.be.true;
    });
  });

  describe('endpoints', function() {

    it('supports main', async function() {
      const res = await chai.request(testEndPoint).get('/graphql').send();
      expect(res).to.have.status(200);
      
    });
  });

  this.afterAll(function() {
    this.server.close((err: Error) => {
      if (err) { console.error(err); }
      console.log('Closed test server.');
    });
  });

});
