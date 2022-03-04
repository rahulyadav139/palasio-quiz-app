import { Fragment, useState, useEffect } from 'react';
import styles from './ResetPassword.module.css';
import { useInput } from '../hooks/use-input';
import LoadingSpinner from './ui/LoadingSpinner';
import { useFetch } from '../hooks/use-fetch';

const ResetPassword = props => {
  const [loading, setLoading] = useState(false);
  const [errorToast, setErrorToast] = useState(null);
  const [successToast, setSuccessToast] = useState(null);
  const [resetPassword, setResetPassword] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);
  const { sendData } = useFetch();

  useEffect(() => {
    const clearToastTimer = setTimeout(() => {
      setErrorToast(false);
      setSuccessToast(false);
    }, 2000);
    return () => clearTimeout(clearToastTimer);
  }, [errorToast, successToast]);
  const {
    value: oldPassword,
    setIsTouched: oldPasswordIsTouched,
    isValid: oldPasswordIsValid,
    isInvalid: oldPasswordIsInvalid,
    inputChangeHandler: oldPasswordChangeHandler,
    inputBlurHandler: oldPasswordBlurHandler,
  } = useInput(value => value.length !== 0);

  const {
    value: newPassword,
    setIsTouched: newPasswordIsTouched,
    isValid: newPasswordIsValid,
    isInvalid: newPasswordIsInvalid,
    inputChangeHandler: newPasswordChangeHandler,
    inputBlurHandler: newPasswordBlurHandler,
  } = useInput(value => value.length !== 0);

  const {
    value: confirmNewPassword,
    setIsTouched: confirmNewPasswordIsTouched,
    isValid: confirmNewPasswordIsValid,
    isInvalid: confirmNewPasswordIsInvalid,
    inputChangeHandler: confirmNewPasswordChangeHandler,
    inputBlurHandler: confirmNewPasswordBlurHandler,
  } = useInput(value => value.length !== 0);

  const correctClasses = 'input-field responsive';
  const incorrectClasses = 'input-field responsive error';

  const oldPasswordClasses = oldPasswordIsInvalid
    ? incorrectClasses
    : correctClasses;
  const newPasswordClasses = newPasswordIsInvalid
    ? incorrectClasses
    : correctClasses;
  const confirmNewPasswordClasses = confirmNewPasswordIsInvalid
    ? incorrectClasses
    : correctClasses;

  const resetToggleHandler = () => {
    setResetPassword(true);
  };

  const hideResetPasswordHandler = () => {
    setResetPassword(false);
  };

  const resetPasswordHandler = async e => {
    e.preventDefault();
    setPasswordIsInvalid(false);

    if (
      !oldPasswordIsValid ||
      !newPasswordIsValid ||
      !confirmNewPasswordIsValid
    ) {
      oldPasswordIsTouched(true);
      newPasswordIsTouched(true);
      confirmNewPasswordIsTouched(true);
      return;
    }

    if (
      !newPassword.match(/\w/g) ||
      !newPassword.match(/\d/g) ||
      !newPassword.match(/[A-Z]/g) ||
      !newPassword.length > 6
    ) {
      return setPasswordIsInvalid(true);
    }
    if (newPassword !== confirmNewPassword) {
      return setErrorToast('Password does not match');
    }

    setLoading(true);
    const data = await sendData('/api/profile', {
      userId: props.userId,
      oldPassword,
      newPassword,
      action: 'UPDATE-PASSWORD',
    });

    setLoading(false);

    if (data.error) {
      setErrorToast(data.message);
      return;
    }

    setSuccessToast(data.message);
    setResetPassword(false);
  };
  return (
    <Fragment>
      {!resetPassword && (
        <div
          onClick={resetToggleHandler}
          className={`${styles.head} text-bold text-primary-dark text-underline`}
        >
          Reset Password
        </div>
      )}

      {resetPassword && (
        <form onSubmit={resetPasswordHandler} className={styles.form}>
          <label htmlFor="old-password">Current Password</label>
          <input
            value={oldPassword}
            onChange={oldPasswordChangeHandler}
            onBlur={oldPasswordBlurHandler}
            id="old-password"
            className={oldPasswordClasses}
            type="password"
          />
          <label htmlFor="new-password">New Password</label>
          <input
            value={newPassword}
            onChange={newPasswordChangeHandler}
            onBlur={newPasswordBlurHandler}
            id="new-password"
            className={newPasswordClasses}
            type="password"
          />
          <label htmlFor="confirm-new-password">New Password</label>
          <input
            value={confirmNewPassword}
            onChange={confirmNewPasswordChangeHandler}
            onBlur={confirmNewPasswordBlurHandler}
            id="confirm-new-password"
            className={confirmNewPasswordClasses}
            type="password"
          />
          {passwordIsInvalid && (
            <p className={styles.invalidMsg}>
              Password should be at least 6 characters long, contains one
              capital letter, one small letter, one special character!
            </p>
          )}
          <div className="flex gap">
            <button type="submit" className="btn primary rounded-edge">
              Submit
            </button>
            <button
              onClick={hideResetPasswordHandler}
              type="button"
              className="btn primary outline rounded-edge"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {loading && <LoadingSpinner />}
      {errorToast && (
        <div className="toast danger">
          <span className="icon small white">
            <i className="fas fa-exclamation-circle"></i>
          </span>
          {` ${errorToast}`}
        </div>
      )}
      {successToast && (
        <div className="toast success">
          <span className="icon small white">
            <i className="fas fa-bell"></i>
          </span>
          {` ${successToast}`}
        </div>
      )}
    </Fragment>
  );
};
export default ResetPassword;
