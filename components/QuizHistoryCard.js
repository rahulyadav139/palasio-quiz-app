import { Fragment } from 'react';
import styles from './QuizHistoryCard.module.css';
import { textFormatter, timeFormatter } from '../utils/formatter';
import Link from 'next/link';

const QuizHistoryCard = props => {
  const { id, title, date, time, score, category } = props;
  return (
    <Link href={`/${category}/${id}/result`} passHref>
      <div className={styles.wrapper}>
        <div className="heading-4">{textFormatter(title)}</div>
        <div>
          <div className="text-grey text-small text-center">Score</div>
          <div className="heading-5">{score}</div>
        </div>
        <div className="flex space-between">
          <div>
            <div className="text-grey text-small text-center">You Took</div>
            <div className="text-bold text-small">{`${timeFormatter(
              time
            )} Min`}</div>
          </div>
          <div>
            <div className="text-grey text-small text-center">Date</div>
            <div className="text-bold text-small">{date}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default QuizHistoryCard;
