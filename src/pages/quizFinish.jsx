import { useNavigate } from "react-router-dom";
import styles from "./quizFinish.module.css";

export default function QuizFinish() {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/");
  };
  return (
    <div className={styles.quizFinish}>
      <h2>수고하셨슴다!</h2>
      <p>결과는 어디에선가 확인가능합니다!</p>
      <button onClick={goToMain}>처음으로 돌아가기</button>
    </div>
  );
}
