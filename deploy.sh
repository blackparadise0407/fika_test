#!/bin/bash

rm -rf ./build
yarn build
 scp -r ./build kyle@178.128.80.11:/home/kyle/apps/fika