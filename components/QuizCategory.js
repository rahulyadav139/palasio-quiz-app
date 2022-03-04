import styles from './QuizCategory.module.css';
import Link from 'next/link';
import { textFormatter } from '../utils/formatter';

const QuizCategory = props => {
  return (
    <Link href={`/${props.title}`} passHref>
      <div className={styles.category}>
        <img className="img-responsive" src={props.image} alt={props.title} />
        <h3 className={`${styles.title} heading-6`}>
          {textFormatter(props.title)}
        </h3>
      </div>
    </Link>
  );
};
export default QuizCategory;
