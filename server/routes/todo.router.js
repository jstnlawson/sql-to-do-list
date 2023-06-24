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

module.exports = todoRouter;