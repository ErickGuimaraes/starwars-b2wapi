const request = require("supertest")
const mongoose = require("mongoose")
const assert = require("assert")
const should = require("should");
const app = require("../src/index.js")
const chai = require("chai");
const { MongoMemoryServer } = require('mongodb-memory-server');

before(async() => {

    mongoServer
    
    = new MongoMemoryServer();
    
    const mongouri = await mongoServer.getUri(); await mongoose.connect (mongouri, {
    
     useNewUrlParser: true, useUnifiedTopology: true,
    
    });
});

describe('Get', () => {
    context('without params', () => {
        let res
        before(async () => {
        res = await request(app).get("/Tatooine")
        })
  
        it('should return status 200 (OK)', () => {
          chai.expect(res.status).to.be.eql(404)

        })
    })
});

