const capitalizeFirstLetter = require("../util");

module.exports = async function serviceParse(model, member) {
  return `import HttpException from '../../exceptions/HttpException';
import ${capitalizeFirstLetter(model.modelName)} from "./${model.modelName}.model";
import { Service } from "typedi";

export interface listOption {
  page?: string
  limit?: string
}

@Service()
class ${capitalizeFirstLetter(model.modelName)}Service {

  public async create(values: ${capitalizeFirstLetter(model.modelName)}): Promise<void> {
    await ${capitalizeFirstLetter(model.modelName)}.create(values);
  };

  public async list(option: listOption): Promise<{ rows: ${capitalizeFirstLetter(model.modelName)}[]; count: number } | ${capitalizeFirstLetter(model.modelName)}[]> {
    return ${capitalizeFirstLetter(model.modelName)}.findAllPage(option);
  };

  public async detail(id: string): Promise<${capitalizeFirstLetter(model.modelName)}> {
    const ${model.modelName} = await ${capitalizeFirstLetter(model.modelName)}.findOneScope(id);
    if (!${model.modelName}) {
      throw new HttpException(203, true, '없는 데이터입니다.');
    }
    return ${model.modelName};
  };

  public async update(values: ${capitalizeFirstLetter(model.modelName)}): Promise<void> {
    const { id } = values;
    const ${model.modelName} = await ${capitalizeFirstLetter(model.modelName)}.findOneScope(id);
    if (!${model.modelName}) {
      throw new HttpException(203, true, '없는 데이터입니다.');
    }
    await ${model.modelName}.update(values);
  };

  public async remove(id: string): Promise<void> {
    const ${model.modelName} = await ${capitalizeFirstLetter(model.modelName)}.findOneScope(id);
    if (!${model.modelName}) {
      throw new HttpException(203, true, '없는 데이터입니다.');
    }
    await ${model.modelName}.destroy();
  };

}

export default ${capitalizeFirstLetter(model.modelName)}Service;

`;
}
