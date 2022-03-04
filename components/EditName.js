import { Fragment, useState, useEffect } from 'react';
import styles from './EditName.module.css';
import { useInput } from '../hooks/use-input';
import { useFetch } from '../hooks/use-fetch';
import LoadingSpinner from './ui/LoadingSpinner';
import { textFormatter } from '../utils/formatter';
const EditName = props => {
  const [loading, setLoading] = useState(false);
  const [editName, setEditName] = useState(false);
  const [user, setUser] = useState(null);
  const { sendData } = useFetch();

  useEffect(() => {
    (async () => {
      const user = await sendData('/api/user', { userId: props.userId });

      setUser(user);
    })();
  }, []);
  const {
    value: firstName,
    setIsTouched: firstNameIsTouched,
    isValid: firstNameIsValid,
    isInvalid: firstNameIsInvalid,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(value => value.length !== 0);

  const {
    value: lastName,
    setIsTouched: lastNameIsTouched,
    isValid: lastNameIsValid,
    isInvalid: lastNameIsInvalid,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(value => value.length !== 0);

  const correctClasses = 'input-field responsive';
  const incorrectClasses = 'input-field responsive error';

  const firstNameClasses = firstNameIsInvalid
    ? incorrectClasses
    : correctClasses;
  const lastNameClasses = lastNameIsInvalid ? incorrectClasses : correctClasses;

  const editToggleHandler = () => {
    setEditName(true);
  };

  const hideEditNameHandler = () => {
    setEditName(false);
  };

  const updateNameHandler = async e => {
    e.preventDefault();

    if (!firstNameIsValid || !lastNameIsValid) {
      firstNameIsTouched(true);
      lastNameIsTouched(true);
      return;
    }

    setLoading(true);

    const data = await sendData('/api/profile', {
      userId: props.userId,
      fullName: `${textFormatter(firstName)} ${textFormatter(lastName)}`,
      action: 'UPDATE-NAME',
    });

    setLoading(false);
    setEditName(false);
  };
  return (
    <Fragment>
      {!editName && (
        <div className={`${styles.head} flex space-between align-center`}>
          <div>
            <h4>Name</h4>
            <h2>{user && user.fullName}</h2>
          </div>
          <div
            onClick={editToggleHandler}
            className={`${styles.btnLink} text-bold text-primary-dark text-underline`}
          >
            Edit
          </div>
        </div>
      )}

      {editName && (
        <form onSubmit={updateNameHandler} className={styles.form}>
          <label htmlFor="first-name">First Name</label>
          <input
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            id="first-name"
            className={firstNameClasses}
            type="type"
          />
          <label htmlFor="last-name">Last Name</label>
          <input
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            id="last-name"
            className={lastNameClasses}
            type="type"
          />

          <div className="flex gap">
            <button type="submit" className="btn primary rounded-edge">
              Submit
            </button>
            <button
              onClick={hideEditNameHandler}
              type="button"
              className="btn primary outline rounded-edge"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {loading && <LoadingSpinner />}
    </Fragment>
  );
};
export default EditName;
