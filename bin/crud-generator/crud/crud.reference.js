module.exports = async function referenceParse(model, member) {
  let membersParse = '';
  for (let m of member) {
    membersParse +=
      ` *      ${m.name}:
 *        type: ${m.type}
 *        description: ${m.comment}
`;
  }

  return `/**
 * @swagger
 * definitions:
 *  ${model.modelName}:
 *    type: object
 *    properties:
${membersParse}
 */
 `;
}
