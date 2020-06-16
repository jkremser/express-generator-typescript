#!/usr/bin/env node

/**
 * Create new express-generator-typescript project.
 *
 * created by Sean Maxwell, 5/31/2019
 */

const path = require('path');
const expressGenTs = require('./express-generator-typescript');
const destination = getDest(process.argv[2]);

console.log('Setting up new Express/TypeScript project...');

expressGenTs(destination).then(() => {
    console.log('Project setup complete!');
});


function getDest(destFolder) {
    destFolder = (destFolder || 'express-gen-ts');
    return path.join(process.cwd(), destFolder);
}
