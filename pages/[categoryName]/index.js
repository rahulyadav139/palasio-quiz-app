import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminHeader from '../../components/AdminHeader';
import Layout from '../../components/ui/Layout';
import QuizCard from '../../components/QuizCard';
import { useFetch } from '../../hooks/use-fetch';
import { withSessionSsr, withoutUser } from '../../utils/with-session';
import { textFormatter } from '../../utils/formatter';
import styles from '../../styles/Quizzes.module.css';
import { useTheme } from '../../utils/theme-context';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Quizzes = props => {
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const router = useRouter();
  const { sendData } = useFetch();
  const category = router.query.categoryName;
  const isReady = router.isReady;
  const { defaultThemeHandler } = useTheme();

  useEffect(() => {
    defaultThemeHandler();
    if (!isReady) return;
    (async () => {
      const quizzes = await sendData('/api/quizzes', { category });

      if (quizzes.length === 0) return router.replace('/404');
      const user = await sendData('/api/user', {
        userId: props.user.id,
      });

      if (user.quizzes) {
        const userAttemptedQuizzes = user.quizzes.map(el => el._id);
        const notAttemptedQuizzes = quizzes.filter(el => {
          const isIncluded = userAttemptedQuizzes.includes(el._id);
          if (!isIncluded) return el;
        });
        setQuizzes(notAttemptedQuizzes);
      } else setQuizzes(quizzes);
      setLoading(false);
    })();
  }, [isReady]);

  const backToDashboardHandler = () => {
    router.push('/dashboard');
  };
  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <AdminHeader />
          <Layout>
            <div className="heading-3 text-center">
              {isReady && `${textFormatter(category)} Quizzes`}
            </div>
            <button
              onClick={backToDashboardHandler}
              className={`${styles.btnDashboard} btn primary rounded-edge`}
            >
              Dashboard
            </button>
            <div className="hr-line fad"></div>
            {quizzes.length === 0 && (
              <p className={styles.msg}>
                You have attempted all the quizzes! <br /> More are coming
                soon...
              </p>
            )}

            <div className={styles.quizzesWrapper}>
              {quizzes.map(el => (
                <QuizCard
                  key={el._id}
                  id={el._id}
                  category={el.category}
                  time={el.quizTime}
                  numOfQuestions={el.numOfQuestions}
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

export default Quizzes;
