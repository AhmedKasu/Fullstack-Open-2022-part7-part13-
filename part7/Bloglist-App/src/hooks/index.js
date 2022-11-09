import { useState } from 'react';

const useField = (type, placeholder) => {
  const [value, setVAlue] = useState('');

  const onChange = (event) => {
    setVAlue(event.target.value);
  };
  const reset = () => {
    setVAlue('');
  };
  return {
    setters: { type, value, onChange },
    resetter: { reset },
  };
};

export default useField;
