import React from 'react';

const Select = ({ value, onChange }) => {
  return (
    <select onChange={onChange} className="category-item__select select" value={value}>
      <option value="Мгновенно">Мгновенно</option>
      <option value="1 раз в день">1 раз в день</option>
      <option value="Отключить">Отключить</option>
    </select>
  );
};

export default Select;
