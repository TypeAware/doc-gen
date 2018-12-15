#!/usr/bin/env bash

set -e;

deploy_url="http://localhost:9080/"

cd "$(dirname $(dirname "$0"))"

cd apps/api-app

ng build --watch --output-hashing none --deploy-url "$deploy_url"