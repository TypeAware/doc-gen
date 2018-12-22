#!/usr/bin/env bash

set -e;

(
    cd "$(dirname $(dirname "$0"))"

    cd lang/typescript/api

    node dist/test/express.test.ts
)

