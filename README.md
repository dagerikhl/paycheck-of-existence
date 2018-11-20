# Paycheck of Existence (PoE) [![Build Status](https://travis-ci.org/dagerikhl/paycheck-of-existence.svg?branch=master)](https://travis-ci.org/dagerikhl/paycheck-of-existence) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

// TODO

Will be hosted at: [https://paycheck-of-existence.firebaseapp.com/](https://paycheck-of-existence.firebaseapp.com/). Contact me at [dagerikhl@gmail.com](mailto:dagerikhl@gmail.com) for questions about this app.

## Introduction

Personal tool to keep track of hours worked each week

## Getting Started

1. Install Node and NPM _([Node.js](https://nodejs.org/en/))_.
2. Run `npm install` to install dependencies.

## Use Locally

### Production

1. Run `npm run build` to build a production bundle.

### Development

1. Run `npm start` to start a local development app that restarts on changes.

## Deployment

// TODO

## Technologies

- The app is written in TypeScript as a React app.
- The app was bootstrapped with create-react-app.

### Configuration

- The server uses [dotenv](https://www.npmjs.com/package/dotenv) for configuration.
    - All environment variables are accessed through `process.env.<variable>`.
    - **Note!** For local development, a local configuration-file, `.env.local`, with all environment variables is required.
        - **Note!** This file should _not_ be commited and used in production. The production server should have different values from local development.
        - **Note!** If environment variables are set through other means, such as npm scripts or server configuration, these are used over the configuration-file.
