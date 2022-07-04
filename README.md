# Meshviewer
[![Build Status](https://img.shields.io/travis/com/ffrgb/meshviewer/develop.svg?style=flat-square)](https://travis-ci.com/ffrgb/meshviewer)
[![Scrutinizer Code Quality](https://img.shields.io/scrutinizer/g/ffrgb/meshviewer/develop.svg?style=flat-square)](https://scrutinizer-ci.com/g/ffrgb/meshviewer/?branch=develop)
[![License: AGPL v3](https://img.shields.io/github/license/ffrgb/meshviewer.svg?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0)

Meshviewer is an online visualization app to represent nodes and links on a map for Freifunk open mesh network.

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

Embedded: https://regensburg.freifunk.net/netz/karte/  
Standalone: https://regensburg.freifunk.net/meshviewer/

## Sponsoring / Supporting

- [BrowserStack](https://www.browserstack.com/) for providing an awesome testing service for hundreds of browsers
- [Travis CI](https://travis-ci.com/) for building meshviewer on every push and pull request
- [Scrutinizer CI](https://scrutinizer-ci.com/g/ffrgb/meshviewer/) for testing code quality on every push and pull request
- [POEditor](https://poeditor.com/join/project/VZBjPNNic9) for providing an easy non-developer translation environment

These tools need a lot of infrastructures and provide a free account for open source software.

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