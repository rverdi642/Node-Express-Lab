const express = require('express');

const db =require('./data/db.js');

const server = express();

server.use(express.json()); //this helps express parse json info fro req.bodt

server.get('/', (req,res) => {
    res.send('Hello CS12');
}
);

// server.get('/posts', (req,res) => {
//     db.find().then(posts => {
//         res.status(200).json(posts);
//     }).catch(err => {
//         console.err('error',err);

//         res.status(500).json({message: 'error: error getting data'});

//     });
// });

// server.post('/posts', async (req,res) => {

//     const post = req.body;

//     if (post.title || post.contents) {
//     try {
//         const response = await db.insert(post);
//         res.status(201).json(response);

//     } catch (ex) {
//         res.status(500).json({message: "error getting data"});
//     }    
//     } else {
//         res.status(422).json({message: "Please provide title and contents for the post."});
//     }
//     // }
// });

// server.delete('/posts/:id', (req,res) => { 
//     const {id} = req.params; //same as  req.params.id...just destructured
//     db.remove(id)
//     .then(count => res.status(204).end())

// .catch(err => res.status(500).json({message: "The post with the specified ID does not exist"}));
// });

server.put('/posts/:id', (req,res) => {
    db.update(req.params.id, req.body)
    .then(posts => {
        res.status(200).json(posts);

    })
    .catch(err => res.status(500).json({message: 'update failed'}));

});

server.listen(8000, () => console.log('API running on port 8000'));