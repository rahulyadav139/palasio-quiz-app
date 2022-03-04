import styles from './Modal.module.css';
import { Fragment } from 'react';

const Modal = props => {
  return (
    <Fragment>
      <div className="modal shadow">
        <h3>Reset Password</h3>
        <p>Enter the email address you used when you created your account.</p>
        <input
          className="input-field"
          placeholder="Email address"
          type="text"
        />
        <button className="btn primary">Continue</button>
        <button
          onClick={props.onHide}
          type="button"
          className="btn-modal-dismiss medium btn icon"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div onClick={props.onHide} className="modal-backdrop"></div>
    </Fragment>
  );
};
export default Modal;
