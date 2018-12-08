'use strict';

export const log = {
  info: console.log.bind(console, 'docgen info:'),
  debug: console.error.bind(console,'docgen debug:'),
  error: console.error.bind(console, 'docgen error:'),
};

export default log;


