# Docker-Node.js-Express.js Project

Following [this course](https://www.youtube.com/watch?v=9zUHg7xjIqQ), to learn about Docker and its implementation on an Node-Express-Redis-Mongo application.

## Deployment on Azure [Production Environment]

### Docker Installation

Using the command: [For Linux Distributions](https://get.docker.com/)

### Installation of Docker-Compose

Using the command: [Using Standalone commands for Linux](https://docs.docker.com/compose/install/standalone/)

### Setting up environment variables

Making an **.env** file and adding the following variables:

- MONGO_USER
- MONGO_PASSWORD
- SESSION_SECRET
- MONGO_INITDB_ROOT_USERNAME
- MONGO_INITDB_ROOT_PASSWORD

Exporting the variables, by adding the following command in the **.profile** file. 

Command: `set -o allexport; source <path to .env file>; set +o allexport`

### Clone the Repository

Clone this repo or just use [this link](https://github.com/deepanshu-rawat6/Docker-Backend-Project.git)

### Run the Docker-Compose file

Use the command: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

### Check the running containers

Use the command: `docker ps`

### Check the logs of the running containers

Use the command: `docker logs <directory>-node-app-1 -f` 

### Adding wathctower to the project

To automatically pull in the changes from the dockerhub repository.

Use the command: `docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_DEBUG=true -e WATCHTOWER_POLL_INTERVAL=<in seconds> -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower <container to be monitored>`

### Using Docker Swarm

#### Enable the swarm 

To enable docker swarm mode using the command: `docker swarm init`

#### Deploy the stack

To deploy the stack using the command: `docker stack deploy -c docker-compose.yml -c docker-compose.prod.yml <name of the stack>`

#### Check the status of node and stack

For node,Use the command: `docker node ls`

For stack, use the command: `docker stack ls`

#### Check the running services

To check the running services using the command: `docker service ls`

Also we can use the command: `docker stack services <name of the stack>`

For stack, we can us the command: `docker service ps`

## Image Link

Image is present at Dockerhub [click here](https://hub.docker.com/repository/docker/deepanshurawat6/docker-node-app) , to access the image.