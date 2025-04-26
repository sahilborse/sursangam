const express = require('express');
const InstrumentService = require('../services/instrumentService');

const router = express.Router();

class InstrumentController {
    static async practice(req, res) {
        const { instrument, userId } = req.body;
        try {
            const result = await InstrumentService.incrementInstrumentPractice(userId, instrument);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getInstruments(req, res) {
        const { userId } = req.params;
        const {instrument}  = req.query;
        try {
            const data = await InstrumentService.getInstrumentData({userId,instrument});
            if (!data) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Database query failed' });
        }
    }
    static async getProgress(req, res) {
        const { userId } = req.params;
        try {
            const data = await InstrumentService.getProgressData({userId});
            if (!data) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Database query failed' });
        }
    }
}

// ✅ Define routes correctly using `router`
router.post('/lesson', InstrumentController.practice);
router.get('/instruments/:userId', InstrumentController.getInstruments);
router.get('/progress/:userId', InstrumentController.getProgress);

// ✅ Export the router, not the class
module.exports = router;
