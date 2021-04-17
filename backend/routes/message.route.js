const express = require('express');
const app = express();
const messageRoute = express.Router();


let Employee = require('../models/Message');


// Add Message
messageRoute.route('/create').post((req, res, next) => {
    Employee.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get All Messages
messageRoute.route('/').get((req, res) => {
    Employee.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

messageRoute.route('/delete/:id').delete((req, res, next) => {
    Employee.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = messageRoute;