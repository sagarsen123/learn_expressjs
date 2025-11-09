import express from "express";
import cors from "cors";

const app = express();

app.use(express.json()); // middleware to parse JSON request bodies
app.use(cors()); // to enable CORS for all routes

// this will be our global middleware
const reqLogger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`)

  // if we don't call next() here the request will be left hanging and will not proceed to the next middleware or route handler
  next(); // call next() to pass control to the next middleware or route handler
}

// now to use this middleware for all routes we can use app.use() method. here we need to pass reference of the middleware express will call this middleware for incoming requests
app.use(reqLogger);

const PORT = process.env.PORT || 4000;

// create a route 
// app . can be used to create different routes for different endpoints
// it takes two arguments: 1> endpoint path 2> callback function which will be executed when a request is made to that endpoint with parameters request and response
// req: represents the request made to the server, it is used to access request data like query parameters, request body, headers etc.
// res: represents the response that will be sent back to the client, it is used to send data back to the client using methods like res.send(), res.json(), res.status() etc.
app.get("/", (req, res)=> {
  res.send("this is the index router or '/' endpoint");
});

app.get("/hello", (req, res) => {
  res.send("hello this is your hello route");
});

// this method is used to check the health of our system
// res.json() method is used to send a JSON response back to the client this is the most common way to send data in RESTful APIs
app.get("/health", (req, res) => {
  // console.log(req.query); // to log query parameters if any
  // console.log(req.query.name); // to log specific query parameter 'name' if present

  res.json({message: "Server is healthy"})

  // this is another way to send a JSON response with a specific status code
  // res.status(400).json({message: "Bad Request"});
});


// now we will create our user only middleware for /api/users endpoint
const userOnlyMiddleware = (req, res, next) => {
  console.log("User only middleware called for /api/users endpoint");
  // perform some operations like authentication, authorization etc.
  // if user is authenticated and authorized then call next() to pass control to the next middleware or route handler
  next();
}

// to use this middleware for /api/users endpoint we can pass it as second argument to app.post() method
// we can add multiple middlewares as needed in the sequence we want them to be executed
// app.post("/api/users", userOnlyMiddleware, middleware2, middlware3, ... , (req, res)=> {}
app.post("/api/users", userOnlyMiddleware, (req, res)=> {

  console.log("POST request to /api/users endpoint");
  // here body will show undefined unless we use a middleware to parse the request body
  console.log("Request Body:", req.body); // to log the request body
  console.log("Request Body name:", req.body.name); // to get value of specific field 'name' from request body

  // send a JSON response back to the client
  res.json({message: "User created successfully"});
})

// app.post("/api/users", (req, res)=> {

//   console.log("POST request to /api/users endpoint");
//   // here body will show undefined unless we use a middleware to parse the request body
//   console.log("Request Body:", req.body); // to log the request body
//   console.log("Request Body name:", req.body.name); // to get value of specific field 'name' from request body

//   // send a JSON response back to the client
//   res.json({message: "User created successfully"});
// })

// middlleware are the functions that have access to the request and response objects and can modify them or perform some operations before passing control to the next middleware or route handler
// they are used for tasks like logging, authentication, parsing request bodies, error handling etc.
// example of a simple middleware that logs the request method and URL
// in express we can create a chain of middlewares to handle a request to assign multiple tasks to different middlewares
// in express there are two types of middlewares: application-level middlewares and router-level middlewares or
// global middlewares and route-specific middlewares(local middlewares)
// we can create our own custom middlewares or use built-in middlewares provided by express or third-party middlewares available via npm packages

// example of a custom middleware that logs request method and URL
// req middleware for logging

// we need to have an error handling middle ware to catch and handle errors that may occur during request processing
// the main funciton of this middleware is to catch errors and thow appropriate responses to the client
// throwing erros without handling them can lead to unhandled exceptions and server crashes
// thats why having a centralized error handling middleware is important for building robust and reliable applications
// Here we take four arguments err, req, res, next to define an error handling middleware
// err represents the error object that was thrown during request processing
// req represents the request object
// res represents the response object
// next is a function that can be called to pass control to the next middleware in the chain (if any) 

// lets create an api with error and handle it in the error handling middleware
app.get("/api/check-error", (req, res) => {
  // simulate an error
  throw new Error("Simulated server error");
});

// we can create this seprately or inline after all route definitions
app.use((err, req, res, next) => {
  console.error(err.stack); // log the error stack trace for debugging purposes
  res.status(500).json({message: "Something went wrong!", error: err.message}); // send a generic error response to the client
});

// third party middlewares are pre-built middlewares that can be installed via npm packages and used in express applications
// examples of popular third-party middlewares include:
// 1> cors: to enable Cross-Origin Resource Sharing
// 2> helmet: to enhance security by setting various HTTP headers
// 3> morgan: to log HTTP requests
// 4> body-parser: to parse incoming request bodies (now built-in with express as express.json() and express.urlencoded())

// app .listen method to start a server and listen on a specific port
// it takes two arguments: 1> port number on which server will run and 2> a callback function which will be executed once server starts successfully
// this is our server running on specified port we can access our defined routes using a web browser or tools like Postman or curl
app. listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

