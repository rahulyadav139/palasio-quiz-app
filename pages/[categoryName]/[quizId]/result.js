import styles from '../../../styles/Result.module.css';
import Link from 'next/link';
import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import AdminHeader from '../../../components/AdminHeader';
import Layout from '../../../components/ui/Layout';
import ResultAnswerCard from '../../../components/ResultAnswerCard';
import { useFetch } from '../../../hooks/use-fetch';
import { withSessionSsr, withoutUser } from '../../../utils/with-session';
import { useTheme } from '../../../utils/theme-context';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { textFormatter, timeFormatter } from '../../../utils/formatter';

const Result = props => {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const { sendData } = useFetch();
  const router = useRouter();
  const isReady = router.isReady;
  const { defaultThemeHandler } = useTheme();

  useEffect(() => {
    defaultThemeHandler();
    if (!isReady) return;

    const quizId = router.query.quizId;

    (async () => {
      const user = await sendData('/api/user', { userId: props.user.id });

      const selectedQuiz = user.quizzes.find(el => el._id === quizId);

      setQuiz(selectedQuiz);
      setLoading(false);
    })();
  }, [isReady]);

  const getResultText = () => {
    const [scored, totalMarks] = quiz.score.split('/');
    const percentage = scored / totalMarks;
    if (percentage <= 0.5) {
      return 'Better Luck Next Time';
    }

    if (percentage > 0.5 && percentage < 0.9) {
      return 'Good Job';
    }

    if (percentage >= 0.9) {
      return 'Great Job';
    }
  };

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <AdminHeader />
          <Layout>
            <div className={styles.summary}>
              <h1 className="heading-4 text-center">{`${textFormatter(
                quiz.category
              )} Quiz Result`}</h1>
              <p className="text-large text-center">{getResultText()}</p>
              <h2 className="heading-5 text-center">Score:</h2>
              <div className="heading-2 text-center">{quiz.score}</div>
              <div className="flex align-center space-between">
                <p className="text-large text-bold ">
                  {`Quiz Time: ${timeFormatter(quiz.quizTime)}`}
                </p>

                <p className="text-large text-bold ">
                  {`You Took: ${timeFormatter(quiz.userTime)}`}
                </p>
              </div>

              <Link href="/dashboard">
                <button className="btn primary rounded-edge">Dashboard</button>
              </Link>
            </div>
            <div className="hr-line fad"></div>
            <div className={styles.answerSheet}>
              {quiz.questions.map((el, i) => (
                <ResultAnswerCard
                  key={`que_${i}`}
                  questionNum={i + 1}
                  question={el.question}
                  options={el.options}
                  userAnswer={el.userAnswer}
                  correctAnswer={el.correctAnswer}
                />
              ))}
            </div>
          </Layout>
        </Fragment>
      )}
      {loading && <LoadingSpinner />}
    </Fragment>
  );
};

export const getServerSideProps = withSessionSsr(withoutUser);

export default Result;
