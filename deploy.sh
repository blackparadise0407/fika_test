#!/bin/bash

rm -rf ./build
yarn build
scp ./build kyle@178.128.80.11:root/home/kyle/apps/fika