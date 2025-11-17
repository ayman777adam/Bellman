// frontend/config.js
// هذا الملف مسؤول عن إعدادات الـ API الأساسية وإدارة التوكن

// 1. Base URL (عنوان السيرفر الأساسي على Render)
const BASE_URL = 'https://cashbox-backend.onrender.com'; 


// 2. دالة جلب التوكن (JWT) من التخزين المحلي
// نفترض أن التوكن تم تخزينه باسم 'authToken' بعد تسجيل الدخول
function getToken() {
    return localStorage.getItem('authToken');
}


// 3. دالة إرسال الطلبات للـ API (بشكل محمي)
// تستخدم هذه الدالة لإرسال جميع الطلبات وتضيف التوكن تلقائياً
async function apiRequest(endpoint, method = 'GET', data = null) {
    const token = getToken();
    
    // بناء رأس الطلب (Headers)
    const headers = {
        'Content-Type': 'application/json',
    };
    
    // إضافة التوكن إذا كان متوفراً (لحماية المسارات)
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // بناء خيارات الطلب
    const options = {
        method: method,
        headers: headers,
    };

    // إضافة الجسم (Body) إذا كان الطلب من نوع POST أو PUT أو DELETE
    if (data && (method === 'POST' || method === 'PUT' || method === 'DELETE')) {
        options.body = JSON.stringify(data);
    }

    // تنفيذ الطلب باستخدام fetch
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        const responseData = await response.json();

        // التحقق من رمز الحالة (Status Code)
        if (!response.ok) {
            // رمي خطأ يحتوي على رسالة الخطأ من السيرفر
            throw new Error(responseData.message || `HTTP error! Status: ${response.status}`);
        }

        return responseData;

    } catch (error) {
        console.error('API Request Failed:', error.message);
        throw error;
    }
}