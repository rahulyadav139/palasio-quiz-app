import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import AdminHeader from '../../../components/AdminHeader';
import Layout from '../../../components/ui/Layout';
import { useFetch } from '../../../hooks/use-fetch';
import { withSessionSsr, withoutUser } from '../../../utils/with-session';
import styles from '../../../styles/Instruction.module.css';
import {
  textFormatter,
  dateFormatter,
  timeFormatter,
} from '../../../utils/formatter';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { useTheme } from '../../../utils/theme-context';

const QuizInstructions = props => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const category = router.query.categoryName;
  const { sendData } = useFetch();
  const isReady = router.isReady;
  const { defaultThemeHandler } = useTheme();
  const quizId = router.query.quizId;

  useEffect(() => {
    defaultThemeHandler();
    if (!isReady) return;
    (async () => {
      setLoading(true);
      const quiz = await sendData('/api/quiz', { quizId });
      setQuiz(quiz);
      setLoading(false);
    })();
  }, [isReady, defaultThemeHandler, sendData, router]);

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <AdminHeader />
          <Layout>
            <h1 className="text-center heading-3">
              {quiz && `${textFormatter(quiz.category)} Quiz`}
            </h1>
            <p className={`${styles.msg} text-center text-grey`}>
              Read the following instructions
            </p>
            <div className={styles.category}>
              <div className="category__image">
                <img
                  className="img-responsive"
                  src="/history-image.webp"
                  alt="history"
                />
              </div>
              <div className=" flex col space-around">
                <div className="flex space-between align-center">
                  <p className="heading-5">Date:</p>
                  <p className="heading-6">{dateFormatter(new Date())}</p>
                </div>
                <div className="flex space-between align-center">
                  <p className="heading-5">Time Limit:</p>
                  <p className="heading-6">{`${timeFormatter(
                    quiz.quizTime
                  )} Min`}</p>
                </div>
                <div className="flex space-between align-center">
                  <p className="heading-5">Questions:</p>
                  <p className="heading-6">{quiz.numOfQuestions}</p>
                </div>
                <div className="flex space-between align-center">
                  <p className="heading-5">Points:</p>
                  <p className="heading-6">{quiz.numOfQuestions * 5}</p>
                </div>
              </div>
            </div>
            <div className="hr-line fad"></div>
            <div className="instructions">
              <h2 className="heading-4">Instructions:</h2>
              <ol className={`${styles.list} styled-list ordered`}>
                <li>This quiz consists of 4 multiple-choice questions.</li>
                <li>
                  To be successful with the quizzes, it’s important to be
                  conversant with the topics.
                </li>
                <li>
                  Each multiple choice question has only one correct answer.
                </li>
                <li>
                  To win the quiz you need to score more than{' '}
                  <span className="text-large text-bold text-primary-dark">
                    50%
                  </span>
                  .
                </li>
                <li>
                  To start, click the Start button. When finished, click the
                  Submit button.
                </li>
              </ol>
            </div>
            <div className="flex end">
              <Link href={`/${category}/${quizId}`} passHref>
                <button className="btn rounded-edge primary">Start Quiz</button>
              </Link>
            </div>
          </Layout>
        </Fragment>
      )}
      {loading && <LoadingSpinner />}
    </Fragment>
  );
};

export const getServerSideProps = withSessionSsr(withoutUser);

export default QuizInstructions;
