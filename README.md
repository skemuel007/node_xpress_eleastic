# Node Express With Elastic Search
## Procedures to run this project

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

The code is written in javascript and runs on node. The following packages are required.

- CORS (npm install cors --save)
- DOTENV (npm install dotenv)
- ELASTICSEARCH (npm install elasticsearch) and
- EXPRESS (npm install express)

## Basic Knowledge

- Javascript
- RESTapi's
- Elasticsearch

## Technology

This project makes use of opensource projects

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]

And of course the code itself is open

## Installation

NodeElastic requires [Node.js](https://nodejs.org/) v16+ to run. No need to worry.

Install Docker Desktop

Start Docker Desktop

Run Elastic search on docker
```sh
docker network create esdata
```

```sh
docker run -d --name elasticsearch --net esdata -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:tag
```

Clone the repo
```sh
git clone <repo_name>
```
Install the dependencies and devDependencies and start the server.

```sh
cd <folder_name>
npm i
node index.js
```

## Docker

NodeElastic is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 3200 and 9200, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile or docker-compose.yml to
build the image.

For Docker file run:

```sh
cd <folder>
docker build -t <dockerusername>/nodeelastic:${package.json.version} .
```

This will create the nodeelastic image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of nodeelastic.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 - --name=nodeelastic <yourusername>/nodeelastic:${package.json.version}
```

Verify the deployment by navigating to your server address in
your preferred browser.

```sh
127.0.0.1:3200
```

For docker-compose.yml run

```sh
docker-composer -f ./docker-compose.yml up --build elasticsearch
docker-composer -f ./docker-compose.yml up --build api
```

or simply run

```sh
docker-compose -f ./docker-compose.yml up --build -d
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Git Profile]: <https://github.com/skemuel007/dillinger>
[git-repo-url]: <https://github.com/joemccann/node_xpress_eleastic.git>
[node.js]: <http://nodejs.org>
[Twitter Bootstrap]: <http://twitter.com/skemuel007>
[express]: <http://expressjs.com>