import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import "./CommunityQuizzes.css";
import Toast from "../Toast/Toast";
import { useNavigate } from "react-router-dom";

export default function CommunityQuizzes() {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get("/api/quizzes/all-quizzes").then((res) => {
      setQuizzes(res.data);
    });
  });

  const likeQuiz = (quizId) => {
    axios
      .post("/api/quizzes/like-quiz", {
        quizId: quizId,
        userId: localStorage.getItem("_ID"),
      })
      .then((res) => {
        if (res.data) {
          setShowToast(true);
          setMessage(res.data.message);
          axios.get("/api/quizzes/all-quizzes").then((res) => {
            setQuizzes(res.data);
          });
          setTimeout(() => {
            setShowToast(false);
            setMessage(res.data.message);
          }, 3000);
        }
      });
  };

  const takeQuiz = (quizId) => {
    navigate(`/view-quiz/:${quizId}`);
  };

  return (
    <div className="community-quizzes-wrapper">
      <Toast model={showToast} message={message} />
      <div>
        <Sidebar />
      </div>
      <div className="body">
        <div className="header-top">Community Quizzes</div>
        <div className="quizzes-wrapper">
          {quizzes.map((quiz, idx) => (
            <div key={idx} className="quiz-card card">
              <img
                alt={quiz.id}
                src={
                  quiz.imgUrl ||
                  "https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                }
              />
              <div className="quiz-name">{quiz.name}</div>
              <div className="category">{quiz.category}</div>
              <div className="questions">{quiz.questions.length} Questions</div>
              <div className="take-quiz btn" onClick={() => takeQuiz(quiz._id)}>
                Take Quiz
              </div>

              <div className="top-section">
                <div className="likes">
                  {quiz.likes}{" "}
                  <img
                    style={{ cursor: "pointer", padding: "5px" }}
                    onClick={() => likeQuiz(quiz._id)}
                    alt={quiz.id}
                    src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
