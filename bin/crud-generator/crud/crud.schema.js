module.exports = async function schemaParse(model, member) {
  let membersParse = '';
  for (let m of member) {
    membersParse += `  ${m.name}: Joi.${m.type}().required(),\n`;
  }
  let membersParseUpdate = '';
  for (let m of member) {
    membersParseUpdate += `  ${m.name}: Joi.${m.type}(),\n`;
  }
  return `import * as Joi from '@hapi/joi';

const ${model.modelName}Schema = Joi.object({
  ${membersParse}
});

const ${model.modelName}UpdateSchema = Joi.object({
  ${membersParseUpdate}
});

export {
  ${model.modelName}Schema,
  ${model.modelName}UpdateSchema
};

`;
}
