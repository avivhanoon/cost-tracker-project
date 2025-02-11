/**
 * Router for handling cost-related operations.
 */
const express = require("express");
const Cost = require("../models/cost");

const router = express.Router();

/**
 * Add a new cost item to the database.
 * @route POST /api/add
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body containing cost data.
 * @param {string} req.body.description - The description of the cost item.
 * @param {string} req.body.category - The category of the cost item.
 * @param {string} req.body.userid - The ID of the user associated with the cost.
 * @param {number} req.body.sum - The sum of the cost item.
 * @param {Date} [req.body.created_at] - The creation date of the cost item. Defaults to the current date.
 * @param {Object} res - The response object.
 * @returns {Object} The saved cost item or an error message.
 */
// Add Cost
router.post("/add", async(req, res) => {
    try {
        const { description, category, userid, sum, created_at } = req.body;
        const cost = new Cost({
            description,
            category,
            userid,
            sum,
            created_at: created_at || new Date(),
        });
        const savedCost = await cost.save();
        res.status(201).json(savedCost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get a monthly report of costs for a specific user.
 * @route GET /api/report
 * @param {Object} req - The request object.
 * @param {Object} req.query - The query parameters.
 * @param {string} req.query.id - The ID of the user.
 * @param {string} req.query.year - The year for the report.
 * @param {string} req.query.month - The month for the report.
 * @param {Object} res - The response object.
 * @returns {Object[]} An array of cost items for the specified month or an error message.
 */

// Monthly Report
router.get("/report", async(req, res) => {
    try {
        const { id, year, month } = req.query;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const costs = await Cost.find({
            userid: id,
            created_at: { $gte: startDate, $lt: endDate },
        });
        res.json(costs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;