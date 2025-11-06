import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ArticlesPage() {
  const { strategyId } = useParams();
  const [articles, setArticles] = useState([]);

  // ---- Fetch articles ----
  useEffect(() => {
    fetch("/data/articles.json")
      .then((r) => r.json())
      .then((data) => setArticles(data[strategyId] || []))
      .catch(() => setArticles([]));
  }, [strategyId]);

  return (
    <div
      className="articles-page"
      style={{
        direction: "rtl",
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "Tajawal, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#003366",
          marginBottom: "25px",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        اقرأ المزيد من المقالات العلمية
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#555",
          fontSize: "18px",
        }}
      >
        الاستراتيجية رقم: {strategyId}
      </p>

      {articles.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          لا توجد مقالات متاحة حالياً لهذه الاستراتيجية.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {articles.map((a, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ddd",
                borderRadius: "15px",
                padding: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <h3
                style={{
                  color: "#222",
                  fontSize: "20px",
                  marginBottom: "10px",
                }}
              >
                {a.title}
              </h3>

              <p style={{ marginBottom: "6px", color: "#555" }}>
                <strong>المصدر:</strong> {a.source}
              </p>
              <p style={{ marginBottom: "10px", color: "#555" }}>
                <strong>السنة:</strong> {a.year}
              </p>

              <a
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  backgroundColor: "#ffc107",
                  color: "#000",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ffca2c")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ffc107")
                }
              >
                عرض المقال
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
