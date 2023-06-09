import * as _ from 'lodash';

export function params(obj) {
  return encodeURI(Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== null) {
      if (key.includes('Array')) {
        let multiString = '';
        _.each(obj[key], (item) => {
          multiString += `filter[]=${item}&`;
        });
        acc = `${acc}&${multiString}`;
      } else {
        acc = `${acc}&${key}=${obj[key]}`;
      }
    }
    return acc;
  }, ''));
}

export default {
  params,
};
