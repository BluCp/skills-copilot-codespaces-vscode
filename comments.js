// Create web server

// Import modules
const express = require('express'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

// Create web server   
const app = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/comments', (req, res) => {
    Comment.find().then((comments) => {
        res.json(comments);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
}
);

app.get('/comments/:id', (req, res) => {     
    Comment.findById(req.params.id).then((comment) => {
        if (comment) {
            res.json(comment);
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
}
);