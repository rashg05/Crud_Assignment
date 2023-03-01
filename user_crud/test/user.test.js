const { Op } = require('sequelize');
const { describe, it, after } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const { sequelizeManager } = require('../src/managers');

const { UserModel } = sequelizeManager;

chai.use(chaiHttp);

const should = chai.should();

// const headers = {
//   'user-id': 1,
// };
const greater255 = `This website stores cookies on your computer. 
These cookies are used to collect information about how you interact with our website and 
allow us to remember you.We use this information in order to improve and customize your 
browsing experience and for analytics and metrics about our visitors both on this website and other media`;

const createTestData = async () => UserModel.bulkCreate([{
    firstname: `test-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 1,
  }, {
    firstname: `test-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 1,
  },
  {
    firstname: `test-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 2,
  }, {
    firstname: `test-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 2,
  }, {
    firstname: `test-${Math.floor(100000 + Math.random() * 900000)}`,
    deleted: 1,
    deleted_at: new Date(),
  },
//   {
//     lastname: `test-${Math.floor(100000 + Math.random() * 900000)}`,
//     status: 1,
//   }, {
//     lastname: `test-${Math.floor(100000 + Math.random() * 900000)}`,
//     status: 1,
//   },
//   {
//     lastname: `test-${Math.floor(100000 + Math.random() * 900000)}`,
//     status: 2,
//   }, {
//     lastname: `test-${Math.floor(100000 + Math.random() * 900000)}`,
//     status: 2,
//   }, {
//     lastname: `test-${Math.floor(100000 + Math.random() * 900000)}`,
//     deleted: 1,
//     deleted_at: new Date(),
//   }
]);

  describe('Users Test', async () => {

    describe(`POST('/')`, () => {
      it('should create bulk test data.', async () => {
        // eslint-disable-next-line no-unused-vars
        await createTestData();
      });
      it('should create a user. ', async () => {
        const body = {
          firstname: String(Math.floor(100000 + Math.random() * 900000)),
        //   lastname: String(Math.floor(100000 + Math.random() * 900000)),
        };
        const res = await chai.request(app)
          .post('/users/')
        //   .set(headers)
          .send(body);
  
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data')
          .which
          .is
          .an('object')
          .that
          .has
          .property('user')
          .which
          .is
          .an('object');
      });
  
      it('should give validation error because name can not be blank.', async () => {
        const body = {
          firstname: '',
        //   lastname: '',
        };
  
        const res = await chai
          .request(app)
          .post('/users/')
          .send(body)
        //   .set(headers);
  
        res.should.have.status(400);
        res.error.should.not.be.false;
      });
  
      it('should give validation error because name is not string.', async () => {
        const body = {
          firstname: 212,
        //   lastname: 123,
        };
  
        const res = await chai
          .request(app)
          .post('/users/')
          .send(body)
        //   .set(headers);
        res.should.have.status(400);
        res.error.should.not.be.false;
      });
  
      it('should give validation error because body contains a unknown field [xyz].', async () => {
        const body = {
          xyz: 123,
        };
  
        const res = await chai
          .request(app)
          .post('/users/')
          .send(body)
        //   .set(headers);
  
        res.should.have.status(400);
        res.error.should.not.be.false;
      });
  
      it('should give validation error because name length is grater than 255 characters.', async () => {
        const body = {
          firstname: greater255,
        //   lastname: greater255,
        };
  
        const res = await chai
          .request(app)
          .post('/users/')
          .send(body)
        //   .set(headers);
  
        res.should.have.status(400);
        res.error.should.not.be.false;
      });
    });  
});