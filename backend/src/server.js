import express from "express";
import notesRoute from "./routes/notesRoute.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
//const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;



// middleware
app.use(express.json());// this middleware will parse json bodies

app.use(rateLimiter);
//this is a customed middleware
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes",notesRoute);
//Endpoint is a combnation between a URL and a HTTP method (GET, POST, PUT, DELETE)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT : ", PORT);
    });
});
