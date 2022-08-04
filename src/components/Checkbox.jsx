import React from 'react';

const Checkbox = ({ id, checked, onChange }) => {
  return (
    <label className="checkbox" htmlFor={id}>
      <input onChange={() => onChange(id)} type="checkbox" id={id} checked={checked} />
      <span></span>
    </label>
  );
};

export default Checkbox;
