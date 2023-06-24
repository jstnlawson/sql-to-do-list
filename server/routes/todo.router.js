const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool')

//get
todoRouter.get('/', (req, res) => {

    let queryText = 'SELECT "task", "complete" FROM "todo"'
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
    let complete = req.body.complete;

    const query = `INSERT INTO "todo" ("task",  "complete") VALUES ($1, $2);`

    pool.query(query, [task, complete])
    .then((result) => {
        console.log("task inserted into table 'todo' in database.");
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making query: ${query}`, error);
        res.sendStatus(500);
    })
});

// put/complete
todoRouter.put('/:id', (req, res) => {
    const idToUpdate = req.params.id
    //toggle between boolean values
    let query = `UPDATE "todo" SET "complete" = NOT "complete"
    WHERE id = $1;`;
    pool.query(query, [idToUpdate])
.then((results) => {
    console.log("success in the router.put")
    res.sendStatus(200)
})
.catch((error) => {
    console.log('error making DB query', error)
    res.sendStatus(500)
})
});

module.exports = todoRouter;