'use strict';

export const log = {
  info: console.log.bind(console, 'typeaware.doc-gen:'),
  error: console.error.bind(console, 'typeaware.doc-gen:'),
};

export default log;


