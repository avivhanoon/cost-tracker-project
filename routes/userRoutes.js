/**
 * Router for handling user-related operations.
 */
const express = require("express");
const User = require("../models/user");
const Cost = require("../models/cost");

const router = express.Router();

/**
 * Get the details of a specific user.
 * @route GET /api/users/:id
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The ID of the user.
 * @param {Object} res - The response object.
 * @returns {Object} The user's details and their total costs or an error message.
 */
// Get User Details
router.get("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ id });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const totalCosts = await Cost.aggregate([
            { $match: { userid: id } },
            { $group: { _id: null, total: { $sum: "$sum" } } },
        ]);

        const total = totalCosts[0].total || 0;

        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            id: user.id,
            total,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Get the list of team members who developed the project.
 * @route GET /api/about
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object[]} An array of team member details.
 */
// About Team
router.get("/about", (req, res) => {
    res.json([{
            first_name: "Aviv",
            last_name: "Hanoon",
            id: "213389315",
            email: "avivhanoon@gmail.com",
        },
        {
            first_name: "Yuval",
            last_name: "Horesh",
            id: "318815966",
            email: "yuvalhoreshfam@gmail.com",
        },
    ]);
});

module.exports = router;