import { useNavigate } from "react-router-dom";
import styles from "./main.module.css";

export default function Main() {
  const navigate = useNavigate();
  const startQuiz = (id) => {
    navigate('/quiz/1');
  };
  return (
    <div className={styles.main}>
      <h2>어서오세요!</h2>
      <p>우마이!</p>
      <button onClick={startQuiz}>시작하기</button>
    </div>
  );
}
