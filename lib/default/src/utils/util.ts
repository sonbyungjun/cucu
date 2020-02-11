import * as fs from "fs";

export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length;
};

export const viewKorean = (num: any): string => {
  num = parseInt((num + '').replace(/[^0-9]/g, ''), 10) + '';
  if (num == '0') return '영';
  let number = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  let unit = ['', '만', '억', '조'];
  let smallUnit = ['천', '백', '십', ''];
  let result = [];
  let unitCnt = Math.ceil(num.length / 4);
  num = num.padStart(unitCnt * 4, '0');
  let regexp = /[\w\W]{4}/g;
  let array = num.match(regexp);
  for (let i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
    let hanValue = _makeHan(array[i]);
    if (hanValue == '') continue;
    result.unshift(hanValue + unit[unitCnt]);
  }
  function _makeHan(text: any) {
    let str = '';
    for (let i = 0; i < text.length; i++) {
      let num = text[i];
      if (num == '0')
        //0은 읽지 않는다
        continue;
      str += number[num] + smallUnit[i];
    }
    return str;
  }
  return result.join('');
};

export const numberWithCommas = (x: any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const paginate = (array: any, index: any, size: any) => {
  // transform values
  index = Math.abs(parseInt(index));
  index = index > 0 ? index - 1 : index;
  size = parseInt(size);
  size = size < 1 ? 1 : size;

  // filter
  return [
    ...array.filter((value: any, n: any) => {
      return n >= index * size && n < (index + 1) * size;
    }),
  ];
};

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
