import { useState } from "react";
import "../App.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
      setMessage(data.message || "تم إنشاء الحساب بنجاح");
      // wait a moment then go to login page
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000); // 1 second delay so user sees success message
    } else {
        setMessage(data.error || "حدث خطأ أثناء التسجيل");
      }
    } catch (err) {
      setMessage("تعذر الاتصال بالخادم");
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-title">إنشاء حساب جديد</h1>
      <p className="auth-subtext">
        هل لديك حساب؟ <a href="/login">تسجيل الدخول</a>
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>الاسم</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="أدخل اسمك الكامل"
          required
        />

        <label>الإيميل</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="أدخل البريد الإلكتروني"
          required
        />

        <label>كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="أدخل كلمة المرور"
          required
        />

        <button type="submit">إنشاء حساب</button>
      </form>

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}
