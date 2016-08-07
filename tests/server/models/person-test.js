var expect = require('chai').expect,
    Sequelize = require('sequelize'),
    db = require('../../../server/db'),
    getRandomNum = require('../../../server/utils/getRandomNum');

var Person = db.model('person');

describe('Person model', function () {

  beforeEach('Sync DB', function () {
     return db.sync({ force: true });
  });

  describe('class methods', function () {

    beforeEach(function() {
      var createPromises = [];
      var data;
      for (var i = 1; i <= 3; i++) {
        data = {
          personalFreedomScore: getRandomNum(20, 100),
          economicFreedomScore: getRandomNum(20, 100)
        };
        createPromises.push(Person.create(data));
      }
      return Promise.all(createPromises)
    });

    describe('incrementStats', function() {
      it('should increment all people\'s age by one', function(done) {
        Person.findById(1)
        .then(function(person) {
          expect(person.age).to.equal(18);
          return Person.incrementStats()
        })
        .then(function() {
          return Person.findById(1)
        })
        .then(function(person) {
          expect(person.age).to.equal(19);
          done();
        })
        .catch(done);
      })

      it('should randomly modify all people\'s stats', function(done) {
        var stats = [
          'personalFreedomScore',
          'economicFreedomScore',
          'legislativeSkill',
          'executiveSkill',
          'judicialSkill',
          'stateKnowledge',
          'treasuryKnowledge',
          'defenseKnowledge',
          'attorneyKnowledge',
          'interiorKnowledge',
          'agricultureKnowledge',
          'commerceKnowledge',
          'laborKnowledge',
          'healthKnowledge',
          'housingKnowledge',
          'transportationKnowledge',
          'energyKnowledge',
          'educationKnowledge',
          'veteranKnowledge',
          'securityKnowledge'
        ];

        var originalStatValues = [];
        var newStatValues = [];

        Person.findById(1)
        .then(function(person) {
          stats.forEach(function(stat) {
            originalStatValues.push(person[stat]);
          })
          return Person.incrementStats()
        })
        .then(function() {
          return Person.findById(1)
        })
        .then(function(person) {
          stats.forEach(function(stat) {
            newStatValues.push(person[stat]);
          })
          var changedStats = newStatValues.reduce(function(count, nextStat, idx) {
            if (nextStat !== originalStatValues[idx]) count++;
            return count;
          }, 0);
          expect(changedStats).to.be.above(10);
          done();
        })
        .catch(done);
      })
    });
  });
});
