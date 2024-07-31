import React from 'react';


const ErrorModal = ({closeModal,message}) => {
    

  return (
    <div>
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>ALert</h2>
                <strong>{message}</strong>
            </div>
        </div>
    </div>
  );
};

export default ErrorModal;
