const express = require('express');

const db =require('./data/db.js');

const server = express();

server.use(express.json()); //this helps express parse json info fro req.bodt

server.get('/', (req,res) => {
    res.send('Hello CS12');
}
);

server.get('/users', (req,res) => {
    db.find().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        console.err('error',err);

        res.status(500).json({message: 'error: error getting data'});

    });
});

server.post('/users', async (req,res) => {

    const user = req.body;

    if (user.name && user.bio) {
    try {
        const response = await db.insert(user);
        res.status(201).json(response);

    } catch (ex) {
        res.status(500).json({message: "error getting data"});
    }    
    } else {
        res.status(422).json({message: "user needs both name and bio"});
    }
    // }
});

server.listen(8000, () => console.log('API running on port 8000'));