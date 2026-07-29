import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoute from "./routes/notesRoute.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();
//const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const ___dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin : "http://localhost:5173",
    })); // this middleware will allow cross origin requests
}
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

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(___dirname,"../frontend/dist")));

    app.use("*", (req,res) => {
        res.sendFile(path.join(___dirname,"../frontend/dist/index.html"));
    })

}
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT : ", PORT);
    });
});
