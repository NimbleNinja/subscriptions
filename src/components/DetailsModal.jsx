import React from 'react';
import { useDispatch } from 'react-redux';
import { closeDetailsModal } from '../store';
import '../styles/modal.scss';

const DetailsModal = () => {
  const dispatch = useDispatch();
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__title">Details</div>
        <p className="modal__text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam minus quibusdam maxime
          odit inventore cum assumenda quia similique deleniti provident error molestiae cumque
          magni quaerat, tempora neque obcaecati a. Voluptate.
        </p>
        <button onClick={() => dispatch(closeDetailsModal())} className="modal__btn btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailsModal;
