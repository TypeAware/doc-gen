#!/usr/bin/env bash

set -e;

(
    cd "$(dirname $(dirname "$0"))"

    cd lang/typescript/api

    tsc --watch
)

