<img alt='overnightjs' src='https://github.com/jkremser/express-generator-typescript/raw/master/express-typescript-k8s.png' border='0'>

[Express](https://www.npmjs.com/package/express) with [TypeScript's](https://www.npmjs.com/package/typescript) application generator.

<a href="https://www.npmjs.com/package/express-generator-typescript-k8s" target="_blank"><img src="https://img.shields.io/npm/v/express-generator-typescript-k8s.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/express-generator-typescript-k8s" target="_blank"><img src="https://img.shields.io/npm/l/express-generator-typescript-k8s.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/express-generator-typescript-k8s" target="_blank"><img src="https://img.shields.io/npm/dm/express-generator-typescript-k8s.svg" alt="NPM Downloads" /></a>


## What is it?

Creates a new express application similar to the _express-generator_ module. Except this new
application is configured to use TypeScript instead of plain JavaScript. This simple application
is pre-configured to use [kubernetes client](https://github.com/kubernetes-client/javascript).

It contains a simple REST endpoint for working with deployments in the Kubernetes cluster. Part of the 
application is a very simple web ui that lists the deployments and allows to delete a deployment.

This project is based on a repo [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript.git)
created by [Sean Maxwell](https://github.com/seanpmaxwell) and adds the Kubernetes example on top of it (also some other changes).
The license remains the same.



## Why express-generator-typescript-k8s?

NodeJS is great for the rapid development of web-projects, but is often neglected because of the lack of
type safety. TypeScript solves this issue and (along with its linter file) can even make your code
more robust than some other static languages like Java.

There are some other tools out there to generate express apps with TypeScript such as 
_express-generator-ts_, but these either haven't been updated in a while or install a lot of junk 
in your project (such as an ORM). 

Due to the heavy use of single-page-applications, no view-engine is configured by default. Express is 
only setup with the minimal settings for calling APIs and serving an index.html file. All the tools you 
need to run for development (while restarting on changes), building, testing, and running for production 
are packaged with this library. 

In addition, relative paths are also setup, so you don't have to go through the trouble of installing
and configuring _tsconfig-paths_ and _module-alias_. Just make sure to update `paths` in _tsconfig.json_
and `_moduleAliases` in _package.json_ if you want to add/edit the relative paths.


## Sample-project

When you run _express-generator-typescript-k8s_, it sets up a very simple application with routes for
adding, updating, deleting, and fetching deployment objects. This is just to demonstrate how routing is done
with express.


## Installation

```sh
$ Just use 'npx'
  Or
$ npm install -g express-generator-typescript-k8s
```


## Quick Start

The quickest way to get started is use npx and pass in the name of the project you want to create.
If you don't specify a project name, the default _express-gen-ts_ will be used instead.

Create the app:

```bash
$ npx express-generator-typescript-k8s "project name (default is express-gen-ts-k8s)"


Start your express-generator-typescript-k8s app in development mode at `http://localhost:3000/`:

```bash
$ cd "project name" && npm run start:dev
```


## Available commands for the server.

- Run the server in development mode: `npm run start:dev`.
- Run all unit-tests: `npm test`.
- Check for linting errors: `npm run lint`.
- Build the project for production: `npm run build`.
- Run the production build: `npm start`.
- Run production build with a different env file `npm start -- --env="name of env file" (default is production)`.


## Debugging
During development, _express-generator-typescript-k8s_ uses `nodemon` to restart the server when changes
are detected. If you want to enable debugging for node, you'll need to modify the nodemon configurations.
This is located under `nodemonConfig:` in `package.json` for the server and `./spec/nodemon.json` for
unit-testing. For the `exec` property, replace `ts-node` with `node --inspect -r ts-node/register`.


Happy web-deving :)



## License

[MIT](LICENSE)
