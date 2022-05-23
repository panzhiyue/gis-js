const shell = require('shelljs');
const path = require("path")

shell.exec('lerna version' );
shell.exec(path.join(__dirname, '../bin/npmjs.sh') );
const lerna = require('../lerna.json')
shell.exec(path.join(__dirname, '../bin/tag.sh'),lerna.version );