import AdminHeader from '../../../components/AdminHeader';
import Layout from '../../../components/ui/Layout';
import Quiz from '../../../components/Quiz';
import { useRouter } from 'next/router';
import { useEffect, useState, Fragment } from 'react';
import { useFetch } from '../../../hooks/use-fetch';
import { withSessionSsr, withoutUser } from '../../../utils/with-session';
import { useTheme } from '../../../utils/theme-context';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { timeFormatter, dateFormatter } from '../../../utils/formatter';

const answers = [];

const QuizNow = props => {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const { sendData } = useFetch();
  const router = useRouter();
  const { defaultThemeHandler } = useTheme();
  const isReady = router.isReady;
  const category = router.query.categoryName;
  const quizId = router.query.quizId;
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      if (time === 0) {
        clearInterval(timer);
        answers = [];
        return router.replace('/dashboard');
      }

      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {
    defaultThemeHandler();

    if (!isReady) return;
    (async () => {
      const data = await sendData('/api/quiz', { quizId });

      setTime(data.quizTime);
      setQuiz(data);
      setLoading(false);
    })();
  }, [isReady, defaultThemeHandler, sendData, quizId, router]);

  const getScoreStr = quiz => {
    const correctNumOfAnswers = quiz.questions.reduce((acc, el) => {
      if (el.correctAnswer === el.userAnswer) acc++;
      return acc;
    }, 0);

    const scoreText = `${(correctNumOfAnswers * 5)
      .toString()
      .padStart(2, 0)}/${(quiz.questions.length * 5)
      .toString()
      .padStart(2, 0)}`;

    return scoreText;
  };

  const nextQuestionHandler = async () => {
    answers.push(selectedOption);

    if (index + 1 === quiz.questions.length) {
      console.log('data sent');
      let i = 0;

      const userAttemptedQuiz = quiz;

      for (const que of userAttemptedQuiz.questions) {
        que.userAnswer = answers[i];
        i++;
      }

      const userTime = quiz.quizTime - time;
      userAttemptedQuiz.userTime = userTime;
      userAttemptedQuiz.date = dateFormatter(new Date());
      userAttemptedQuiz.score = getScoreStr(userAttemptedQuiz);

      await sendData('/api/answer', {
        quiz: userAttemptedQuiz,
        userId: props.user.id,
      });

      router.replace(`/${category}/${quizId}/result`);
      return;
    }
    setIndex(prev => prev + 1);
  };

  const previousQuestionHandler = () => {
    setSelectedOption(answers[answers.length - 1]);
    answers.pop();
    setIndex(prev => prev - 1);
  };

  const backToDashboardHandler = () => {
    router.replace('/dashboard');
  };

  const getAnswerHandler = option => {
    setSelectedOption(option);
  };

  const previousButtonClasses = !index
    ? 'btn primary rounded-edge disable'
    : 'btn primary rounded-edge';
  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <AdminHeader />
          <Layout>
            <div className="flex space-between align-center">
              <div>
                <h1 className="heading-4">History Quiz</h1>
                <p className="text-grey">{`Question ${index + 1}/${
                  quiz.questions.length
                }`}</p>
              </div>

              <p className="heading-4">{timeFormatter(time)}</p>

              <button
                onClick={backToDashboardHandler}
                className="btn error rounded-edge"
              >
                End Quiz
              </button>
            </div>

            <div className="hr-line fad"></div>

            {
              <Quiz
                onAnswer={getAnswerHandler}
                question={quiz.questions[index].question}
                options={quiz.questions[index].options}
                selectedOption={selectedOption}
              />
            }

            <div className="flex space-between align-center">
              <button
                disabled={!index ? true : false}
                onClick={previousQuestionHandler}
                className={previousButtonClasses}
              >
                Previous
              </button>

              <button
                onClick={nextQuestionHandler}
                className="btn primary rounded-edge"
              >
                {index + 1 === quiz.questions.length ? 'Submit' : 'Next'}
              </button>
            </div>
          </Layout>
        </Fragment>
      )}
      {loading && <LoadingSpinner />}
    </Fragment>
  );
};

export const getServerSideProps = withSessionSsr(withoutUser);

export default QuizNow;
