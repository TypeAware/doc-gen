#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const folder = path.resolve(__dirname, '../apps/api-app/dist/api-app');
const one = path.resolve(`${folder}/index.html`);
const two = path.resolve(`${folder}/index-final.html`);

const index1 = fs.readFileSync(one, 'utf8');

const webRoot = 'http://cdn.jsdelivr.net/gh/typeaware/tarballs@master/docgen';
// const webRoot = 'https://raw.githubusercontent.com/typeaware/tarballs/master/docgen';

const val = '-1';

const index2 = [
  'runtime.js',
  'main.js',
  'styles.js',
  'styles.css',
  'favicon.ico',
  'polyfills.js',
  'vendor.js'
].reduce((a, b) => {
  
  const ext = path.extname(b);
  const result = [path.basename(b, ext),val,ext].join('');
  return a.replace(`="${b}"`, `="${webRoot}/${result}"`);
  
}, String(index1));


fs.writeFileSync(two, index2);