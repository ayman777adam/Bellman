// routes/closure.js

const express = require('express');
const router = express.Router();
const closureController = require('../controllers/closureController');
const auth = require('../middleware/auth'); // لحماية المسار

// POST /api/closure/save - لحفظ تقرير الإغلاق النهائي
router.post('/save', auth, closureController.saveClosure);

// GET /api/closure/history - سجل الإغلاقات حسب اليوزر (قد لا تستخدمها لاحقاً)
router.get('/history', auth, closureController.getHistory);

// GET /api/closure/all - **يعيد كل الإغلاقات لكل الموظفين**
router.get('/all', auth, closureController.getAllClosures);

module.exports = router;
