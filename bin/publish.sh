#!/usr/bin/env bash

# 确保脚本抛出遇到的错误
set -e

cd packages/utilsol
npm run build:package
npm publish --access=public

cd ../vue2ol
npm run build:package
npm publish --access=public

cd ../vue2ol-extend
npm run build:package
npm publish --access=public

