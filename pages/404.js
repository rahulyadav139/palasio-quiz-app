import styles from '../styles/404.module.css';

const ErrorPage = props => {
  return (
    <div className={styles.wrapper}>
      <h1 className="heading-1 text-center text-primary-dark">
        Page Not Found!
      </h1>
    </div>
  );
};
export default ErrorPage;
