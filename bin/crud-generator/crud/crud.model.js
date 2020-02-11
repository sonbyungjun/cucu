const capitalizeFirstLetter = require("../util");

module.exports = async function modelParse(model, member) {
  let membersParse = '';

  for (let m of member) {
    membersParse += `  @Comment('${m.comment}')\n`;
    membersParse += `  @AllowNull(${(m.allowNull==='true')})\n`;
    membersParse += `  @Column(DataType.${m.columnType})\n`;
    membersParse += `  ${m.name}: ${m.type};\n\n`;
  }

  return `import {AllowNull, Column, Comment, DataType, Model, Table} from 'sequelize-typescript';
import {FindAndCountOptions, FindOptions} from "sequelize";
import {listOption} from "./${model.modelName}.service";

@Table({
  modelName: '${model.modelName}',
  timestamps: ${(model.timestamp === 'true')},
  paranoid: ${(model.paranoid === 'true')},
  comment: '${model.modelComment}',
})
export default class ${capitalizeFirstLetter(model.modelName)} extends Model<${capitalizeFirstLetter(model.modelName)}> {

${membersParse}
  public static async findAllPage({ page, limit = '15' }: listOption): Promise<{ rows: ${capitalizeFirstLetter(model.modelName)}[]; count: number } | ${capitalizeFirstLetter(model.modelName)}[]> {
    let offset = 0;
    let pageNumber = Number(page);
    let pageLimit = Number(limit);
    if (pageNumber > 1){
      offset = pageLimit * (pageNumber - 1);
    }
    const option: FindAndCountOptions = {
      order: [['id', 'desc']],
    };
    let ${model.modelName};
    if (page) {
      option.limit = pageLimit;
      option.offset = offset;
      ${model.modelName} = await ${capitalizeFirstLetter(model.modelName)}.findAndCountAll(option);
    } else {
      ${model.modelName} = await ${capitalizeFirstLetter(model.modelName)}.findAll(option);
    }
    return ${model.modelName};
  };

  public static async findOneScope(id: string): Promise<${capitalizeFirstLetter(model.modelName)}> {
    const option: FindOptions = {
      where: {
        id
      }
    };
    return ${capitalizeFirstLetter(model.modelName)}.findOne(option);
  };

}
`;
}
