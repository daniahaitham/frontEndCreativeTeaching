import { useState } from "react";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "تم تسجيل الدخول بنجاح");
        localStorage.setItem("user", JSON.stringify(data.user)); 
        window.location.href = "/";
      } else {
        setMessage(data.error || "حدث خطأ أثناء تسجيل الدخول");
      }
    } catch (err) {
      setMessage("تعذر الاتصال بالخادم");
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-title">تسجيل الدخول</h1>
      <p className="auth-subtext">
        لا تمتلك حساباً؟ <a href="/signup">أنشئ حساب جديد</a>
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
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

        <button type="submit">تسجيل الدخول</button>
      </form>

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}
