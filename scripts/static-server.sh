#!/usr/bin/env bash

set -e;

(
    cd "$(dirname $(dirname "$0"))"

    cd apps/api-app/dist/api-app

    pwd

    static-server --index index.html
#    nrestart -- static-server --index index.html

)

