const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

const app = require('../../app');
const http = require('http').Server(app);
const PORT = '3000';
http.listen(PORT, () => {
  console.log(`app is listening http://localhost:${PORT}`);
});

describe('test', (done) => {

  it('', () => {
    chai.request(http)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });
});
