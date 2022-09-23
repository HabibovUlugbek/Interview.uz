import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../Sidebar/Sidebar";
import "./ViewResults.css";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewResults() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("_ID")) {
      navigate("/");
      localStorage.clear();
    } else {
      if (!id) {
        navigate("/");
      } else {
        axios.get(`/api/quizzes/results/${id}`).then((res) => {
          setResult(res.data.score);
          setQuiz(res.data.quiz);
        });
      }
    }
  }, [id]);

  const getBorderLeft = (idx) => {
    if (result.answers[idx]) {
      return "5px solid green";
    } else {
      return "5px solid red";
    }
  };

  const getScore = () => {
    let len = result.answers.length;
    let right = result.answers.filter((ans) => ans === true);
    return 100 * (right.length / len) + "%";
  };

  return (
    <div className="view-results-wrapper">
      <div>
        <Sidebar />
      </div>
      {quiz && result && (
        <div className="body">
          <div className="header">Quiz Results</div>
          <div className="quiz-data">
            <div className="left">
              <div className="header">{quiz.name}</div>
              <div className="category">{quiz.category}</div>
              <div className="comments">{quiz.comments.length} Comments</div>
            </div>
            <div className="right">
              <div className="likes">{quiz.likes} Likes</div>
              <div className="others">
                {quiz.scores.length} Other people have taken this quiz
              </div>
            </div>
          </div>

          <div className="score">Score: {getScore()}</div>

          <div className="answers">
            {quiz.questions.map((q, idx) => (
              <div
                key={idx}
                className="answer"
                style={{ borderLeft: getBorderLeft(idx) }}
              >
                <div>{q.questionName}</div>
              </div>
            ))}
          </div>

          <div className="img">
            <img
              src={
                quiz.imgUrl
                  ? quiz.imgUrl
                  : "https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
