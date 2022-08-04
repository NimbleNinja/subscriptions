import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteSubcategoryTheme, showDetailsModal, toggleCheckedStatus } from '../store';
import Checkbox from './Checkbox';

const CategoryItemWithThemes = ({
  id,
  categoryId,
  subcategoryId,
  name,
  tags,
  checked,
  description,
}) => {
  const dispatch = useDispatch();

  const changeHandler = id => {
    dispatch(toggleCheckedStatus({ categoryId, subcategoryId, itemId: id }));
  };

  const deleteThemeHandler = tag => {
    dispatch(deleteSubcategoryTheme({ categoryId, name: tag, subcategoryId, itemId: id }));
  };

  return (
    <div className="category__subcategory subcategory-item">
      <div className="subcategory-item__title">{name}</div>
      <div className="subcategory-item__content">
        <ul className="subcategory-item__tags">
          {tags.map(tag => {
            return (
              <li key={tag} className="subcategory-item__tag">
                {tag}
                <span onClick={() => deleteThemeHandler(tag)} className="subcategory-item__tag-btn">
                  +
                </span>
              </li>
            );
          })}
        </ul>
        <button onClick={() => dispatch(showDetailsModal())} className="subcategory-item__info">
          Детали
        </button>
        <div className="subcategory-item__checkbox">
          <Checkbox onChange={changeHandler} id={id} checked={checked} />
        </div>

        {description ? <div className="subcategory-item__description">{description}</div> : null}
      </div>
    </div>
  );
};

export default CategoryItemWithThemes;
