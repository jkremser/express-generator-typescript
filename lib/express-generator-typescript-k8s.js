/**
 * Create new express-generator-typescript project.
 *
 * originally created by Sean Maxwell, 5/31/2019
 * enhanced w/ k8s by jkremser
 */

const path = require('path');
const editJsonFile = require('edit-json-file');
const childProcess = require('child_process');
const ncp = require('ncp').ncp;


async function expressGenTs(destination, withOpenAPI) {
    try {
        await copyProjectFiles(destination, withOpenAPI);
        updatePackageJson(destination);
        const dep = getDepStrings(withOpenAPI);
        downloadNodeModules(destination, dep);
    } catch (err) {
        console.error(err);
    }
}


function copyProjectFiles(destination, withOpenAPI) {
    const prjFolder = './project-files';
    const source = path.join(__dirname, prjFolder);
    ncp.limit = 16;
    const copy = new Promise((resolve, reject) => {
        ncp(source, destination, function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
    if (withOpenAPI) {
        return copy.then((value) => {
            console.log('Augmenting the project with OpenAPI descriptor and Swagger UI.');
            ncp('./lib/openAPI', destination, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    } else {
        return copy;
    }
}


function updatePackageJson(destination) {
    let file = editJsonFile(destination + '/package.json', {
        autosave: true
    });
    file.set('name', path.basename(destination));
}


function getDepStrings(withOpenAPI) {
    let dependencies = 'express dotenv http-status-codes morgan cookie-parser winston ' +
        'module-alias command-line-args express-async-errors helmet @kubernetes/client-node';
    if (withOpenAPI) {
        dependencies += ' yamljs swagger-ui-express';
    }
    let devDependencies = 'ts-node tslint typescript nodemon find jasmine supertest ' +
        '@types/node @types/express @types/jasmine @types/find @types/morgan ' +
        '@types/cookie-parser @types/supertest fs-extra tsconfig-paths @types/jsonfile ' +
        'jsonfile @types/command-line-args @types/helmet';
    return {dependencies, devDependencies};
}


function downloadNodeModules(destination, dep) {
    const options = {cwd: destination};
    childProcess.execSync('npm i -s ' + dep.dependencies, options);
    childProcess.execSync('npm i -D ' + dep.devDependencies, options);
}


module.exports = expressGenTs;
