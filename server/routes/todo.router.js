const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool')

//get
todoRouter.get('/', (req, res) => {

    let queryText = 'SELECT "task" FROM "todo"'
    pool.query(queryText).then(results => {
        res.send(results.rows)
    })
    .catch(error => {
        console.log('error getting todo data', error)
        res.sendStatus(500)
    })
});

//post
todoRouter.post('/', (req, res) => {
    let todo = req.body
    console.log("Inside POST /, req.body:", todo);

    let task = req.body.task;

    const query = `INSERT INTO "todo" ("task") VALUES ($1);`

    pool.query(query, [task])
    .then((result) => {
        console.log("task inserted into table 'todo' in database.");
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making query: ${query}`, error);
        res.sendStatus(500);
    })
});

module.exports = todoRouter;