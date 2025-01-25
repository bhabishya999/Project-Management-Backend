const projectModal = require('../model/projects');

async function createProject(req, res) {
    try {
        const data = new projectModal({
            title: req.body.title,
            description: req.body.description,
            featured: req.body.featured,
            projectType: req.body.projectType,
            city: req.body.city,
            category: req.body.category
        });

        await data.save();

        return res.status(200).json({message: "Project created successfully"});

    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message});
    }
}

module.exports = createProject;
