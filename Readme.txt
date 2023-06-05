Project Name
ADMYBRAND

Project Description

The project is a web application that allows users to create and manage advertisements for
newspapers. Users can either log in or sign up to access the application's features.
Once logged in, users have the option to write their own ad or utilize an AI-powered
tool to generate ad articles.

The application provides the following functionalities:
User Authentication:
Users can sign up by providing a username and password.
Existing users can log in using their credentials.
Ad Creation:
After logging in, users can create their own ad articles by specifying the title and
description.
The created ad articles can be saved and stored in the database for future reference.
AI-Powered Ad Generation:
Users have the option to use an AI tool powered by GPT to generate ad articles automatically.
Users can preview and review the generated ad articles before saving them to the database.
Database Management:
The application interacts with a MySQL database to store and retrieve user information and ad articles.
User credentials and ad data are securely stored in the database.

Please refer to the installation guide and documentation for more information on setting up
and using the application.

Installation
Clone the repository:
git clone https://github.com/username/project.git

Change to the project directory:
cd project
Install the dependencies:
npm install
Set up the database:

Create a MySQL database with the name admybrand22.
Update the DATABASE.JS file with your MySQL database credentials (host, user, password, database).
Start the server:
npm start
The server should now be running on http://localhost:3000.

Documentation

Routes
GET /
Description: Retrieves the home page.

GET /article
Description: Retrieves the article page.

POST /signup
Description: Creates a new user.

Parameters:

username: The username of the user.
password: The password of the user.
POST /login
Description: Logs in a user and generates a JWT token.

Parameters:

username: The username of the user.
password: The password of the user.
POST /articles
Description: Creates a new article.

Parameters:

title: The title of the article.
description: The description of the article.
Middlewares
authenticateToken
Description: Middleware function to verify the JWT token.

Public Folder
The public folder contains HTML files that are served by the server for the / and /article routes.