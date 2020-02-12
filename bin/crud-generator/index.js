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
  { type: 'input', message: '모델 이름을 입력해주세요.', name: 'modelName'},
  { type: 'list', message: 'timestamp 여부', name: 'timestamp', choices: ['true', 'false']},
  { type: 'list', message: 'paranoid 여부', name: 'paranoid', choices: ['true', 'false']},
  { type: 'input', message: '코멘트를 입력해주세요.', name: 'modelComment'},
  { type: 'input', message: '모델 멤버 갯수를 입력해주세요 (숫자만)', name: 'memberCount'},
];

const memberQuestions = [
  { type: 'input', message: '멤버 이름을 입력해주세요.', name: 'name'},
  { type: 'list', message: 'type 을 선택해주세요.', name: 'type', choices: ['string', 'number', 'boolean']},
  { type: 'list', message: 'column type 을 선택해주세요', name: 'columnType', choices: ['STRING', 'INTEGER', 'BOOLEAN', 'TEXT', 'DATE']},
  { type: 'list', message: 'NULL 여부', name: 'allowNull', choices: ['true', 'false']},
  { type: 'input', message: '코멘트를 입력해주세요.', name: 'comment'},
];

async function parse(model, member) {
  const modelFile = await modelParse(model, member);
  const routerFile = await routerParse(model, member);
  const controllerFile = await controllerParse(model, member);
  const serviceFile = await serviceParse(model, member);
  const schemaFile = await schemaParse(model, member);
  const referenceFile = await referenceParse(model, member);

  console.log('생성중...');
  fs.mkdirSync(`./src/routes/${model.modelName}`);
  fs.writeFileSync(`./src/routes/${model.modelName}/${model.modelName}.model.ts`, modelFile);
  fs.writeFileSync(`./src/routes/${model.modelName}/${model.modelName}.route.ts`, routerFile);
  fs.writeFileSync(`./src/routes/${model.modelName}/${model.modelName}.controller.ts`, controllerFile);
  fs.writeFileSync(`./src/routes/${model.modelName}/${model.modelName}.service.ts`, serviceFile);
  fs.writeFileSync(`./src/routes/${model.modelName}/${model.modelName}.schema.ts`, schemaFile);
  fs.writeFileSync(`./src/routes/${model.modelName}/${model.modelName}.reference.ts`, referenceFile);
  console.log('생성 완료!');
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
