const express = require('express');
const app = express();
const fs = require('fs');
const portfoliosController = require('../controllers/portfolios');

const storage = require('../helpers/storage');

const portfolioRoute = express.Router();



// Portfolio model
let Employee = require('../models/Portfolio');

// Add Portfolio
// portfolioRoute.route('/create').post((req, res, next) => {
//     Employee.create(req.body, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// });


portfolioRoute.post('/create', storage, portfoliosController.postPortfolio);

// Get All Portfolios
portfolioRoute.route('/').get((req, res) => {
    Employee.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single Portfolio
portfolioRoute.route('/read/:id').get((req, res) => {
    Employee.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update Portfolio
portfolioRoute.route('/update/:id').put(storage, (req, res, next) => {

    let id = req.params.id;
    let new_image_path = "";
    if (req.file) {
        new_image_path = 'http://localhost:4000/images/' + req.file.filename;
        try {
            fs.unlinkSync(req.body.imagePath);
        } catch (err) {
            console.log(err)
        }
    } else {
        new_image_path = req.body.imagePath;
    }
    Employee.findByIdAndUpdate(req.params.id, {
        client: req.body.client,
        location: req.body.location,
        budget: req.body.budget,
        surface_area: req.body.surface_area,
        sector: req.body.sector,
        construction: req.body.construction,
        project_description: req.body.project_description,
        important_facts: req.body.important_facts,
        imagePath: new_image_path,

    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
})

// Delete Portfolio
portfolioRoute.route('/delete/:id').delete((req, res, next) => {
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

module.exports = portfolioRoute;