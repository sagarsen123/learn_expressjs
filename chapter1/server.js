import express from "express";

const app = express();

const PORT = process.env.PORT || 4000;


// app .listen method to start a server and listen on a specific port
// it takes two arguments: 1> port number on which server will run and 2> a callback function which will be executed once server starts successfully
app. listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});