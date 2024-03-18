import express from "express";
import https from "https";
import { readFileSync } from "fs";
import mysql from 'mysql2';
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path, { dirname } from "path"
import cors from 'cors';

const app = express();
const server = https.createServer({
    key: readFileSync("certFiles/keyfile.key"),
    cert: readFileSync("certFiles/certFile.crt")
}, app);
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shoppinglist',
}).promise();
const jsonParser = bodyParser.json();
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//Fallback root
app.get("/", (req, res) =>
{
    res.sendStatus(200);
    res.end();
})

//GET (all) -- For test data: https://localhost:5555/lists?test=true --
app.get("/lists", async (req, res) => 
{
    if (req.query.test == true)
    {
        res.status(200);
        res.send({product: "Test", amount: 1, unit: "db", exp_price: 111, isbought: true}).end();
    }
    else
    {
        try
        {
            let query = await db.query("SELECT * FROM shoppinglist");
            res.status(200);
            res.send(query[0]);
        }
        catch (error)
        {
            res.status(503);
            res.send({"error": "Service unavaiable (MYSQL error: " + error + ")"}).end();
        }
    }
})

//GET (by id)
app.get("/list", async (req, res) =>
{
    if (req.query.id != undefined && parseInt(req.query.id) > 0)
    {
        try
        {
            let query = await db.query("SELECT * FROM shoppinglist WHERE id = ?", req.query.id);
            res.status(200);
            res.send(query[0]);
        }
        catch (error)
        {
            res.status(503);
            res.send({"error": "Service unavaiable (MYSQL error: " + error + ")"}).end();
        }
    }
    else
    {
        res.status(404);
        res.send({"error": "An invalid query parameter was given."}).end();
    }
})

//POST (request's body)
app.post("/list", jsonParser, async (req, res) => 
{
    if (req.body != undefined)
    {
        if ((req.body.product != undefined && req.body.amount != undefined) && ((req.body.unit != undefined && req.body.exp_price) && req.body.isbought != undefined))
        {
            if ((req.body.product.length > 0 && parseInt(req.body.amount) > 0) && ((req.body.unit.length > 0 && parseInt(req.body.exp_price) > 0) && typeof(req.body.isbought) == "boolean"))
            {
                try
                {
                    await db.query('INSERT INTO shoppinglist(product, amount, unit, exp_price, isbought) VALUES(?, ?, ?, ?, ?)', [req.body.product, req.body.amount, req.body.unit, req.body.exp_price, req.body.isbought]);
                    res.sendStatus(200).end();
                }
                catch (error)
                {
                    res.status(503);
                    res.send({"error": "Service unavaiable (MYSQL error: " + error + ")"}).end();
                }
            }
            else
            {
                res.status(400);
                res.send({"error": "Invalid data was given."}).end();
            }
        }
        else
        {
            res.status(400);
            res.send({"error": "Values are not defined."}).end();
        }
    }
    else
    {
        res.status(400);
        res.send({"error": "The request's body is empty."}).end();
    }
})

//DELETE (by id)
app.delete("/list", async (req, res) => 
{
    if (req.query.id != undefined && parseInt(req.query.id) > 0)
    {
        try
        {
            await db.query('DELETE FROM shoppinglist WHERE id = ?', req.query.id);
            res.sendStatus(200).end();
        }
        catch (error)
        {
            res.status(503);
            res.send({"error": "Service unavaiable (MYSQL error: " + error + ")"}).end();
        }
    }
    else
    {
        res.status(404);
        res.send({"error": "An invalid query parameter was given."}).end();
    }
})

//MODIFY (by id, request's body)
app.put("/list", jsonParser, async (req, res) => 
{
    if ((req.query.id != undefined && parseInt(req.query.id) > 0))
    {
        if (req.body != undefined)
        {
            if ((req.body.product != undefined && req.body.amount != undefined) && ((req.body.unit != undefined && req.body.exp_price) && req.body.isbought != undefined))
            {
                if ((req.body.product.length > 0 && parseInt(req.body.amount) > 0) && ((req.body.unit.length > 0 && parseInt(req.body.exp_price) > 0) && typeof(req.body.isbought) == "boolean"))
                {
                    try
                    {
                        await db.query('UPDATE shoppinglist SET product = ?, amount = ?, unit = ?, exp_price = ?, isbought = ? WHERE id = ?', [req.body.product, req.body.amount, req.body.unit, req.body.exp_price, req.body.isbought, req.query.id]);
                        res.sendStatus(200).end();
                    }
                    catch (error)
                    {
                        res.status(503);
                        res.send({"error": "Service unavaiable (MYSQL error: " + error + ")"}).end();
                    }
                }
                else
                {
                    res.status(400);
                    res.send({"error": "New values are not valid."}).end();
                }
            }
            else
            {
                res.status(400);
                res.send({"error": "New values are not defined."}).end();
            }
        }
        else
        {
            res.status(400);
            res.send({"error": "The request's body is empty."}).end();
        }
    }
    else
    {
        res.status(404);
        res.send({"error": "An invalid query parameter was given."}).end();
    }
})

server.listen(5555, () => {
    console.log("Backend up! Avaiable at: localhost:5555")
});