import express from "express";

const app = express();

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
  res.json({message: "Server is healthy"})

  // this is another way to send a JSON response with a specific status code
  // res.status(400).json({message: "Bad Request"});
});




// app .listen method to start a server and listen on a specific port
// it takes two arguments: 1> port number on which server will run and 2> a callback function which will be executed once server starts successfully
app. listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});