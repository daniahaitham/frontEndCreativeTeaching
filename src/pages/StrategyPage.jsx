import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

export default function StrategyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [strategy, setStrategy] = useState(null);
  const [currentUnit, setCurrentUnit] = useState(-1);
  const [completedUnits, setCompletedUnits] = useState([]);
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [preExamSubmitted, setPreExamSubmitted] = useState(false);
  const [postExamSubmitted, setPostExamSubmitted] = useState(false);

  // ---- Load saved progress ----
  useEffect(() => {
    const saved = localStorage.getItem(`strategy-progress-${id}`);
    if (saved) {
      try {
        const { currentUnit, completedUnits } = JSON.parse(saved);
        if (typeof currentUnit === "number" && currentUnit <= (strategy?.units?.length ?? 0)) {
          setCurrentUnit(currentUnit);
          setCompletedUnits(Array.isArray(completedUnits) ? completedUnits : []);
        }
      } catch (err) {
        console.warn("⚠️ Invalid saved progress — clearing it.", err);
        localStorage.removeItem(`strategy-progress-${id}`);
      }
    }
  }, [id, strategy]);

  // ---- Fetch strategy data ----
  useEffect(() => {
    fetch("/data/strategies.json")
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((s) => String(s.id) === id);
        setStrategy(found || null);
      });
  }, [id]);

  // ---- Save progress ----
  useEffect(() => {
    localStorage.setItem(
      `strategy-progress-${id}`,
      JSON.stringify({ currentUnit, completedUnits })
    );
  }, [id, currentUnit, completedUnits]);

  // ---- If not loaded ----
  if (!strategy || !Array.isArray(strategy.units)) {
    return <p className="p-6">جاري تحميل البيانات...</p>;
  }

  const totalUnits = strategy.units.length || 0;
  const unit =
    currentUnit >= 0 && currentUnit < totalUnits
      ? strategy.units[currentUnit]
      : null;

  // ---- Convert numbers to Arabic ----
  const toArabic = (num) => num.toString().replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

  // ---- Exam Logic ----
  const handleExamAnswer = (qIndex, optionIndex) => {
    setExamAnswers({ ...examAnswers, [qIndex]: optionIndex });
  };

  const handleExamSubmit = (type) => {
    const exam = strategy.exam;
    let score = 0;
    exam.questions.forEach((q, i) => {
      if (examAnswers[i] === q.answer) score++;
    });

    localStorage.setItem(`${type}Exam-${id}`, JSON.stringify({ answers: examAnswers, score }));

    if (type === "pre") {
      setPreExamSubmitted(true);
    } else {
      setPostExamSubmitted(true);

      // 🔹 compare with pre-exam score
      const preExamData = JSON.parse(localStorage.getItem(`preExam-${id}`));
      const preScore = preExamData?.score || 0;
      const improvement = score - preScore;

      let message = `تم إنهاء التدريب على الاستراتيجية بنجاح!\n`;
      message += `نتيجتك في الاختبار القبلي: ${preScore} من ${exam.questions.length}\n`;
      message += `نتيجتك في الاختبار البعدي: ${score} من ${exam.questions.length}\n`;

      if (improvement > 0) message += `أحسنت! لقد تحسنت بمقدار ${improvement} درجات 🎉`;
      else if (improvement === 0) message += `نتيجتك ثابتة — حاول المراجعة أكثر 🔄`;
      else message += `يبدو أن الأداء أقل من المرة السابقة، لا تقلق وجرّب مجددًا 💪`;

      alert(message);
    }
  };

  // ---- Render Exam ----
  const renderExam = (type) => {
    const exam = strategy.exam;
    if (!exam) return <p>لا يوجد اختبار.</p>;

    return (
      <div className="exam-section">
        <h3>{type === "pre" ? "الاختبار القبلي" : "الاختبار البعدي"}</h3>

        {exam.questions.map((q, qi) => (
          <div key={qi} className="question">
            <p style={{ whiteSpace: "pre-line" }}>
              {toArabic(qi + 1)}. {q.q}
            </p>
            {q.options.map((opt, oi) => (
              <label
                key={oi}
                className="block option-item"
                style={{ marginBottom: "8px", display: "block" }}
              >
                <input
                  type="radio"
                  name={`q${qi}`}
                  checked={examAnswers[qi] === oi}
                  onChange={() => handleExamAnswer(qi, oi)}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}

        {/* Submit button */}
        {!(type === "pre" ? preExamSubmitted : postExamSubmitted) && (
          <button onClick={() => handleExamSubmit(type)} className="next-button mt-4">
            إرسال الإجابات
          </button>
        )}

        {/* Result (appears after submission) */}
        {(type === "pre" ? preExamSubmitted : postExamSubmitted) && (
          <p className="mt-2">
            نتيجتك:{" "}
            {
              Object.keys(examAnswers).filter(
                (q, i) => examAnswers[i] === exam.questions[i].answer
              ).length
            }{" "}
            / {exam.questions.length}
          </p>
        )}

        {/* Next step after pre-exam */}
        {preExamSubmitted && type === "pre" && (
          <button onClick={() => setCurrentUnit(0)} className="next-button mt-4">
            ابدأ الاستراتيجية
          </button>
        )}

        {/* Next step after post-exam */}
        {postExamSubmitted && type === "post" && (
          <>
            <button onClick={() => setCurrentUnit(0)} className="next-button mt-4">
              عرض الوحدات
            </button>

            {Number(id) < 3 && (
              <button
                onClick={() => navigate(`/strategy/${Number(id) + 1}`)}
                className="next-button mt-4"
              >
                الانتقال إلى الاستراتيجية التالية
              </button>
            )}

            {Number(id) === 3 && (
              <p
                className="completion-message"
                style={{
                  marginTop: "20px",
                  fontWeight: "bold",
                  color: "#0a7",
                  fontSize: "28px",
                  textAlign: "center",
                }}
              >
                🎉 لقد أنهيت جميع الاستراتيجيات بنجاح! شكرًا لمشاركتك وتفاعلك.
              </p>
            )}
          </>
        )}
      </div>
    );
  };

  // ---- Navigation ----
  const handleNext = () => {
    const safeCompletedUnits = Array.isArray(completedUnits) ? completedUnits : [];
    if (!safeCompletedUnits.includes(currentUnit)) {
      setCompletedUnits([...safeCompletedUnits, currentUnit]);
    }
    setCurrentUnit((prev) => (prev + 1 < totalUnits ? prev + 1 : totalUnits));
  };

  // ---- Render Logic ----
  if (currentUnit === -1) return renderExam("pre");
  if (currentUnit >= totalUnits) return renderExam("post");

  const isThirdStrategyFinished = id === "3" && postExamSubmitted === true;

  return (
    <div className="strategy-container">
      <div className="strategy-header">
        <h2 className="strategy-title">{strategy.name}</h2>
        <p className="strategy-description">{strategy.description}</p>
      </div>

      <h3 className="unit-title">الوحدة الحالية:</h3>
      <p className="current-unit">{unit ? unit.title : "جاري التحميل..."}</p>

      <div className="units-row">
        {strategy.units.map((u, i) => {
          const isActive = i === currentUnit;
          const isDone = completedUnits.includes(i);
          return (
            <button
              key={u.id || i}
              onClick={() => setCurrentUnit(i)}
              className={`unit-circle ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
              title={u.title}
            >
              {toArabic(i + 1)}
            </button>
          );
        })}
      </div>

      {unit ? (
        <div className="media-section">
          {/* Videos */}
          {unit.videos?.length ? (
            <div>
              <h4>الفيديوهات:</h4>
              {unit.videos.map((v, idx) => (
                <iframe
                  key={idx}
                  src={v.replace("/view?usp=sharing", "/preview")}
                  title={`video-${idx}`}
                  allowFullScreen
                ></iframe>
              ))}
            </div>
          ) : (
            <p>لا توجد فيديوهات في هذه الوحدة.</p>
          )}

          {/* PDFs */}
          {unit.pdfs?.length ? (
            <div>
              <h4>الملفات التعليمية:</h4>
              {unit.pdfs.map((p, idx) => (
                <iframe
                  key={idx}
                  src={p.replace("/view?usp=sharing", "/preview")}
                  title={`pdf-${idx}`}
                ></iframe>
              ))}
            </div>
          ) : (
            <p>لا توجد ملفات تعليمية في هذه الوحدة.</p>
          )}

          {/* Texts */}
          {unit.txts?.length ? (
            <div className="text-files-section">
              <h4>الملفات النصية:</h4>
              <div className="text-links">
                {unit.txts.map((t, idx) => (
                  <a
                    key={idx}
                    href={t}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    عرض الملف {toArabic(idx + 1)}
                  </a>
                ))}
              </div>

              <div className="forum-button-section">
                <Link
                  to={`/forum?strategy=${id}&unit=${unit?.id ?? currentUnit}`}
                  className="forum-link-button"
                >
                  منتدى النقاش
                </Link>
              </div>
            </div>
          ) : (
            <p>لا توجد ملفات نصية في هذه الوحدة.</p>
          )}
        </div>
      ) : (
        <p>الوحدة غير متوفرة أو لم يتم تحميلها بعد.</p>
      )}

      <button
        onClick={handleNext}
        disabled={currentUnit >= totalUnits}
        className="next-button"
      >
        الانتقال إلى الوحدة التالية
      </button>

      {isThirdStrategyFinished && (
        <div
          className="feedback-section"
          style={{ marginTop: "20px", textAlign: "center" }}
        >
          <button
            className="strategy-btn"
            onClick={() => (window.location.href = "/feedback")}
          >
            تقييم المنصة وإرسال الملاحظات
          </button>
        </div>
      )}
    </div>
  );
}
