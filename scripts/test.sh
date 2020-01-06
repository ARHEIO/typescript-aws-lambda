#!/bin/bash
node -p "require('./dist/get.js').handler({body: {key1: '$1'}}).then(e => console.log(e))"