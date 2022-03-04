import styles from './AdminHeader.module.css';
import { useEffect } from 'react';

import { useFetch } from '../hooks/use-fetch';
import { useRouter } from 'next/router';
import { useTheme } from '../utils/theme-context';

const AdminHeader = props => {
  const { getData } = useFetch();
  const router = useRouter();
  const { theme, themeHandler } = useTheme();

  useEffect(() => {
    if (theme) {
      document.querySelector('body').classList.add('dark-theme');
    } else {
      document.querySelector('body').classList.remove('dark-theme');
    }
  }, [theme]);

  const logoutHandler = async () => {
    const data = await getData('/api/logout');
    console.log(data.message);
    router.replace('/');
  };
  return (
    <header className={`${styles.header} shadow`}>
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

      <ul>
        <li>
          <div className="theme-toggle">
            <input
              onChange={themeHandler}
              type="checkbox"
              className="theme-toggle__checkbox"
              id="theme-toggle"
              checked={theme}
            />
            <label className="theme-toggle__label" htmlFor="theme-toggle">
              <span>
                <i className="fas fa-moon"></i>
              </span>
              <span>
                <i className="fas fa-sun"></i>
              </span>
              <span className="ball"></span>
            </label>
          </div>
        </li>
        <li>
          <button onClick={logoutHandler} className="btn primary rounded-edge">
            Logout
          </button>
        </li>
      </ul>
    </header>
  );
};

export default AdminHeader;
