# Paycheck of Existence (PoE) [![Build Status](https://travis-ci.org/dagerikhl/paycheck-of-existence.svg?branch=master)](https://travis-ci.org/dagerikhl/paycheck-of-existence) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Hosted at: [https://paycheck-of-existence.firebaseapp.com/](https://paycheck-of-existence.firebaseapp.com/). Requires login. Currently only available for me.

For any questions about this app, you can contact me at [dagerikhl@gmail.com](mailto:dagerikhl@gmail.com).

## Introduction

Personal tool to keep track of hours worked each week.

## Getting Started

1. Install Node and NPM _([Node.js](https://nodejs.org/en/))_.
2. Run `npm install` to install dependencies.

## Use Locally

### Production

1. Run `npm run build` to build a production bundle.

### Development

1. Run `npm start` to start a local development app that restarts on changes.

## Deployment

1. Run `npm run commit` to commit using commitizen, creating a commit message on the conventional-changelog format.
2. Run `npm run release` to generate a new `CHANGELOG.md` based on commit messages, increment the version, and tag the release.
3. Run `npm run deploy` to deploy the app directly to Firebase.
    - **Note!** This requires Firebase to be configured.
    - **Note!** This requires certain environment variables to be set, see [Configuration](#configuration).
    - **Note!** This deploys the application a Firebase alias, `staging`.

### CI/CD

The project is setup to deploy automatically with Travis, _but only to staging_. To deploy the application to production, follow the steps in [Deployment](#deployment), and run `npm run deploy:prod` to deploy the newly generated release to production.

## Technologies

- The app is written in TypeScript as a React app.
- The app was bootstrapped with create-react-app.
- The app connects to a back-end database: Google's Firebase.

### Configuration

- The server uses [dotenv](https://www.npmjs.com/package/dotenv) for configuration.
    - All environment variables are accessed through `process.env.<variable>`.
    - **Note!** For local development, a local configuration-file, `.env.local`, with all environment variables is required.
        - **Note!** This file should _not_ be commited and used in production. The production server should have different values from local development.
        - **Note!** If environment variables are set through other means, such as npm scripts or server configuration, these are used over the configuration-file.
