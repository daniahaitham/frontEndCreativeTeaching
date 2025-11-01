export default function Feedback() {
  return (
    <div className="feedback-page">
      <h1 className="page-title">تقييم المنصة</h1>
      <p className="page-subtext">شاركنا رأيك وساعدنا في تطوير المنصة.</p>

      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSc1Kr3FuZlIpQlOLlLPVGizN_0qECfNO3XbX8pT3h2lR-XKRA/viewform?embedded=true"
        width="100%"
        height="900"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Feedback Form"
        style={{
          borderRadius: "12px",
          background: "#fff",
          border: "none",
        }}
      >
        يتم تحميل نموذج Google Forms…
      </iframe>
    </div>
  );
}
