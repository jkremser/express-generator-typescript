#!/usr/bin/env node

/**
 * Create new express-generator-typescript project.
 *
 * originally created by Sean Maxwell, 5/31/2019
 * enhanced w/ k8s by jkremser
 */

const path = require('path');
const expressGenTs = require('../lib/express-generator-typescript-k8s');

let destination;
let openAPI = false;
if (process.argv[2] === '--openAPI') {
    openAPI = true;
    destination = getDest(process.argv[3]);
} else {
    destination = getDest(process.argv[2]);
}

console.log('Setting up new Express+TypeScript+Kubernetes project...');

expressGenTs(destination, openAPI).then(() => {
    console.log('Project setup complete!');
});


function getDest(destFolder) {
    destFolder = (destFolder || 'express-gen-ts-k8s');
    return path.join(process.cwd(), destFolder);
}
