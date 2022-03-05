import { Fragment, useState } from 'react';
import styles from './Quiz.module.css';

const Quiz = props => {
  const { question, options, selectedOption, onAnswer } = props;

  const selectAnswerHandler = e => {
    if (!e.target.value) {
      onAnswer('_');
    } else {
      onAnswer(e.target.value);
    }
  };

  return (
    <div className={styles.quiz}>
      <h2 className="heading-5">{question}</h2>

      {options.map((el, i) => (
        <div key={el + '_' + i + 1}>
          <input
            onChange={selectAnswerHandler}
            type="radio"
            name="answer"
            id={el + '_' + i + 1}
            value={el}
            checked={selectedOption == el}
          />
          <label htmlFor={el + '_' + i + 1}>{el}</label>
        </div>
      ))}
    </div>
  );
};
export default Quiz;
