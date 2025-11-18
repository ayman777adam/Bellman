// controllers/closureController.js

const ClosureReport = require('../models/ClosureReport');

exports.saveClosure = async (req, res) => {
    // 🔥 ملاحظة: req.user.username سيأتي من التوكن (JWT) للتأكيد
    const { 
        dayName, closeTime, treasuryReserve, purchaseInvoices, 
        temporarySuspensions, actualCash, network, bankTransfer, 
        programRevenue, variance, notes 
    } = req.body;

    try {
        const newReport = new ClosureReport({
            dayName, closeTime, treasuryReserve, purchaseInvoices, 
            temporarySuspensions, actualCash, network, bankTransfer, 
            programRevenue, variance, notes,
            employeeName: req.user.username // ربط التقرير باسم الموظف من التوكن
        });

        const savedReport = await newReport.save();
        
        // الرد بنجاح حتى يتمكن الـ Frontend من مسح الـ localStorage
        res.status(201).json({ message: "Closure report saved successfully.", reportId: savedReport._id });

    } catch (error) {
        console.error("Error saving closure report to DB:", error);
        res.status(500).json({ message: "Failed to save closure report.", error: error.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const reports = await ClosureReport.find({ employeeName: req.user.username })
            .sort({ createdAt: -1 })
            .limit(100); 

        res.status(200).json({ reports });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reports.", error: error.message });
    }
};