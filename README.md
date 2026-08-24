## MathSoc - Backend Task (Hotel Management REST API)


A RESTful backend API for managing hotel rooms and bookings, built with Node.js, Express, and MongoDB using Mongoose.

The application provides the core functionality required for managing hotel rooms, creating and retrieving bookings, filtering bookings, and checking room availability based on booking dates. The project also includes centralized error handling and schema-level validation to ensure consistent API behaviour.

As part of the additional functionality, models for menu items and room service have also been created. These additional features are currently at the modelling stage and have not yet been fully integrated into the API.

### How to run ?

This project isnt hosted anywhere, so you will have to run it locally. Create a .env file and add a PORT variable and the DB_URI. 
The DB_URI can be obtained by setting up a new project on MongoDB Atlas and then setting up a new cluster, the steps afterwards will give you the connection string along with a userid and password to be put in the connection string.



### All valid routes
for this example the main home route is considered to be [https://localhost:5050/api/](http://localhost:5050/api/)

- /rooms : all rooms in the hotel
- /rooms/create-room
- /rooms/:id ~ deletes/updates/gets individual rooms on the basis of room id
- /rooms/available ~ check available rooms within a specified timeframe and if the rooms have no booking during that period
- /menu - create/update/delete/get all the menu items
- /bookings - create new bookings and the bookings are derived not stored. So the checking of availability is purely based on logic by filtering the data in MongoDB's DB engine. 
