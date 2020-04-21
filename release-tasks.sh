#!/usr/bin/env bash
npm i
ng build --prod
cp -R dist/client ../server
cd ../server
npm i
