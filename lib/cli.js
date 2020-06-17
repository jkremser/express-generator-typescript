#!/usr/bin/env node

/**
 * Create new express-generator-typescript project.
 *
 * originally created by Sean Maxwell, 5/31/2019
 * enhanced w/ k8s by jkremser
 */

const path = require('path');
const expressGenTs = require('./express-generator-typescript-k8s');
const destination = getDest(process.argv[2]);

console.log('Setting up new Express+TypeScript+Kubernetes project...');

expressGenTs(destination).then(() => {
    console.log('Project setup complete!');
});


function getDest(destFolder) {
    destFolder = (destFolder || 'express-gen-ts-k8s');
    return path.join(process.cwd(), destFolder);
}
