import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeConfirmModal, saveChangesWithToast } from '../store';

const ConfirmModal = () => {
  const dispatch = useDispatch();

  const confirmStatus = useSelector(state => state.categories.confirmStatus);

  return (
    <div className="modal">
      <div className="modal">
        <div className="modal__content">
          {confirmStatus ? (
            <div className="modal__toast-container">
              <div className="modal__toast-content">Изменения успешно сохранены ✅</div>
            </div>
          ) : (
            <>
              <div className="modal__title">Вы уверены?</div>
              <div className="modal__buttons">
                <button onClick={() => dispatch(closeConfirmModal())} className="modal__btn btn">
                  Отменить
                </button>
                <button onClick={() => dispatch(saveChangesWithToast())} className="modal__btn btn">
                  Сохранить
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
