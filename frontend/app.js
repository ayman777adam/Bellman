document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) { window.location.href = "index.html"; return; }

    // رسالة الترحيب
    if (username) {
        const userElem = document.getElementById("username");
        if (userElem) userElem.textContent = username;
    }

    // زر الخروج
    const logoutBtn = document.getElementById("logoutBtn");
    if(logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.href = "index.html";
        });
    }

    // ربط أحداث الجدول (بما في ذلك إزالة الصفر)
    const mainTable = document.getElementById("mainTableBody");
    const tableParent = document.querySelector("table");
    
    if(tableParent) {
        tableParent.addEventListener("input", handleTableInput);
        tableParent.addEventListener("focusin", handleTableFocusIn);
        tableParent.addEventListener("focusout", handleTableFocusOut);
        tableParent.addEventListener("keydown", handleTableKeyDown);
    }

    // ربط حاسبة الكاش
    const cashTable = document.getElementById("cashCalcTable");
    if(cashTable) {
        cashTable.addEventListener("input", handleCashCalcInput);
        cashTable.addEventListener("keydown", handleTableKeyDown);
        cashTable.addEventListener("focusin", handleTableFocusIn);
        cashTable.addEventListener("focusout", handleTableFocusOut);
    }

    // تشغيل آلة الحاسبة
    const calcGrid = document.querySelector(".calc-grid");
    if(calcGrid) calcGrid.addEventListener("click", handleCalcClick);

    // إنشاء صف أولي إذا كان فارغاً
    if (mainTable && mainTable.children.length === 0) {
        createNewRow();
    }

    // تحميل كل تقفيلات الموظفين
    loadAllClosures();
});


// ============================
//  تحميل كل تقفيلات الموظفين
// ============================
async function loadAllClosures() {
    const res = await apiRequest("/closure/all", "GET");

    if (!res || !res.reports) return;

    const tableBody = document.getElementById("mainTableBody");
    tableBody.innerHTML = ""; // مسح الجدول الحالي

    res.reports.forEach(rep => {
        const row = document.createElement("tr");
        row.classList.add("closed-row");

        row.innerHTML = `
            <td class="row-num">-</td>
            <td>${rep.treasuryReserve}</td>
            <td>${rep.purchaseInvoices}</td>
            <td class="emp-name">${rep.employeeName}</td>
            <td>${rep.closeTime}</td>
            <td>${rep.actualCash}</td>
            <td>${rep.network}</td>
            <td>${rep.bankTransfer}</td>
            <td>${rep.programRevenue}</td>
            <td>${rep.variance}</td>
            <td class="notes-cell">${rep.notes || ""}</td>
            <td><span class="status-closed">تم الإغلاق</span></td>
        `;

        tableBody.appendChild(row);
    });

    updateRowNumbers(1);
}
