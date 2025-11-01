import "../App.css";
import discussionIcon from "../assets/discussion.png";
import problemsIcon from "../assets/problems.png";
import questionsIcon from "../assets/questions.png";
import { Link } from "react-router-dom";

export default function ThreeStrategiesMainPage() {
  return (
    <div className="strategies-page">
      <h1 className="strategies-title">الاستراتيجيات</h1>

      <div className="strategies-container">
       
      <Link to="/strategy/1" className="strategy-card">
        <img src={discussionIcon} alt="استراتيجية المناقشة" />
        <h3>استراتيجية المناقشة</h3>
      </Link>


       <Link to="/strategy/2" className="strategy-card">
          <img src={problemsIcon} alt="استراتيجية حل المشكلات" />
          <h3>استراتيجية حل المشكلات</h3>
        </Link>

         
        <Link to="/strategy/3" className="strategy-card">
          <img src={questionsIcon} alt="استراتيجية طرح الأسئلة" />
          <h3>استراتيجية طرح الأسئلة</h3>
        </Link>




      </div>
    </div>
  );
}
