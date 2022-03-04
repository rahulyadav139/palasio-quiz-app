import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import { Fragment } from 'react';
import Link from 'next/link';

const Home = props => {
  return (
    <Fragment>
      <Header />

      <main className={styles.main}>
        <section>
          <h1 className={styles.brandName}>PALASIO QUIZ</h1>
          <h2 className={styles.introText}>
            Have fun testing your expertise with this general knowledge quiz!
            Contains thousands of questions from various categories.
          </h2>
          <h3 className={styles.introSubtext}>
            Minimalist <span className="text-primary-dark">|</span> Trivia
            <span className="text-primary-dark">|</span> Fun
          </h3>
          <div>
            <Link href="/login">
              <button className="btn primary">Get Started</button>
            </Link>
          </div>
        </section>
        <div>
          <img
            className="img-responsive"
            src="/homepage.png"
            alt="introduction"
          />
        </div>
      </main>
    </Fragment>
  );
};
export default Home;
