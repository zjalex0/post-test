import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '@styles/_modal.scss';

export const Modal = ({ children, show, onClose }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (show) {
      if (!document.getElementsByClassName('visible').length) {
        modalRef.current.classList.add('visible');
      }
    } else {
      modalRef.current.classList.remove('visible');
    }
  }, [show]);
  return (
    <div ref={modalRef} className={`modal__wrap`}>
      <div className={'modal'}>
        {children}
        <div className="row display-flex mt-30" justify-content="flex-end">
          <button onClick={onClose} className={'danger'}>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any
};
