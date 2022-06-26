/* eslint-disable */
// https://github.com/OpenAPITools/openapi-generator
// https://github.com/OpenAPITools/openapi-generator/blob/master/docs/generators/typescript-angular.md

const childProcess = require("child_process");

const rimraf = require("rimraf");


const swaggerUrl='https://finnhub.io/static/swagger.json'
const outputPath = `src/api/finnhub-api`;
const openapiConfig = `src/api/finnhub-api-config.json`;

console.log("Generating client for swagger : " + swaggerUrl);
console.log();

rimraf.sync(outputPath);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

childProcess.spawnSync(
    `ng-openapi-gen  -o ${outputPath} -c ${openapiConfig}`,
    { stdio: "inherit", shell: true }
);
