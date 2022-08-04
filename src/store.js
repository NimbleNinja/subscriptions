import { configureStore, createSlice } from '@reduxjs/toolkit';
import { tempData } from './data';

const initialState = {
  detailsModalStatus: false,
  confirmModalStatus: false,
  confirmStatus: false,
  items: tempData,
};

const categoriesSlise = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    toggleCheckedStatus: (state, action) => {
      const { categoryId, itemId, subcategoryId } = action.payload;
      const category = state.items.find(({ id }) => id === categoryId);

      if (subcategoryId) {
        const subcategory = category.subCategories.find(({ id }) => id === subcategoryId);
        const subcategoryItem = subcategory.items.find(({ id }) => id === itemId);
        subcategoryItem.checked = !subcategoryItem.checked;
      } else {
        const item = category.items.find(({ id }) => id === itemId);
        item.checked = !item.checked;
      }
    },
    deleteSubcategoryTheme: (state, action) => {
      const { categoryId, name, subcategoryId, itemId } = action.payload;
      const category = state.items.find(({ id }) => id === categoryId);
      const subcategory = category.subCategories.find(({ id }) => id === subcategoryId);
      const subcategoryItem = subcategory.items.find(({ id }) => id === itemId);

      subcategoryItem.tags = subcategoryItem.tags.filter(theme => theme !== name);
    },
    setFrequencyValue: (state, action) => {
      const { selectValue, categoryId, subcategoryId, itemId } = action.payload;

      const category = state.items.find(({ id }) => id === categoryId);

      if (subcategoryId) {
        const subcategory = category.subCategories.find(({ id }) => id === subcategoryId);
        const subcategoryItem = subcategory.items.find(({ id }) => id === itemId);
        subcategoryItem.selectValue = selectValue;
      } else {
        const item = category.items.find(({ id }) => id === itemId);
        item.selectValue = selectValue;
      }
    },
    closeDetailsModal: state => {
      state.detailsModalStatus = false;
    },
    showDetailsModal: state => {
      state.detailsModalStatus = true;
    },
    setDefault: state => {
      state.items.forEach(category => {
        category.items.forEach(categoryItem => {
          if (categoryItem.selectValue) {
            categoryItem.selectValue = 'Мгновенно';
          }
          categoryItem.checked = true;
        });

        if (category.subCategories) {
          category.subCategories.forEach(subCategory => {
            subCategory.items.forEach(subCategoryItem => {
              subCategoryItem.checked = true;

              if (subCategoryItem.selectValue) {
                subCategoryItem.selectValue = 'Мгновенно';
              }
            });
          });
        }
      });
    },
    showConfirmModal: state => {
      state.confirmModalStatus = true;
    },
    closeConfirmModal: state => {
      state.confirmModalStatus = false;
    },
    setConfirmStatus: (state, action) => {
      state.confirmStatus = action.payload;
    },
  },
});

export const saveChangesWithToast = () => async dispatch => {
  dispatch(setConfirmStatus(true));

  const result = await new Promise(resolve => {
    setTimeout(() => {
      resolve(false);
    }, 3000);
  });

  dispatch(setConfirmStatus(result));
  dispatch(closeConfirmModal());
};

export const store = configureStore({
  reducer: {
    categories: categoriesSlise.reducer,
  },
});

export const {
  toggleCheckedStatus,
  deleteSubcategoryTheme,
  setFrequencyValue,
  closeDetailsModal,
  showDetailsModal,
  setDefault,
  showConfirmModal,
  closeConfirmModal,
  saveChanges,
  setConfirmStatus,
} = categoriesSlise.actions;
