import AdminHeader from '../components/AdminHeader';
import Layout from '../components/ui/Layout';
import styles from '../styles/Dashboard.module.css';
import QuizCategory from '../components/QuizCategory';
import { useEffect, useState, Fragment } from 'react';
import { useFetch } from '../hooks/use-fetch';
import { withSessionSsr, withoutUser } from '../utils/with-session';
import { useTheme } from '../utils/theme-context';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import QuizHistoryCard from '../components/QuizHistoryCard';
import Link from 'next/link';

const leagues = [
  { league: 'Diamond', numOfQuestions: 125, image: '/diamond-league.png' },
  { league: 'Platinum', numOfQuestions: 100, image: '/platinum-league.png' },
  { league: 'Gold', numOfQuestions: 75, image: '/gold-league.png' },
  { league: 'Silver', numOfQuestions: 50, image: '/silver-league.png' },
  { league: 'Bronze', numOfQuestions: 25, image: '/bronze-league.png' },
];

const Dashboard = props => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const { sendData, getData } = useFetch();
  const { defaultThemeHandler } = useTheme();
  const [tab, setTab] = useState(1);

  const userId = props.user.id;

  useEffect(() => {
    defaultThemeHandler();
    (async () => {
      const user = await sendData('/api/user', { userId });
      const categories = await getData('/api/categories');
      setCategories(categories);
      setUser(user);
      setLoading(false);
    })();
  }, [defaultThemeHandler, sendData, getData, userId]);

  const getStats = () => {
    if (!user.quizzes) return [0, 0, 0];
    const numOfCorrectAnswers = user.quizzes
      .map(quiz => {
        const correctAnswers = quiz.questions
          .map(el => {
            if (el.userAnswer === el.correctAnswer) return 1;
            else return 0;
          })
          .reduce((acc, el) => (acc += el), 0);

        return correctAnswers;
      })
      .reduce((acc, el) => (acc += el), 0);

    const numOfQuestionsAttempted = user.quizzes.reduce(
      (acc, el) => (acc += el.numOfQuestions),
      0
    );

    const totalUserTime = user.quizzes.reduce(
      (acc, el) => (acc += el.userTime),
      0
    );

    const avgTimePerQuestion = `${(
      totalUserTime /
      (numOfQuestionsAttempted * 60)
    ).toFixed(1)} Min`;

    const numOfQuizzesPassed = user.quizzes.length;

    return [numOfQuizzesPassed, avgTimePerQuestion, numOfCorrectAnswers];
  };

  const getLeague = numOfQuestions => {
    switch (numOfQuestions) {
      case numOfQuestions > 100:
        return 'Diamond';

      case numOfQuestions > 75:
        return 'Platinum';

      case numOfQuestions > 50:
        return 'Gold';

      case numOfQuestions > 25:
        return 'Silver';

      default:
        return 'Bronze';
    }
  };

  const switchTabHandler = index => {
    setTab(index);
  };

  return (
    <Fragment>
      {!loading && (
        <Fragment>
          <AdminHeader />
          <Layout>
            <div className={styles.dashboard}>
              <div className="avatar large">
                <img src="https://picsum.photos/536/354" alt="sample" />
              </div>
              <div className={styles.dashboardInfo}>
                <div className="flex space-between">
                  <h1>{user && user.fullName}</h1>
                  <Link href="/profile" passHref>
                    <div className={styles.btnProfile}>Edit Profile</div>
                  </Link>
                </div>
                <h4>{`${getLeague()} League`}</h4>
                <progress
                  className={styles.progressBar}
                  value={getStats()[2] % 25}
                  max="25"
                ></progress>

                <div className={styles.activityItems}>
                  <div className={styles.activityItem}>
                    <div className="icon medium square rounded-corner primary">
                      <i className="fas fa-flag"></i>
                    </div>
                    <div className={styles.activityStat}>
                      <div className={styles.statNumber}>{getStats()[0]}</div>
                      <div className={styles.statTitle}>Quiz Passes</div>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className="icon medium square rounded-corner primary">
                      <i className="fas fa-stopwatch"></i>
                    </div>
                    <div className={styles.activityStat}>
                      <div className={styles.statNumber}>{getStats()[1]}</div>
                      <div className={styles.statTitle}>Average Time</div>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className="icon medium square rounded-corner primary">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div className={styles.activityStat}>
                      <div className={styles.statNumber}>{getStats()[2]}</div>
                      <div className={styles.statTitle}>Correct Answers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hr-line fad"></div>
            <div className={styles.featured}>
              <div className={styles.userProgress}>
                <div className={styles.tabAction}>
                  <button
                    className={
                      tab === 1
                        ? `${styles.button} ${styles.active}`
                        : styles.button
                    }
                    onClick={switchTabHandler.bind(null, 1)}
                  >
                    Quiz History
                  </button>
                  <button
                    className={
                      tab === 2
                        ? `${styles.button} ${styles.active}`
                        : styles.button
                    }
                    onClick={switchTabHandler.bind(null, 2)}
                  >
                    League Board
                  </button>
                </div>

                <div
                  className={
                    tab === 1
                      ? `${styles.quizzes} `
                      : `${styles.quizzes} ${styles.hidden}`
                  }
                >
                  {user.quizzes &&
                    user.quizzes.map(el => (
                      <QuizHistoryCard
                        key={el._id}
                        id={el._id}
                        category={el.category}
                        score={el.score}
                        time={el.userTime}
                        title={el.category}
                        date={el.date}
                      />
                    ))}
                  {!user.quizzes && (
                    <p className={styles.startMsg}>
                      You have not attempted any quiz. Start you journey...
                    </p>
                  )}
                </div>

                <div
                  className={
                    tab === 2
                      ? `${styles.leagues} `
                      : `${styles.leagues} ${styles.hidden}`
                  }
                >
                  {leagues.map(el => (
                    <div
                      key={el.league}
                      className={
                        el.league === getLeague()
                          ? `${styles.league} ${styles.currentLeague}`
                          : styles.league
                      }
                    >
                      <div className="avatar small">
                        <img src={el.image} alt={el.league} />
                      </div>
                      <div className="heading-6">{`${el.league} League`}</div>

                      <div className={styles.activityStat}>
                        <div className={styles.statNumber}>
                          {el.numOfQuestions}
                        </div>
                        <div className={styles.statTitle}>Correct Answers</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.categoriesSection}>
                <h2 className={`${styles.sectionTitle} heading-5`}>
                  Featured Categories
                </h2>
                <div className={styles.categoriesWrapper}>
                  {categories.map(el => (
                    <QuizCategory
                      key={el._id}
                      id={el._id}
                      title={el.title}
                      image={el.image}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Layout>
        </Fragment>
      )}

      {loading && <LoadingSpinner />}
    </Fragment>
  );
};

export const getServerSideProps = withSessionSsr(withoutUser);

export default Dashboard;
