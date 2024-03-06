import express from "express";
import http from "http";
import { Server } from "socket.io";
import mysql from 'mysql2';
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '',
}).promise();
const jsonParser = bodyParser.json();

app.get("/", (req,res) =>
{
    res.sendStatus(200);   
})

server.listen(5555, () => {
    console.log("Backend up! Avaiable at: localhost:5555")
});