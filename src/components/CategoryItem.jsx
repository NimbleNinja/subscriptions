import React from 'react';
import { useDispatch } from 'react-redux';
import { setFrequencyValue, toggleCheckedStatus } from '../store';
import Checkbox from './Checkbox';
import Select from './Select';

const CategoryItem = ({
  id,
  categoryId,
  subcategoryId,
  name,
  checked,
  description,
  selectValue,
  tooltip,
}) => {
  const dispatch = useDispatch();

  const inputHandler = id => {
    dispatch(toggleCheckedStatus({ categoryId, itemId: id, subcategoryId }));
  };

  const selectHandler = e => {
    const { value } = e.target;
    dispatch(setFrequencyValue({ selectValue: value, categoryId, subcategoryId, itemId: id }));
  };

  return (
    <li className="category__item category-item">
      <div className="category-item__container">
        <div className="category-item__title">
          {name}
          {tooltip ? (
            <div className="category-item__tooltip">
              <span className="category-item__tooltip-info">{tooltip}</span>
            </div>
          ) : null}
        </div>
        <Checkbox onChange={inputHandler} checked={checked} id={id} />
      </div>
      {description ? <div className="category-item__description">{description}</div> : null}
      {selectValue ? <Select onChange={selectHandler} value={selectValue} /> : null}
    </li>
  );
};

export default CategoryItem;
