const projectModal = require('../model/projects');

async function getProjectDetails(req, res) {
    try {
        const {title, type, category, city, page = 1, limit = 10} = req.query;

        let query = {};

        const filterParams = {title, type, category, city};
        Object.keys(filterParams).forEach(key => {
            if (filterParams[key]) {
                query[key] = filterParams[key];
            }
        });

        const pageNumber = parseInt(page, 10);
        const pageLimit = parseInt(limit, 10);

        const skip = (pageNumber - 1) * pageLimit;

        const data = await projectModal.find(query).skip(skip).limit(pageLimit);

        const totalCount = await projectModal.countDocuments(query);

        const totalPages = Math.ceil(totalCount / pageLimit);

        return res.status(200).json({
            message: "Project details fetched successfully",
            data,
            pagination: {
                page: pageNumber,
                limit: pageLimit,
                totalCount,
                totalPages,
            }
        });
    } catch (error) {
        return res.status(500).json({message: "An error occurred", error: error.message});
    }
}

module.exports = getProjectDetails;
