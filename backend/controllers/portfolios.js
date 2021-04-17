
const Portfolio = require('../models/Portfolio');

// exports.getProfiles = async (req, res) => {
//   const profiles = await Profile.find();
//   res.status(200).json({ profiles });
// };

exports.postPortfolio = async (req, res) => {
    //const { name } = req.body;
    const client = req.body.client;
    const location = req.body.location;
    const budget = req.body.budget;
    const surface_area = req.body.surface_area;
    const sector = req.body.sector;
    const construction = req.body.construction;
    const project_description = req.body.project_description;
    const important_facts = req.body.important_facts;
    const imagePath = 'http://localhost:4000/images/' + req.file.filename; // Note: set path dynamically
    const portfolio = new Portfolio({
        client,
        location,
        budget,
        surface_area,
        sector,
        construction,
        project_description,
        important_facts,
        imagePath,
    });
    const createdPortfolio = await portfolio.save();
    //res.json(req.body);
    res.status(201).json({
        portfolio: {
            ...createdPortfolio._doc,
        },
    });
};