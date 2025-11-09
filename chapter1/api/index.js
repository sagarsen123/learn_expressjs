import { userOnlyMiddleware } from '../middlewares/index.js';

// Export a function to setup routes
export function setupRoutes(app) {
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
        res.json({message: "Server is healthy"});
    });

    // to use this middleware for /api/users endpoint we can pass it as second argument to app.post() method
    app.post("/api/users", userOnlyMiddleware, (req, res)=> {
        console.log("POST request to /api/users endpoint");
        console.log("Request Body:", req.body);
        console.log("Request Body name:", req.body.name);

        res.json({message: "User created successfully"});
    });

    // lets create an api with error and handle it in the error handling middleware
    app.get("/api/check-error", (req, res) => {
        // simulate an error
        throw new Error("Simulated server error");
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({message: "Something went wrong!", error: err.message});
    });
}

