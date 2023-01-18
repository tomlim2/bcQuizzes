import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./quiz.module.css";
import { data } from "../helpers/dataQuizes";

export default function Event() {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState(1);
  const [quizStep, setQuizStep] = useState("watch");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [isCheckedAnswer, setIsCheckedAnswer] = useState(false);
  const [isProgress, setIsProgress] = useState(false);
  const maxStage = 5;

  const getData = () => {
    setQuizzes(data.quizzes);
  };

  useEffect(() => {
    if (location.pathname.quizId !== 1 && !isProgress) {
      navigate("/quiz/1");
    }
    getData();
  }, []);

  const goNextQuiz = () => {
    if (!selectedAnswer) {
      alert("반드시 하나 이상의 항목을 클릭하세요");
      return;
    }

    if (stage === 6) {
      navigate("/quiz/finish");
      const body = {
        userId: new Date().toISOString(),
      };

      alert(`finished! You userId is ${body.userId}`);

      return;
    } else if (stage < 6) {
      setStage((prev) => prev + 1);
      navigate(`/quiz/${stage}`);
      setSelectedAnswer("");
      setQuizStep("watch");
      setIsProgress(true);
      setIsCheckedAnswer(false);
    }
  };

  const checkAnswer = () => {
    const isCorrect = selectedAnswer === quizzes[stage - 1].answer;
    if (isCorrect) {
      alert("정답!");
    } else {
      alert("오답!");
    }
    setIsCheckedAnswer(true);
    return;
  };

  const startQuiz = () => {
    setQuizStep("quiz");
  };

  const onChangeOption = (quizId) => {
    setSelectedAnswer(quizId);
  };

  return (
    <>
      {quizzes.length > 0 && (
        <div className={styles.quiz}>
          {quizStep === "watch" && (
            <div className={styles.youtube}>
              <h2>{quizzes[stage - 1].title}</h2>
              <p>{quizzes[stage - 1].description}</p>
              <div className={styles.form}>
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${
                    quizzes[stage - 1].url
                  }`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                <button onClick={startQuiz}>퀴즈 풀러가기</button>
              </div>
            </div>
          )}
          {quizStep === "quiz" && (
            <div className={styles.answer}>
              <h2>{quizzes[stage - 1].title}</h2>
              <p>답변!</p>
              <div className={styles.quizForm}>
                {quizzes[stage - 1].quizzes.map((quiz) => {
                  return (
                    <div key={quiz.quizId}>
                      <input
                        type="radio"
                        id={quiz.quizId}
                        name="quiz"
                        value={quiz.quizId}
                        checked={selectedAnswer === quiz.quizId}
                        onChange={() => onChangeOption(quiz.quizId)}
                      />
                      <label htmlFor={quiz.quizId}>{quiz.quiz}</label>
                    </div>
                  );
                })}

                <button onClick={checkAnswer}>정답확인하기</button>
                <button onClick={goNextQuiz} disabled={!isCheckedAnswer}>
                  {stage === maxStage ? "퀴즈 마치기" : "다음 퀴즈로"}
                </button>
                {stage !== 5 && (
                  <button onClick={() => navigate("/")}>홈으로 돌아가기</button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
