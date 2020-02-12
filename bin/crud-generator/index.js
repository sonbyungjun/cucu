#!/usr/bin/env node

const controllerParse = require('./crud/crud.controller');
const modelParse = require("./crud/crud.model");
const routerParse = require("./crud/crud.route");
const schemaParse = require("./crud/crud.schema");
const referenceParse = require("./crud/crud.reference");
const serviceParse = require("./crud/crud.service");

const inquirer = require('inquirer');
const fs = require('fs');

const prompt = inquirer.createPromptModule();

const modelQuestions = [
  { type: 'input', message: 'Please enter a model name', name: 'modelName'},
  { type: 'list', message: 'Timestamp status', name: 'timestamp', choices: ['true', 'false']},
  { type: 'list', message: 'Paranoid status', name: 'paranoid', choices: ['true', 'false']},
  { type: 'input', message: 'Please enter a comment', name: 'modelComment'},
  { type: 'input', message: 'Please enter the number of model members (number only)', name: 'memberCount'},
];

const memberQuestions = [
  { type: 'input', message: 'Please enter a member name.', name: 'name'},
  { type: 'list', message: 'Please select type.', name: 'type', choices: ['string', 'number', 'boolean']},
  { type: 'list', message: 'Select column type', name: 'columnType', choices: ['STRING', 'INTEGER', 'BOOLEAN', 'TEXT', 'DATE']},
  { type: 'list', message: 'NULL status', name: 'allowNull', choices: ['true', 'false']},
  { type: 'input', message: 'Please enter a comment', name: 'comment'},
];

async function parse(model, member) {
  const modelFile = await modelParse(model, member);
  const routerFile = await routerParse(model, member);
  const controllerFile = await controllerParse(model, member);
  const serviceFile = await serviceParse(model, member);
  const schemaFile = await schemaParse(model, member);
  const referenceFile = await referenceParse(model, member);

  console.log('Generating...');
  fs.mkdirSync(`./src/routes/${model.modelName}`);
  fs.writeFileSync(`./src/routes/${model.modelName}/${model.modelName}.model.ts`, modelFile);
  fs.writeFileSync(`./src/routes/${model.modelName}/${model.modelName}.route.ts`, routerFile);
  fs.writeFileSync(`./src/routes/${model.modelName}/${model.modelName}.controller.ts`, controllerFile);
  fs.writeFileSync(`./src/routes/${model.modelName}/${model.modelName}.service.ts`, serviceFile);
  fs.writeFileSync(`./src/routes/${model.modelName}/${model.modelName}.schema.ts`, schemaFile);
  fs.writeFileSync(`./src/routes/${model.modelName}/${model.modelName}.reference.ts`, referenceFile);
  console.log('Create complete!');
}

module.exports = async function crudGenerator() {
  let model;
  let members = [];
  model = await prompt(modelQuestions);
  for (let i = 0; i < Number(model.memberCount); i++) {
    const member = await prompt(memberQuestions);
    members.push(member);
  }
  await parse(model, members);
};
