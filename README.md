# Meshviewer
[![Build Status](https://github.com/freifunkstuff/meshviewer/actions/workflows/deploy-image.yml/badge.svg)](https://github.com/freifunkstuff/meshviewer/actions/workflows/deploy-image.yml)
[![License: AGPL v3](https://img.shields.io/github/license/ffrgb/meshviewer.svg?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0)

Meshviewer is an online visualization app to represent nodes and links on a map for Freifunk open mesh network.

## About this fork

This is a fork of the original FFRGB Meshviewer with a more community friendly development model.

Changelog from the original development:
* externalized config to decouple development from community configuration
* embedding in IFrame with working deep-links in both directions (cross-domain, using postMessage)
* available as docker container (automatically built with github actions)
* support for hardware images (like hopglass)
* much better handling for wrong/missing data in json
* better router regexp that allows alphanumeric node ids (not limited to exactly 12 hex digits anymore)
* Number of clients in local cloud (like in hopglass)
* Extra style for nodes with uplink


## Running with Docker

* copy the example config and modify it to your needs
* Run the following docker command. The config must be mounted into the docker container

```
docker run -d \
  --mount type=bind,source="$(pwd)/config.js",target=/usr/share/nginx/html/config.js \
  -p 8088:80 \
  --name meshviewer \
  ghcr.io/freifunkstuff/meshviewer:master
```


### Demo

Embedded: https://freifunk-leipzig.de/map/
Standalone: https://karte.freifunk-leipzig.de/

## Building / Running

Required tools:
* yarn
* gulp

Install the dependencies by running
```
yarn
```

Copy the example config and edit it to your needs
```
cp config.js.example config.js
```

Then you can start a development server with
```
gulp serve
```

To build a release, run
```
gulp
```

The result will be in the "build" folder afterwards.