#!/usr/bin/env sh

# abort on errors
set -e
# create vue config file
echo "module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/$1/'
      : '/',
};" > vue.config.js

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:brojor/$1.git master:gh-pages

cd -
