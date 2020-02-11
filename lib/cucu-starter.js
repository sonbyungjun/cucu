/*****************************************************************
 * Create new cucu project.
 * created by Son Byungjun, 02/12/2020
 *****************************************************************/

const path = require('path');
const { readdir } = require('fs').promises;
const editJsonFile = require('edit-json-file');
const { exec } = require('child_process');
const ncp = require('ncp').ncp;
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const { promisify } = require('util');
const asyncExec = promisify(exec);

async function tsExpressStarter(projectName) {
  let spinner = null;
  try {
    const template = await selectedTemplates();

    console.log('[ 1 / 3 ] 🔍  copying project...');
    console.log('[ 2 / 3 ] 🚚  fetching dependencies...');

    await copyProjectFiles(projectName, template);
    await updatePackageJson(projectName);
    const dependencies = await getDependencies(template);

    console.log('[ 3 / 3 ] 🔗  linking dependencies...');

    console.log('\u001b[2m──────────────\u001b[22m');

    spinner = ora('Install modules..\n');
    spinner.start();

    await installDependencies(projectName, dependencies, spinner);

    spinner.succeed(chalk`{green Complete setup project}`);
  } catch (error) {
    spinner.fail(chalk`{red Please leave this error as an issue.}`);
    console.error(error);
  }
}

async function selectedTemplates() {
  const directories = await getDirectories();
  const directoryChoices = [...directories, new inquirer.Separator()];
  const { selectedTemplates } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedTemplates',
      message: 'Select a templates',
      choices: directoryChoices,
    },
  ]);

  return selectedTemplates;
}

async function getDirectories() {
  const contents = await readdir(__dirname, { withFileTypes: true });
  const directories = contents.filter(p => p.isDirectory()).map(p => p.name);

  return directories;
}

function copyProjectFiles(destination, directory) {
  const prjFolder = `./${directory}`;
  const source = path.join(__dirname, prjFolder);

  return new Promise((resolve, reject) => {
    ncp.limit = 16;
    ncp(source, destination, function(err) {
      if (err) reject(err);
      resolve();
    });
  });
}

async function updatePackageJson(destination) {
  let file = editJsonFile(destination + '/package.json', { autosave: true });
  file.set('name', path.basename(destination));
}

async function getDependencies(directory) {
  let dependencies =
    'bcrypt chalk cors dotenv express express-joi-validation helmet hpp jest jsonwebtoken moment ' +
    'moment-timezone typescript morgan mysql2 passport passport-jwt passport-local reflect-metadata ' +
    'sequelize sequelize-typescript swagger-jsdoc swagger-ui-express ts-jest ts-node tsc-watch typedi @types/validator ' +
    '@types/swagger-ui-express @types/swagger-jsdoc @types/passport-local @types/passport-jwt @types/jsonwebtoken ' +
    '@types/hapi__joi @types/bluebird @types/bcrypt @hapi/joi';
  let devDependencies =
    '@types/cors @types/express @types/helmet @types/hpp @types/jest @types/moment-timezone @types/morgan @types/node ' +
    '@types/supertest prettier supertest';

  switch (directory) {
    case 'mongoose': {
        dependencies += ' mongoose dotenv';
        devDependencies += ' @types/mongoose';
      } break;
  }

  return { dependencies, devDependencies };
}

async function installDependencies(destination, { dependencies, devDependencies }, spinner) {
  const options = { cwd: destination };

  spinner.text = 'Install dependencies..';
  await asyncExec('npm i -s ' + dependencies, options);

  spinner.text = 'Install devDependencies..';
  await asyncExec('npm i -D ' + devDependencies, options);
}

module.exports = tsExpressStarter;
