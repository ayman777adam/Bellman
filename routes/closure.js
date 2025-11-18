// routes/closure.js

const express = require('express');
const router = express.Router();
const closureController = require('../controllers/closureController');
const auth = require('../middleware/auth'); // لحماية المسار

// POST /api/closure/save - لحفظ تقرير الإغلاق النهائي
router.post('/save', auth, closureController.saveClosure);

// GET /api/closure/history - لسحب سجلات الإغلاق 
router.get('/history', auth, closureController.getHistory); 

module.exports = router;