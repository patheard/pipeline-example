# What's this?
An example project showing how a Continuous Integration (CI) and Continous Delivery (CD) pipeline can be used to improve code quality, security and stability.

# Running the project
## Locally with NodeJS
If you've got NodeJS installed, run the following:
```bash
npm install
npm start
```

## Using docker-compose
```bash
# Build the docker image
docker build -t pipeline-demo .
# Start the service
docker-compose up -d
```