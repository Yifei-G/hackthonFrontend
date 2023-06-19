# Matrix App

This document provides setup instructions for running the matrix-app both locally without Docker and within a Docker container.

## Local Setup (Non-Docker)

The application requires at least Node.js version 14.0.0 or later and Vue CLI to run locally. Follow these steps to set up the local environment:

```bash
# For macOS:

# Install Node Version Manager (NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install 16
nvm use 16

# Install Vue CLI
npm install -g @vue/cli

# Install project dependencies
npm install
```

Alternatively, you can simply run the setup script to automate the above steps:

```bash
bash setup-non-docker-local-environment.sh
```

## Start the App

To start the application, use the following command:

```bash
npm run serve
```


## Docker Setup

You can also run the app within a Docker container. To do this, use the following command:

```bash
bash install.sh
```

NOTE: If you are behind a proxy, you will need to set up the proxy in the Dockerfile and docker-compose.yml file.
To do this, uncomment the following lines in the Dockerfile:

```
#ARG http_proxy
#ARG https_proxy
```

And update the proxy values in the docker-compose.yml file:

```
build:
  context: .
  args:
    - http_proxy=https://username:password@proxy-hostname:port/
    - https_proxy=https://username:password@proxy-hostname:port/
```

## Cleanup Docker Environment

If for any reason you need to clear up Docker resources associated with this app, run:

```bash
bash clean.sh
```