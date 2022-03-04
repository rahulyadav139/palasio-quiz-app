import styles from './LoadingSpinner.module.css';

const LoadingSpinner = props => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.spinner}></div>
    </div>
  );
};
export default LoadingSpinner;
