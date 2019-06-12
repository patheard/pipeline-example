# What's this?

An example project showing how a Continuous Integration (CI) and Continous Delivery (CD) pipeline can be used to improve code quality, security and stability.

# Run the project
## Locally with NodeJS
If you've got NodeJS installed, run the following:
```bash
npm install
npm start
```
## With Docker
There is a pre-built image on gitlab.com you can run.
```bash
docker run -it --rm -d --name pipeline-example -p 8080:8080 patheard/node-puppeteer:latest
docker cp . pipeline-example:/home/pptruser/
docker exec -it pipeline-example npm test
docker exec -it pipeline-example npm start &
```

# Unit tests
## Locally with NodeJS
Tests are written using [Jest](https://jestjs.io/docs/en/getting-started) and have a `*.test.js` filename.  You can run them with:
```bash
npm test
```
## With Docker
See how to run the node container above, and run the commands up to and including this line:
```bash
docker exec -it pipeline-example npm test
```

# Security audit of dependencies
## Locally with NodeJS
```bash
npm audit
```
## With Docker
```bash
docker exec -it pipeline-example npm audit
```

# Accessibility tests
## Locally with NodeJS
Make sure the app is running, then:
```bash
node ./test/services-search.pa11y.js http://localhost:8080
```
## With Docker
```bash
docker exec -it pipeline-example node ./test/services-search.pa11y.js http://localhost:8080
```

# Behaviour tests
## Locally with NodeJS
Make sure the app is running, and then:
```bash
node ./node_modules/.bin/jest ./test/services-search.feature.test.js
```
## With Docker
```bash
docker exec -it pipeline-example node ./node_modules/.bin/jest ./test/services-search.feature.test.js
```
