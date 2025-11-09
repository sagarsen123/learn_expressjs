import express from "express";
import cors from "cors";

// Create middleware functions
export const reqLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
    next();
};

export const userOnlyMiddleware = (req, res, next) => {
    console.log("User only middleware called for /api/users endpoint");
    next();
};

export const errorHandlerMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: "Something went wrong!", error: err.message});
}
// Export a function to setup middlewares
export function setupMiddlewares(app) {
    app.use(express.json()); // middleware to parse JSON request bodies
    app.use(cors()); // to enable CORS for all routes
    app.use(reqLogger);
    
    // Error handling middleware should be the last middleware to be added
    app.use(errorHandlerMiddleware);
}