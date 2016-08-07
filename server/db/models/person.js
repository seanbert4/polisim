'use strict';

const Sequelize = require('sequelize'),
      db = require('../_db'),
      chalk = require('chalk'),
      getRandomNum = require('../../utils/getRandomNum'),
      logError = require('../../utils/logError');

let propertiesToRandomlyModify = [
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

module.exports = db.define('person', {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
        is: /^[a-z]+$/i
    }
  },

  age: {
    type: Sequelize.INTEGER,
    defaultValue: 18,
    allowNull: false,
    validate: {
      min: 18,
      max: 85
    }
  },

  personalFreedomScore: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 20,
      max: 100
    }
  },

  economicFreedomScore: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 20,
      max: 100
    }
  },

  legislativeSkill: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  executiveSkill: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  judicialSkill: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  stateKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  treasuryKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  defenseKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  attorneyKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  interiorKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  agricultureKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  commerceKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  laborKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  healthKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  housingKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  transportationKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  energyKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  educationKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  veteranKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  },

  securityKnowledge: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 20,
    validate: {
      min: 20,
      max: 100
    }
  }
}, {
  classMethods: {
    incrementStats: function() {
      console.log(chalk.green('starting to update all people'));
      return this.findAll()
      .then(people => {
        let savePromises = [];

        people.forEach(person => {
          person.age++;

          propertiesToRandomlyModify.forEach(property => {
            person[property] += getRandomNum(-5, 5);
            if (person[property] < 20) person[property] = 20;
            if (person[property] > 100) person[property] = 100;
          });

          savePromises.push(person.save());
        })
        return Promise.all(savePromises);
      })
      .then(() => {
        console.log(chalk.green('all people successfully updated'));
      })
      .catch(logError)
    },
  }
});
