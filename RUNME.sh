#!/bin/bash

function capitalize() {
  node -e "console.log('$1'[0].toUpperCase() + '$1'.slice(1))"
}


#
# APP SECTION
#

echo "Choose a name for your app"
#echo -n "> "
#read app_name
app_name="pollas" # debug only
capitalized_app_name=$(capitalize $app_name)


## SET APPLICATION NAME ON CONFIG FILES

sed -i "" "s/APP_NAME/$app_name/g" \
  app/angular-module.js \
  app/app.js \
  bower.json \
  package.json

sed -i "" "s/APP_NAME/$capitalized_app_name/g" \
  index.html


#
# MODULES SECTION
#

echo "List the modules your app will have (empty to finish)"
#echo -n "> "
#read module_name
module_name="player" # debug only
capitalized_module_name=$(capitalize $module_name)

while [ ! -z "$module_name" ]
do

  # CREATE MODULE FILES

  mkdir comp/$module_name
  grep -v "SOME_DIRECTIVE" comp/MODULE_NAME/MODULE_NAME.js > comp/$module_name/$module_name.js
  cp comp/MODULE_NAME/MODULE_NAME.html comp/$module_name/$module_name.html
  cp comp/MODULE_NAME/MODULE_NAME.less comp/$module_name/$module_name.less


  # SET MODULE NAME INTO MODULE FILES

  sed -i "" "s/MODULE_NAMECtrl/${capitalized_module_name}Ctrl/g" \
    comp/$module_name/$module_name.js

  sed -i "" "s/MODULE_NAME/$module_name/g" \
    comp/$module_name/$module_name.html \
    comp/$module_name/$module_name.js


  # ADD MODULE IMPORT TO LESS

  search='MODULE_NAME'
  line=$(grep "$search" app/styles.less | sed "s/MODULE_NAME/$module_name/g")
  sed -i "" "/$search/a\\
$line
" "app/styles.less"


  # ADD MODULE IMPORT

  search="MODULE_NAME');"
  line=$(grep "$search" app/app.js | sed "s/MODULE_NAME/$module_name/g")
  sed -i "" "/$search/a\\
$line
" "app/app.js"


  # SET MODULE'S CONFIGURATION INTO JS

  chunk=$(grep -A2 -B2 "MODULE_NAMECtrl" app/app.js |
    sed "s/MODULE_NAMECtrl/${capitalized_module_name}Ctrl/g" |
    sed "s/MODULE_NAME/$module_name/g")

  echo CHUNK
  echo $chunk

  # ???
  # multiline sed /$search/a\ doesn't work


  # ASK FOR NEXT MODULE

  #echo -n "> "
  #read module_name
  module_name="" # debug only
done

#rm RUNME.sh
