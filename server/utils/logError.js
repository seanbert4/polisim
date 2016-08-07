'use strict';

const chalk = require('chalk');

module.exports = function(err) {
  console.log(chalk.red(err));
}
