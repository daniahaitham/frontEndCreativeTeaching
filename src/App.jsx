import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ThreeStrategiesMainPage  from "./pages/ThreeStrategiesMainPage";
import Forum from "./pages/Forum";
import StrategyPage from "./pages/StrategyPage";
import FeedbackPage from "./pages/FeedbackPage";
import ArticlesPage from "./pages/ArticlesPage";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      
    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/strategies" element={<ThreeStrategiesMainPage />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/strategy/:id" element={<StrategyPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/articles/:strategyId" element={<ArticlesPage />} />

      </Routes>
      <Footer />
    </>
  );
}



export default App;
