#!/bin/bash

function capitalize() {
  node -e "console.log('$1'[0].toUpperCase() + '$1'.slice(1))"
}


echo "Choose a name for your app"
echo -n "> "
read app_name
capitalized_app_name=$(capitalize $app_name)

sed -i "" "s/APP_NAME/$app_name/g" \
  app/angular-module.js \
  app/app.js \
  bower.json \
  package.json

sed -i "" "s/APP_NAME/$capitalized_app_name/g" \
  index.html


echo "Choose a name for the main module on your app"
echo -n "> "
read module_name
capitalized_module_name=$(capitalize $module_name)


mkdir comp/$module_name
cp comp/MODULE_NAME/MODULE_NAME.js comp/$module_name/$module_name.js
cp comp/MODULE_NAME/MODULE_NAME.html comp/$module_name/$module_name.html
cp comp/MODULE_NAME/MODULE_NAME.less comp/$module_name/$module_name.less


sed -i "" "s/MODULE_NAMECtrl/${capitalized_module_name}Ctrl/g" \
  app/app.js \
  comp/$module_name/$module_name.js

sed -i "" "s/MODULE_NAME/$module_name/g" \
  app/app.js \
  app/styles.less \
  comp/$module_name/$module_name.html \
  comp/$module_name/$module_name.js


grep -v 'SOME_DIRECTIVE' \
  < comp/$module_name/$module_name.js \
  > comp/$module_name/$module_name.js.new


mv comp/$module_name/$module_name.js.new comp/$module_name/$module_name.js
rm RUNME.sh
