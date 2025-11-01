import { useEffect, useState } from "react";
import "../App.css";
import { useLocation } from "react-router-dom";

export default function Forum() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const strategyId = params.get("strategy");
  const unitId = params.get("unit");

  const [questions, setQuestions] = useState([]);

  // ✅ Load all questions from backend
  useEffect(() => {
      fetch(`${import.meta.env.VITE_API_URL}/api/forum`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("❌ Error loading questions:", err));
  }, []);

  // ✅ Filter by strategy + unit (if provided)
  const filteredQuestions = questions.filter(
    (q) =>
      (!strategyId || String(q.strategyId) === String(strategyId)) &&
      (!unitId || String(q.unitId) === String(unitId))
  );

  // ✅ Add new answer
  const handleAddAnswer = async (qid, content) => {
    if (!content.trim()) return;

const storedUser = JSON.parse(localStorage.getItem("user"));
const username = storedUser?.name || "مستخدم مجهول";

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/forum/${qid}/answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, content }),
    });

    if (res.ok) {
      const updated = await res.json();
      setQuestions((prev) =>
        prev.map((q) => (q._id === updated._id ? updated : q))
      );
    }
  };

  return (
    <div className="forum-page">
      <h1 className="forum-title">منتدى النقاش</h1>

      {strategyId && unitId ? (
        <p className="forum-subtitle">
          الأسئلة الخاصة بالاستراتيجية رقم {strategyId}، الوحدة رقم {unitId}
        </p>
      ) : (
        <p className="forum-subtitle">شارك إجابتك حول الأسئلة التالية:</p>
      )}

      {filteredQuestions.length > 0 ? (
        filteredQuestions.map((q) => (
          <div key={q._id} className="forum-card">
            <h3 className="forum-question">{q.question}</h3>

            <div className="forum-answers">
              {q.answers.length > 0 ? (
                q.answers.map((a) => (
                  <p key={a._id} className="answer-item">
                    <strong>{a.username}</strong>{" "}
                    ({new Date(a.date).toLocaleString("ar-EG")})<br />
                    {a.content}
                  </p>
                ))
              ) : (
                <p className="no-answers">لا توجد إجابات بعد.</p>
              )}
            </div>

            <ForumAnswerForm qid={q._id} onAdd={handleAddAnswer} />
          </div>
        ))
      ) : (
        <p className="no-answers">لا توجد أسئلة لهذه الوحدة بعد.</p>
      )}
    </div>
  );
}

function ForumAnswerForm({ qid, onAdd }) {
  const [text, setText] = useState("");
  return (
    <div className="answer-form">
      <input
        type="text"
        placeholder="اكتب إجابتك هنا..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          onAdd(qid, text);
          setText("");
        }}
      >
        إرسال
      </button>
    </div>
  );
}
