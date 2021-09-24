#!/usr/bin/env sh

# abort on errors
set -e

CURRENTDIR=${PWD##*/}
PARRENTDIR=$(basename ${PWD%/*})

if  [[ $1 = "-e" ]]; then
    echo "Zadejte název domény:"
    read CNAME
    echo $CNAME > CNAME
    echo "module.exports = { publicPath: '/' };" > vue.config.js
else
    # create vue config file
    echo "module.exports = {
      publicPath:
        process.env.NODE_ENV === 'production'
          ? '/$PARRENTDIR-$CURRENTDIR/'
          : '/',
    };" > vue.config.js
fi

npm run build

cd dist
# if [[ -v CNAME ]]; then
#     echo $CNAME > CNAME
# fi
if [[ ! -z "$CNAME" ]]; then
    echo "Existuje (cname)"
    echo $CNAME > CNAME
fi



git init
git add -A
git commit -m 'deploy'
git remote add origin git@github.com:brojor/$PARRENTDIR-$CURRENTDIR.git
git push -f origin master:gh-pages