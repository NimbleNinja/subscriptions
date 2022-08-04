import CategoryItem from './components/CategoryItem';
import CategoryItemWithThemes from './components/CategoryItemWithThemes';
import './styles/App.scss';
import { useDispatch, useSelector } from 'react-redux';
import DetailsModal from './components/DetailsModal';
import { setDefault, showConfirmModal } from './store';
import ConfirmModal from './components/ConfirmModal';

function App() {
  const dispatch = useDispatch();
  const categoriesList = useSelector(state => state.categories.items);
  const detailsModalStatus = useSelector(state => state.categories.detailsModalStatus);
  const confirmModalStatus = useSelector(state => state.categories.confirmModalStatus);

  return (
    <>
      {detailsModalStatus ? <DetailsModal /> : null}
      {confirmModalStatus ? <ConfirmModal /> : null}
      <section className="app">
        <div className="container">
          <h1 className="app__title">Управление рассылками</h1>
          <p className="app__description">
            Здравствуйте, Андрей. Выберите, категории писем, от которых хотите отписаться. Но
            пожалуйста, исключите только те категории, которые действительно вас не интересуют. Мы
            обещаем слать только полезные письма где 😊
          </p>
          <div className="app__categories categories">
            {categoriesList.map(({ id: categoryId, name, items, subCategories }) => {
              return (
                <div key={categoryId} className="categories__item category">
                  <div className="category__title">{name}</div>
                  <ul className="category__items">
                    {items.map(
                      ({
                        id: categoryItemId,
                        name,
                        checked,
                        description,
                        selectValue,
                        tooltip,
                      }) => {
                        return (
                          <CategoryItem
                            categoryId={categoryId}
                            key={categoryItemId}
                            id={categoryItemId}
                            name={name}
                            checked={checked}
                            description={description}
                            selectValue={selectValue}
                            tooltip={tooltip}
                          />
                        );
                      },
                    )}
                  </ul>
                  {subCategories ? (
                    <div className="category__subcategories">
                      {subCategories.map(({ id: subcategoryId, name, items }) => {
                        return (
                          <div key={subcategoryId} className="category__subcategory subcategory">
                            <div className="subcategory__title">{name}</div>
                            <ul className="subcategory__items">
                              {items.map(
                                ({
                                  id: itemId,
                                  name,
                                  checked,
                                  selectValue,
                                  tags,
                                  description,
                                  tooltip,
                                }) => {
                                  if (tags) {
                                    return (
                                      <CategoryItemWithThemes
                                        key={itemId}
                                        id={itemId}
                                        categoryId={categoryId}
                                        subcategoryId={subcategoryId}
                                        name={name}
                                        tags={tags}
                                        checked={checked}
                                        description={description}
                                      />
                                    );
                                  } else {
                                    return (
                                      <CategoryItem
                                        key={itemId}
                                        id={itemId}
                                        categoryId={categoryId}
                                        subcategoryId={subcategoryId}
                                        name={name}
                                        checked={checked}
                                        description={description}
                                        selectValue={selectValue}
                                        tooltip={tooltip}
                                      />
                                    );
                                  }
                                },
                              )}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="app__buttons">
            <button onClick={() => dispatch(setDefault())} className="app__default-btn btn">
              По умолчанию
            </button>
            <button onClick={() => dispatch(showConfirmModal())} className="app__save-btn btn">
              Сохранить изменения
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
