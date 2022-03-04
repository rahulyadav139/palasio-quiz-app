import styles from './ResultAnswerCard.module.css';
const ResultAnswerCard = props => {
  const { questionNum, question, options, userAnswer, correctAnswer } = props;

  const getOptionCLasses = option => {
    if (option === userAnswer && userAnswer === correctAnswer)
      return `${styles.option} ${styles.correctAnswer}`;

    if (option === userAnswer && userAnswer !== correctAnswer)
      return `${styles.option} ${styles.incorrectAnswer}`;

    if (option === correctAnswer)
      return `${styles.option} ${styles.correctAnswer}`;

    return styles.option;
  };

  const scoreClasses =
    correctAnswer === userAnswer
      ? `${styles.correctAnswerScore} text-large`
      : `${styles.incorrectAnswerScore} text-large`;

  return (
    <div className={styles.answerCard}>
      <div className={styles.answerCardHead}>
        <p className="text-large">{`Question: ${questionNum}`}</p>
        <p className={scoreClasses}>
          Score: {correctAnswer === userAnswer ? 5 : 0}
        </p>
      </div>
      <h2 className="heading-5">{question}</h2>
      <div className={styles.options}>
        {options.map((el, i) => (
          <div key={i + 1} className={getOptionCLasses(el)}>
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ResultAnswerCard;
