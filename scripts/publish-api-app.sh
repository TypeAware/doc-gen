#!/usr/bin/env bash

set -e;

# tarzan init typeaware/tarballs 'git@github.com:TypeAware/tarballs.git'

tarzan use typeaware/tarballs

deploy_url="http://cdn.jsdelivr.net/gh/typeaware/tarballs@master/docgen/"

(
  if true; then
   exit 0;
  fi
  cd 'apps/api-app' && ng build --prod --output-hashing none --deploy-url "$deploy_url"
)

tarzan fetch

export trbl_push='nope';

val=1;

tarzan add 'apps/api-app/dist/api-app/favicon.ico' "docgen/favicon-$val.ico"
tarzan add 'apps/api-app/dist/api-app/main.js' "docgen/main-$val.js"
tarzan add 'apps/api-app/dist/api-app/polyfills.js' "docgen/polyfills-$val.js"
tarzan add 'apps/api-app/dist/api-app/runtime.js' "docgen/runtime-$val.js"
tarzan add 'apps/api-app/dist/api-app/styles.css' "docgen/styles-$val.css" || echo 'whatevs'
tarzan add 'apps/api-app/dist/api-app/styles.js' "docgen/styles-$val.js" || echo 'whatevs'
tarzan add 'apps/api-app/dist/api-app/vendor.js' "docgen/vendor-$val.js" || echo 'whatevs'

tarzan push