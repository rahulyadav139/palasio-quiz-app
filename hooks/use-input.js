import { useState } from 'react';

export const useInput = validFun => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validFun(value);

  const isInvalid = !validFun(value) && isTouched;

  const inputChangeHandler = e => {
    setValue(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  return {
    value,
    setIsTouched,
    isValid,
    isInvalid,
    inputChangeHandler,
    inputBlurHandler,
  };
};
