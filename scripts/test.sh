#!/bin/bash
node -p "require('./dist/index.js').handler({body: {key1: '$1'}}).then(e => console.log(e))"