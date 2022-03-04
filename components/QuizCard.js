import styles from './QuizCard.module.css';
import Link from 'next/link';
import { timeFormatter } from '../utils/formatter';
const QuizCard = props => {
  return (
    <Link href={`/${props.category}/${props.id}/instruction`} passHref>
      <div className={styles.quizCard}>
        <img
          className="img-responsive"
          src="/history-image.webp"
          alt="history"
        />
        <div
          className={styles.number}
        >{`Questions: ${props.numOfQuestions}`}</div>
        <div className={styles.time}>{`Time: ${timeFormatter(
          props.time
        )} Min`}</div>
      </div>
    </Link>
  );
};
export default QuizCard;
