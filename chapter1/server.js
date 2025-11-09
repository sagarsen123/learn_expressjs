import express from "express";
const app = express();

// Import routes and middlewares
import { setupMiddlewares } from "./middlewares/index.js";
import { setupRoutes } from "./api/index.js";

// Setup middlewares
setupMiddlewares(app);

// Setup routes
setupRoutes(app);

const PORT = process.env.PORT || 4000;





// app .listen method to start a server and listen on a specific port
// it takes two arguments: 1> port number on which server will run and 2> a callback function which will be executed once server starts successfully
// this is our server running on specified port we can access our defined routes using a web browser or tools like Postman or curl
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

