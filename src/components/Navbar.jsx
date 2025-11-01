import backIcon from "../assets/back.png";
import homeIcon from "../assets/home.png";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  console.log("Navbar loaded"); // this goes outside the JSX, not inside it
  const navigate = useNavigate();

  return (

    <>
       <nav className="navbar">
      {/* Back Button */}
      <button onClick={() => navigate(-1)}>
        <img src={backIcon} alt="رجوع" />
      </button>

      {/* Center Logo */}
      <img src={logo} alt="Logo" />

      {/* Home Button */}
      <Link to="/">
        <img src={homeIcon} alt="الصفحة الرئيسية" />
      </Link>
    </nav>
    </>
  );
}
