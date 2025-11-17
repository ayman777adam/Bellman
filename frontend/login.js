// ------------ إعدادات أساسية -------------
const API_URL = "https://cashbox-backend.onrender.com/api/auth";

// عنصر الرسائل
const toast = (msg, type = "info") => showToast(msg, type);

// ------------ تسجيل الدخول -------------
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    toast("الرجاء إدخال اسم المستخدم وكلمة المرور", "error");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      toast(data.message || "فشل تسجيل الدخول", "error");
      return;
    }

    localStorage.setItem("token", data.token);

    const decoded = decodeToken(data.token);
    localStorage.setItem("lastUser", decoded.username);

    toast("تم تسجيل الدخول بنجاح", "success");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 700);

  } catch (err) {
    console.error(err);
    toast("خطأ في الاتصال بالسيرفر", "error");
  }
});

// ------------ إنشاء حساب -------------
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!username || !password) {
    toast("الرجاء إدخال البيانات كاملة", "error");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      toast(data.message || "فشل إنشاء الحساب", "error");
      return;
    }

    toast("تم إنشاء الحساب بنجاح، الآن يمكنك تسجيل الدخول", "success");

    document.getElementById("showLoginBtn").click();
  } catch (err) {
    console.error(err);
    toast("خطأ في الاتصال بالسيرفر", "error");
  }
});
