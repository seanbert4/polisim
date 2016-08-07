var expect = require('chai').expect;
var logError = require('../../../server/utils/logError')

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var HouseDistrict = db.model('houseDistrict');

describe('HouseDistrict model', function () {

  beforeEach('Sync DB', function () {
     return db.sync({ force: true });
  });

  describe('number getter', function () {

    var createDistricts = (function createDistricts() {
      var creationPromises = [];
      for (var i = 1; i <= 10; i++) {
        creationPromises.push(HouseDistrict.create({number: i}));
      }
      return creationPromises;
    }());

    var districts;
    beforeEach(function() {
      return Promise.all(createDistricts)
      .then(function(_districts) {
        districts = _districts;
      })
      .then(null, logError);
    })

    it('should return a string', function () {
      expect(districts[0].number).to.be.a('string');
    });

    it('should have the right suffix', function () {
        var strings = districts.map(function(district) {
          return district.number;
        });
        var expectedStrings = [
          '1st',
          '2nd',
          '3rd',
          '4th',
          '5th',
          '6th',
          '7th',
          '8th',
          '9th',
          '10th'];

        expect(strings).to.deep.equal(expectedStrings);
    });
  });
});
