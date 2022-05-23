#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

rimraf -rf dist
mkdir dist

# 生成静态文件
npm run build:docs

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'
git remote add origin https://github.com/panzhiyue/gis-js.git 

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git checkout -b gh-pages
git push -f origin gh-pages

cd -

&