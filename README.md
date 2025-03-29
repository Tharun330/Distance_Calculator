## Distance Calculator Web Application

## Application Contains Backend REST API for Distance Calculator 

## How to setup project in your local machine
1.Download and install Docker Desktop in your machine.
2.Clone this repo into your vsCode.
3.Open terminal in vsCode and run command 'docker-compose up' by running this command docker container will built automatically. Both, node app image and mongoDB image will run in this container.
4.Now use can access endpoints provided below to work with this application.

## API endpoint
To get the data(qurey history) from DB use /history
example: http://localhost:8080/history

To post new query into the DB /history/new
example: http://localhost:8080/history/new
