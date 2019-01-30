# Parabible Server

[![Parabible screenshot: Hebrew Genesis 1 morphology](parabible-screenshot.png)](https://parabible.com/)

## Introduction

This repository is the parabible backend that serves the [`parabible-client`](https://github.com/parabible/parabible-client) and supports its API. The plan is to grow the API slowly but surely. The essential features are already implemented:

- Chapter querying
- Word metadata lookups
- Metadata based searching

## Instructions

Right now you need a mongo database to set up your own server. If you want a copy of the data, I can send it to you but I'm busy redesigning the backend to move away from mongo so you might want to wait a few months before setting up this server for yourself (expect some breaking changes).

Given the mongo db, setup is not difficult.

1. Clone the repository and install packages

```
git checkout https://github.com/parabible/parabible-server.git
cd parabible-server
npm install
```

2. Build. Technically you don't need to build to get parabible running because the latest build is included in the repository. Obviously you'll need to be able to build to contribute though.

```
npm run build
```

3. Run

First you need to set up some environmental variables:

|Variable Name|Content|
|---|---|
|MONGO_CONNECTION_STRING|`username:password@host:port`|
|MONGO_DATABASE|`db_name`|
|PARABIBLE_CLIENT_DIR|Absolute path to [`parabible-client`](https://github.com/parabible/parabible-client) with read access to the node user. Not important if all you want is the API.|
|HOST|Express host address to host on (default: `127.0.0.1`)|
|PORT|Express port to host on (default: `3000`)|

```
npm start
```

## Roadmap

There are a number of ideas in the works but time is limited. Broadly speaking this means changes to the data layer and additional API features.

### The Data Layer

The backend is being overhauled to use a relational database. This will mean breaking changes to the current API (but the API is not complicated and will remain easy to understand - hopefully it will become easier).

1. Implement relational db. (done)
2. Modify client to work with new API. (high priority)
3. Publish data pipeline so that setting up a server is possible.

### API Features

1. Discovery tool for significant collocations to aid word studies (50% done)
2. Tree view results for syntactical data