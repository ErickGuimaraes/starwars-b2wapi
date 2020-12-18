const app = require("../src/index.js");
const request = require("supertest");
const testDb = request(require("../src/index.js"));
const mongoose = require("mongoose");
const assert = require("assert");
const should = require("should");
const express = require("express");
const chai = require("chai");

const { planetModel } = require("../src/model/planetModel.js");

before(function (done) {

  function clearCollections() {
    for (var collection in mongoose.connection.collections) {
      mongoose.connection.collections[collection].remove(function() {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.test.db, function (err) {
      if (err) throw err;
      return clearCollections();
    });
  } else {
    return clearCollections();
  }
});

describe("Get", () => {
  context("Conection with api Main Page", () => {

    before(async () => {
      res = await request(app).get("/");
    });

    it("should return status 200 (OK)", () => {
      chai.expect(res.status).to.be.eql(200);
    });
  });
  context("Conection planets page", () => {

    before(async () => {
      res = await request(app).get("/planets");
    });

    it("should return status 200 (OK)", () => {
      chai.expect(res.status).to.be.eql(200);
    });
  });
  context("Conection not existent page", () => {
    let res;
    before(async () => {
      res = await request(app).get("/notExistentlink");
    });

    it("should return status 404 (Not Found)", () => {
      chai.expect(res.status).to.be.eql(404);
    });
  });
});

describe("Post /Planets", () => {
  context("when all fields were given", () => {
    const fixture = { name: "Tatooine", climate: "arid", terrain: "desert" };
    let res;

   before(async () => {

      res = await testDb.post("/planets").send(fixture);
    });

    it("should return 201 (Created)", () => {
      chai.expect(res.status).to.be.eql(201);
    });

    it("should return created planet", () => {
      const finalFixture = {
        film_appearances: res.body.film_appearances,
        _id: res.body._id,
        name: "Tatooine",
        climate: "arid",
        terrain: "desert",
      };
      chai.expect(res.body).to.be.eql(finalFixture);
    });
  });
  context("when all fields were given (Repeated)", () => {
    const fixture = { name: "Tatooine", climate: "arid", terrain: "desert" };
    let res;

    before(async () => {
      res = await testDb.post("/planets").send(fixture);
    });

    it("should return 500 (Internal Server Error)", () => {
      chai.expect(res.status).to.be.eql(500);
    });

    it("should return an error of Planet already been created", () => {
      const wrongFixture = {
        error: "ValidationError",
        message: `Planet ${fixture.name} has already been created`,
      };
      chai.expect(res.body).to.be.eql(wrongFixture);
    });
  });
  context("when wrong field name was given )", () => {
    const fixture = { name3: "Tatooine", climate: "arid", terrain: "desert" };
    let res;

    before(async () => {
      res = await testDb.post("/planets").send(fixture);
    });

    it("should return 500 (Internal Server Error)", () => {
      chai.expect(res.status).to.be.eql(500);
    });

    it("should return created Planet", () => {
      const wrongFixture = {
        error: "ValidationError",
        message: `Planet validation failed: name: Path \`name\` is required.`,
      };

      chai.expect(res.body).to.be.eql(wrongFixture);
    });
  });
  context("when wrong field climate was given )", () => {
    const fixture = { name: "Tatooine2", climate43: "arid", terrain: "desert" };
    let res;

    before(async () => {
      res = await testDb.post("/planets").send(fixture);
    });

    it("should return 500 (Internal Server Error)", () => {
      chai.expect(res.status).to.be.eql(500);
    });

    it("should return created Planet", () => {
      const wrongFixture = {
        error: "ValidationError",
        message: `Planet validation failed: climate: Path \`climate\` is required.`,
      };
      chai.expect(res.body).to.be.eql(wrongFixture);
    });
  });
  context("when wrong field terrain was given )", () => {
    const fixture = { name: "Tatooine3", climate: "arid", terrain32: "desert" };
    let res;

    before(async () => {
      res = await testDb.post("/planets").send(fixture);
    });

    it("should return 500 (Internal Server Error)", () => {
      chai.expect(res.status).to.be.eql(500);
    });

    it("should return created Planet", () => {
      const wrongFixture = {
        error: "ValidationError",
        message: `Planet validation failed: terrain: Path \`terrain\` is required.`,
      };
      chai.expect(res.body).to.be.eql(wrongFixture);
    });
  });
});
describe("Get /Planets", () => {
  context("creating new planet", () => {
    const planetFixture = {
      name: "TatooineTest",
      climate: "arid, hot",
      terrain: "desert, cold",
    };
    let res;

    before(async () => {
      res = await testDb.post("/planets").send(planetFixture);
      res = await request(app).get("/planets");
    });

    it("should return list of planets", () => {
      const planetsList = res.body;
      chai.expect(planetsList).to.have.length(2);
    });
  });
});

describe("Post /Planets/:ID", () => {
  let id;
  context("when ID is valid", () => {
    let res;
    before(async () => {
      res = await request(app).get("/planets")
      res = await testDb.get(`/planets/${res.body[0]._id}`);

    });

    it("should return 200 (OK)", () => {
      chai.expect(res.status).to.be.eql(200);
    });

    it("should return the found planet", () => {
      const planetFound = {
        _id: res.body._id,
        name: "Tatooine",
        climate: "arid",
        terrain: "desert",
        film_appearances: res.body.film_appearances,
      };
      chai.expect(planetFound).to.be.eql(res.body);
    });
  });
  context("when ID is Not valid", () => {
    let res;
    before(async () => {
      res = await request(app).get(`/planets/NOTVALIDIDOFPLANET`);
    });

    it("should return 500 (Internat Server Error)", () => {
      chai.expect(res.status).to.be.eql(500);
    });

    it("should return a validation Error", () => {
      const wrongFixture = {
        error: "CastError",
        message: `Cast to ObjectId failed for value \"NOTVALIDIDOFPLANET\" at path \"_id\" for model \"Planet\"`,
      };
      chai.expect(res.body).to.be.eql(wrongFixture);
    });
  });
});

describe("Get /Planets/?name=PlanetToFind", () => {
  context("searching for a planet", () => {
    let res;
    before(async () => {
      res = await request(app).get("/planets/?name=Tatooine");
    });

    it("should return 200 (OK)", () => {
      chai.expect(res.status).to.be.eql(200);
    });

    it("should return planet", () => {
      const planetSearch = {
        _id: res.body[0]._id,
        name: "Tatooine",
        climate: "arid",
        terrain: "desert",
        film_appearances: res.body[0].film_appearances,
      };

      chai.expect(planetSearch).to.be.eql(res.body[0]);
    });
  });
  context("searching for a planet", () => {
    let res;
    before(async () => {
      res = await request(app).get("/planets/?name=NomExistentPlanet");
    });

    it("should return 200 (OK)", () => {
      chai.expect(res.status).to.be.eql(200);
    });
    it("should return an empity array", () => {
      const planetSearch = [];
      chai.expect([]).to.be.eql(res.body);
    });
  });
});

describe("Delete /Planets/:ID", () => {
  let res;
  context("when ID is valid", () => {
    before(async () => {
      res = await request(app).get("/planets");

      res = await request(app).delete(`/planets/${res.body[0]._id}`);
    });

    it("should return 202 (Accepted)", () => {
      chai.expect(res.status).to.be.eql(202);
    });

    it("should return the message of deleted count  = 1", () => {
      chai.expect(res.body.deletedCount).to.be.eql(1);
    });

    context("when ID is valid but dont exists", () => {
      let res;
      before(async () => {
        res = await request(app).delete(`/planets/111111111111111111111111`);
      });

      it("should return 202 (Accepted)", () => {
        chai.expect(res.status).to.be.eql(202);
      });

      it("should return the message of deleted count  = 0", () => {
        chai.expect(res.body.deletedCount).to.be.eql(0);
      });
    });
  });
  context("when ID is Not valid ", () => {
    let res;
    before(async () => {
      res = await request(app).delete(`/planets/NOTVALIDID`);
    });

    it("should return 500 (Internal Server Error)", () => {
      chai.expect(res.status).to.be.eql(500);
    });

    it("should return a validation Error", () => {
      const wrongFixture = {
        error: "CastError",
        message: `Cast to ObjectId failed for value \"NOTVALIDID\" at path \"_id\" for model \"Planet\"`,
      };
      chai.expect(res.body).to.be.eql(wrongFixture);
      
    });
  });
});
