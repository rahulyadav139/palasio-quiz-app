import styles from './Header.module.css';
import Link from 'next/link';

const Header = props => {
  return (
    <header className={`${styles.header} shadow`}>
      <Link href="/" passHref>
        <div className="brand">
          <span className="brand__logo">
            <i className="bi bi-hurricane"></i>
          </span>
          <span className="brand__text">
            PALASIO
            <br />
            QUIZ
          </span>
        </div>
      </Link>

      <nav>
        <ul>
          <li>
            <Link href="/login" passHref>
              Login
            </Link>
          </li>
          <li>
            <Link href="/signup" passHref>
              <button className="btn primary">Signup</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
