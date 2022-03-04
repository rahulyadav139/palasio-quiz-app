import styles from '../styles/Auth.module.css';
import Header from '../components/Header';
import Link from 'next/link';
import { useInput } from '../hooks/use-input';
import { useState, useEffect, Fragment } from 'react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useRouter } from 'next/router';
import { useFetch } from '../hooks/use-fetch';
import { withSessionSsr, withUser } from '../utils/with-session';
const Login = props => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { sendData } = useFetch();
  const router = useRouter();

  useEffect(() => {
    const clearToastTimer = setTimeout(() => {
      setToast(false);
    }, 2000);
    return () => clearTimeout(clearToastTimer);
  }, [toast]);
  const {
    value: email,
    setIsTouched: emailIsTouched,
    isValid: emailIsValid,
    isInvalid: emailIsInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(
    value => value.includes('@') === true && value.includes('.') === true
  );

  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(value => value.length !== 0);

  const emailClasses = emailIsInvalid
    ? 'input-field responsive error'
    : 'input-field responsive';
  const passwordClasses = passwordIsInvalid
    ? `${styles.inputWithIcon} input-field-icon responsive error`
    : `${styles.inputWithIcon} input-field-icon responsive`;

  const loginHandler = async e => {
    e.preventDefault();

    if (!emailIsValid || !passwordIsValid) {
      emailIsTouched(true);
      passwordIsTouched(true);
      return;
    }

    setLoading(true);

    const data = await sendData('/api/login', { email, password });

    if (data.error) {
      setLoading(false);
      setToast(data.message);
      return;
    }

    setLoading(false);
    router.push('/dashboard');
  };

  const showPasswordHandler = () => {
    setShowPassword(prev => !prev);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };
  return (
    <Fragment>
      <Header />

      <main className={styles.main}>
        <section>
          <form onSubmit={loginHandler} className={`${styles.form} shadow`}>
            <div className="heading-5 text-center text-primary-dark">
              Welcome Back
            </div>
            <p className={styles.instruction}>
              Enter your credentials to access your account
            </p>
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                id="email"
                className={emailClasses}
                type="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className={passwordClasses}>
                <label>
                  <span className="icon small" onClick={showPasswordHandler}>
                    {showPassword ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )}
                  </span>
                  <input
                    value={password}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    id="password"
                    className="input-field "
                    type={showPassword ? 'text' : 'password'}
                  />
                </label>
              </div>
            </div>

            <button type="submit" className="btn primary">
              Login
            </button>
          </form>

          <p className={styles.switchMsg}>
            Already a member?{' '}
            <Link href="/signup" passHref>
              <span className={styles.switchMethod}>Signup here</span>
            </Link>
          </p>
        </section>
        <section>
          <img className="img-responsive" src="/login.png" alt="login" />
        </section>
      </main>

      {loading && <LoadingSpinner />}
      {toast && (
        <div className="toast danger">
          <span className="icon small white">
            <i className="fas fa-exclamation-circle"></i>
          </span>
          {` ${toast}`}
        </div>
      )}
    </Fragment>
  );
};

export const getServerSideProps = withSessionSsr(withUser);

export default Login;
