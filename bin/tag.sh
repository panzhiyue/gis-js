#!/usr/bin/env bash

# 确保脚本抛出遇到的错误
set -e

git tag -a v$1 -m "v$1发布"
git push origin –-tags