import { Fragment, useState } from 'react';
import styles from './Quiz.module.css';

const Quiz = props => {
  const { question, options, selectedOption, onAnswer } = props;
  // const [answer, setAnswer] = useState(prevAnswer);
  // console.log(answer);
  // const [option, setOption] = useState('');

  const selectAnswerHandler = e => {
    // setOption(e.target.value);
    // prevAnswer = e.target.value;
    // setAnswer(e.target.value);
    // props.onAnswer(e.target.value);
    // onReset();
    if (!e.target.value) {
      onAnswer('_');
    } else {
      onAnswer(e.target.value);
    }
  };

  // prevAnswer = 'Delhi';

  return (
    <div className={styles.quiz}>
      <h2 className="heading-5">{question}</h2>
      {options.map((el, i) => (
        <Fragment>
          <input
            key={el + '_' + i + 1}
            onChange={selectAnswerHandler}
            type="radio"
            name="answer"
            id={el + '_' + i + 1}
            value={el}
            checked={selectedOption === el}
          />
          <label htmlFor={el + '_' + i + 1}>{el}</label>
        </Fragment>
      ))}
      {/* {prevAnswer &&
        options.map((el, i) => (
          <Fragment>
            {console.log('another')}
            <input
              key={el}
              onChange={selectAnswerHandler}
              type="radio"
              name="answer"
              id={el}
              value={el}
              checked={prevAnswer === el}
            />
            <label htmlFor={el}>{el}</label>
          </Fragment>
        ))} */}
    </div>
  );
};
export default Quiz;
