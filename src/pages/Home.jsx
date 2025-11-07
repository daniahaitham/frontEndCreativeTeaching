import "../App.css";
import teacherImage from "../assets/teacher.png";
import { useState } from "react";

export default function Home() {
  const [showLoginMsg, setShowLoginMsg] = useState(false);

  const handleMove = () => {
    const user = localStorage.getItem("user");
    if (user) {
      // ✅ fixed for HashRouter
      window.location.href = "#/strategies";
    } else {
      setShowLoginMsg(true);
    }
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-header">
          <img src={teacherImage} alt="المعلمة" className="teacher-photo-left" />

          <div className="header-text">
            <h2 className="main-title">
              منصة تدريب <span className="mine">المعلمين</span>
            </h2>

            <p className="intro-text">
              منصة تُساعد المعلمين والمعلمات وفق أحدث الاتجاهات التربوية، حيث تتيح لهم
              المشاركة بآرائهم وأفكارهم وتجاربهم التعليمية لتبادل الخبرات وتطوير الأداء المهني.
            </p>
            <div className="contact">
              <p><strong>تواصل معنا:</strong></p>
              <p>
                <span>الإيميل:</span>{" "}
                <a href="mailto:educationstrategy38@gmail.com">
                  educationstrategy38@gmail.com
                </a>
              </p>
              <p><span className="contact">الهاتف:</span> 0187878755</p>
            </div>
          </div>
        </div>

        <div className="info-box MineGreen">
          <h3 className="MineGreen">الهدف</h3>
          <p>
            أن تكون المنصة بيئة رقمية رائدة تدعم التواصل والتفاعل بين المعلمين
            وتسهم في تطوير أدائهم بما يعكس إيجاباً على جودة التعليم في المدارس.
          </p>
        </div>

        <div className="info-box MineGreen">
          <h3 className="MineGreen">الرؤية</h3>
          <p>
            تهدف المنصة إلى تمكين المعلمين من مشاركة خبراتهم وأفكارهم التعليمية
            وتوفير مصادر التعلم الرقمي التي تساعدهم في تحسين الأداء الأكاديمي وتحقيق الإبداع في التدريس.
          </p>
        </div>

        <button className="strategy-btn" onClick={handleMove}>
          الانتقال إلى الاستراتيجيات
        </button>

        {showLoginMsg && (
          <div
            className="login-warning"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <p style={{ color: "red", fontWeight: "bold" }}>
              يجب تسجيل الدخول أولاً للوصول إلى الاستراتيجيات
            </p>
            <button
              // ✅ fixed for HashRouter
              onClick={() => (window.location.href = "/#/login")}
              style={{
                padding: "8px 16px",
                backgroundColor: "#004aad",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              تسجيل الدخول الآن
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
