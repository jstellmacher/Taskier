# Taskier, Tasks Made Easier

Taskier is a full-stack application designed to help users stay productive by making task creation easy. It implements a modern tech stack, with [React.js](https://reactjs.org/) and [Tailwind CSS](https://tailwindcss.com/) on the frontend, and a backend powered by Flask, PostgreSQL, SQLAlchemy, and Flask Sessions for authentication.

## Table of Contents
- [Introduction](#introduction)
- [Requirements](#requirements)
- [Project Setup](#project-setup)
- [Project Guidance](#project-guidance)
  - [Planning](#planning)
  - [User Stories](#user-stories)
  - [Models and Relationships](#models-and-relationships)
  - [Wireframes](#wireframes)
- [Execution](#execution)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)

## Introduction
Congratulations on embarking on the Taskier project! This is an opportunity for you to showcase your skills and build a full-stack application using a powerful backend framework. The main goals of this project are:

- Utilize the knowledge and skills you've acquired throughout the program.
- Prepare yourself for building a capstone project in Phase 5.
- Develop a high-quality project to include in your portfolio.

Before you start coding, it is important to plan your app thoroughly. This involves deciding on your models, their relationships, and how the information will be presented on the page. The following sections will guide you through this planning process.

## Requirements
To successfully complete this project, you must adhere to the following requirements:

- Use a Flask API backend with a React frontend.
- Implement at least three models on the backend, including:
  - At least two one-to-many relationships.
  - At least one reciprocal many-to-many relationship.
  - Full CRUD actions for at least one resource.
  - Minimum of create and read actions for EACH resource.
- Utilize forms and validation through Formik for all input.
- Implement at least one data type validation.
- Implement at least one string/number format validation.
- Create at least three different client-side routes using React Router. Include a navigation bar or other UI element to allow users to navigate between routes.
- Connect the client and server using fetch().
- Implement authorization so that users can only edit and delete resources they created.

## Project Setup
To set up the Taskier project, follow these steps:

1. Clone the project repository from GitHub.
2. Separate the client and server code into separate directories.
3. Install the necessary dependencies for both the frontend and backend.
4. Start the development servers for the frontend and backend.

Make sure to include instructions for other developers to easily set up and run your project.

## Project Guidance
### Planning
Before diving into coding, it is crucial to plan your project effectively. This involves creating user stories, designing models and relationships, and creating wireframes for your frontend.

### User Stories
Start by deciding on the domain of your app and then list down the user stories that your app needs to fulfill. Divide your user stories into two categories: Minimum Viable Product (MVP) and stretch features.

For example:

MVP:
- As a user, I can sign up for an account.
- As a user, I can log in to the site and remain logged in.
- As a user, I can log out.
- As a user, I can view a list of all available tasks and their details.
- As a user, I can create a new task.
- As a user, I can edit or delete a task that I created.

Stretch:
- As a user, I can mark tasks as completed.
- As a user, I can filter tasks based on their status.
- As a user, I can prioritize tasks.

### Models and Relationships
After defining your user stories, identify the different objects or entities needed in your app. These objects will translate into models in your backend. Determine the relationships between the models to establish data connections.

For example:

User
Task

A user can have multiple tasks, and a task belongs to a specific user. This establishes a one-to-many relationship between the User and Task models.

Consider using tools like dbdiagram.io to create an Entity Relationship Diagram (ERD) or sketch a simple diagram to visualize the relationships.

### Wireframes
Create wireframes to visually represent the layout and design of your frontend. Wireframes should capture all the user stories and provide a basic representation of each page in your application.

Tools such as Excalidraw, Figma, or Balsamiq can assist you in creating wireframes. Use the wireframes to plan the necessary components and define the component hierarchy.

## Execution
Once you have completed the planning phase, it's time to start building your app. Follow these best practices during the execution:

- Work on each feature in vertical slices, focusing on one feature at a time.
- Test each feature, add styles, and create seed data as you progress.
- Prioritize the MVP features to ensure a solid core of working features.
- Deploy your app early and push changes frequently to ensure compatibility between development and production environments.

Avoid building models, controllers, or views in isolation. Instead, build each feature entirely before moving on to the next one. This approach minimizes rework and ensures working features without waste.

## Deployment
To deploy your Taskier app, you can use the template provided in the project repository. The template includes all the necessary code to deploy your application to a hosting platform like Render. Deploying your app early and frequently is recommended to ensure it works well in both production and development environments.

Follow the instructions in the template to deploy your app and provide clear documentation on how to access and interact with the deployed version.

## Technologies Used
- Frontend:
  - [React.js](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
- Backend:
  - [Flask](https://flask.palletsprojects.com/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [SQLAlchemy](https://www.sqlalchemy.org/)
  - [Flask Sessions](https://flask-session.readthedocs.io/)









![phase-4-task-mgm](https://github.com/matthew-j-roche/phase-4-project/assets/86083839/d90a2b8e-74c6-4158-b7f5-ed913011b7f2)

