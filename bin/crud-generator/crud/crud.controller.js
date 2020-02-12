const capitalizeFirstLetter = require("../util");

module.exports = async function controllerParse(model, member) {
  return `import { NextFunction, Request, Response } from 'express';
import ${capitalizeFirstLetter(model.modelName)}Service from './${model.modelName}.service';
import { Container } from "typedi";

class ${capitalizeFirstLetter(model.modelName)}Controller {
  public ${model.modelName}Service: ${capitalizeFirstLetter(model.modelName)}Service = Container.get(${capitalizeFirstLetter(model.modelName)}Service);

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.${model.modelName}Service.create({
        ...req.body
      });
      res.status(200).json({
        status: 200,
        message: "success",
      });
    } catch (e) {
      next(e);
    }
  };

  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const list = await this.${model.modelName}Service.list({
        page: req.query.page,
        limit: req.query.limit
      });
      res.status(200).json({
        status: 200,
        message: "success",
        list
      });
    } catch (e) {
      next(e);
    }
  };

  public detail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ${model.modelName} = await this.${model.modelName}Service.detail(req.query.id);
      res.status(200).json({
        status: 200,
        message: "success",
        ${model.modelName}
      });
    } catch (e) {
      next(e);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.${model.modelName}Service.update({
        ...req.body,
        id: req.query.id
      });
      res.status(200).json({
        code: 200,
        resultMsg: "success",
      });
    } catch (e) {
      next(e);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.${model.modelName}Service.remove(req.query.id);
      res.status(200).json({
        status: 200,
        message: "success",
      });
    } catch (e) {
      next(e);
    }
  };

}

export default ${capitalizeFirstLetter(model.modelName)}Controller;

`;
}
