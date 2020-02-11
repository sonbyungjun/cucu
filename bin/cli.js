#!/usr/bin/env node

/*****************************************************************
 * Create new typescript-express-starter project.
 * created by Son Byungjun, 01/27/2020
 *****************************************************************/

const path = require('path');
const tsExpressStarter = require('../lib/cucu-starter');
const destination = getDest(process.argv[2]);

function getDest(destFolder) {
  destFolder = destFolder || 'typescript-express-starter';
  return path.join(process.cwd(), destFolder);
};

tsExpressStarter(destination);
