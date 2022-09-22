import React, { useEffect, useState } from "react";
import "./ViewQuiz.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewQuiz() {
  let { id } = useParams();

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [inputVal, setInputVal] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const checkAuth = () => {
    if (
      quiz.mustBeSigned &&
      localStorage.getItem("JWT_PAYLOAD") &&
      localStorage.getItem("_ID")
    ) {
      setIsAuthenticated(true);
    } else if (quiz.mustBeSigned) {
      setIsAuthenticated(false);
    }
  };
  const refreshQuiz = () => {
    axios
      .get(`/api/quizzes/get-quiz/${id}`)
      .then((res) => {
        if (res.data) {
          setIsLoading(false);
          setQuiz(res.data.quiz);
          checkAuth();
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  useEffect(() => {
    refreshQuiz();
  });

  const startQuiz = () => {
    navigate(`/take-quiz/${id}`, { state: { quiz } });
  };

  const addComment = () => {
    if (!inputVal.length) return;
    axios
      .post("/api/quizzes/add-comment", {
        quizId: id,
        message: inputVal,
        sentFromId: localStorage.getItem("_ID"),
      })
      .then((res) => {
        if (res.data) {
          refreshQuiz();
          setInputVal("");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return !isLoading ? (
    <div className="view-quiz">
      {!isAuthenticated ? (
        <div className="not-auth">You must be logged in to take this quiz</div>
      ) : (
        <div className="content">
          <div className="header">{quiz.name}</div>
          <div className="body">
            <div className="left">
              <div className="description">{quiz.description}</div>
              <div className="comments">
                {quiz.comments.map((com, idx) => (
                  <div className="comment" key={idx}>
                    <img
                      alt={quiz.id}
                      style={{ borderRadius: "100%" }}
                      img="avatar"
                      className="img"
                      src="https://img.pngio.com/png-avatar-108-images-in-collection-page-3-png-avatar-300_300.png"
                    />
                    <div>{com.message}</div>
                    <div>{com.sentFromName}</div>
                  </div>
                ))}
                <div className="input-field">
                  <input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    type="text"
                    placeholder="Add a new comment"
                  />
                  <button onClick={addComment}>Send</button>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="questions-num">
                {quiz.questions.length} Questions
              </div>
              <div
                className={
                  quiz.createdBy === localStorage.getItem("_ID")
                    ? "questions-wrapper"
                    : "questions-wrapper no-scroll"
                }
              >
                {quiz.questions.map((question, idx) => (
                  <div className="question" key={idx}>
                    <div>
                      {quiz.createdBy === localStorage.getItem("_ID")
                        ? question.questionName
                        : "question name"}
                    </div>
                    <div>
                      {quiz.createdBy === localStorage.getItem("_ID")
                        ? question.correctAnswer
                        : "answer"}
                    </div>
                  </div>
                ))}
                {quiz.createdBy !== localStorage.getItem("_ID") ? (
                  <div className="hidden">
                    <div>Must be creator to look at questions</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="buttons-wrapper">
              <button onClick={() => navigate(-1)}>Go Back</button>
              <button onClick={startQuiz}>Take Quiz</button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <h2>Loading</h2>
  );
}
