![ERD](https://i.imgur.com/lBsZm3U.png "Entity Relationship Diagram")

TECHNOLOGY USED:

node.js
express.js
mongoDB
mongoose

DEVELOPMENT PROCESS:

PLANNING: I began the api side by creating a ERD so get an idea of how my models should look and relationships they had to each other. Before starting the project, I had grandiose plans of having an app were you can comment, like, and post pictures of your recipes. However, since this is only the first version of the app, I was able to scale down my vision to get a MVP that had all of the functionality that I can later expand upon.

IMPLEMENTATION: I began with creating the curl-scripts for the authentication process (sign-up, sign-in, change-password, and sign-out.) Again, I referenced the ERD to decide the order that I needed to follow. I wanted to make sure that everything was working for the user before I began creating models/routes for the recipes. Next I created a schema for the categories that I wanted the user to be able to write about. Finally I created routes for the recipes, paying close attention to the parameters each RESTful route needed to properly handle its request.


PROBLEM SOLVING STRATEGIES: The biggest challenge I faced was creating the routes for each CRUD action. I was able to overcome these obstacles by testing the curl-scripts in the terminal. At first I tried to write out all of the routes at once. But as I continued to run into snags I decided that it is best to fix one error at a time then move on to the next one.

WHAT ELSE COULD BE ADDED TO FUTURE ITERATIONS:
- Add a "like" function
- Allow users to comment on each others recipes
