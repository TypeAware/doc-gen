'use strict';


export type HTTPMethods = 'put' | 'get' | 'head' | 'post' | 'delete';


export const flattenDeep = (v: Array<any>): Array<any> => {
  return v.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
};

export const joinMessages = (...args: string[]) => {
  return args.join(' ');
};