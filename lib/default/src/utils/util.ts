import * as fs from 'fs';

export const nestedStatic = (staticPath: string, subPath = '/') => {
  let files = fs.readdirSync(staticPath);
  let folders = [{ subPath, staticPath }];
  for (let file of files) {
    let stats = fs.statSync(staticPath + '/' + file);
    if (!stats.isDirectory()) continue;
    let collectedDatas = nestedStatic(staticPath + '/' + file, subPath + file + '/');
    for (let collectedData of collectedDatas) folders.push(collectedData);
  }
  return folders;
};

export const fileNestedStatic = (dir: string, files_: string[] = []) => {
  let files = fs.readdirSync(dir);
  for (let file of files) {
    let name = dir + '/' + file;
    let stats = fs.statSync(name);
    if (stats.isDirectory()) {
      fileNestedStatic(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
};
