import parser from 'body-parser'
import express from 'express'
const app = express()
const port = process.env.PORT || 3000

import connection from './connection.js'
import List from './models/List.js'

app.use(parser.json())

app.listen(port, () => console.log(`app listening on port ${port}`))

app.get('/', function(req, res) {
    res.send('New Thing!')
})

app.get('/list', (req, res) => {
    List.find({}).then(lists => res.json(lists))
})

app.get('/list/:id', (req, res) => {
    List.findById(req.params.id)
        .then(list => res.json(list))
})

app.get('/list/name/:name', (req, res) => {
    List.find({name: req.params.name}).then(lists => {
        res.json(lists)
    })
})

app.post('/list', (req, res) => {
    List.create(req.body).then(list => {
        res.json(list)
    })
})


app.post('/list/:id/item', (req, res) => {
    List.findByIdAndUpdate(
        req.params.id,
        { $push: { items: req.body } },
        { new: true }
    ).then(list => res.json(list))
})


app.put("/list/:id", function (req, res) {
    List.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    ).then(list => {
        res.json(list)
    })
})






