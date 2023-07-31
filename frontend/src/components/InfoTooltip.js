import React from 'react';
import infoAcceptImg from '../images/info-accept.png';
import infoDenyImg from '../images/info-error.png'

function InfoTooltip({ onClosePopup, isOpen, isError }) {
  let infoImg = infoAcceptImg;
  if (isError) {
    infoImg = infoDenyImg;
  }

  return (
    <div className={`popup ${isOpen && "popup_opened"}`} >
      <div className="popup__container">
        <button type="button" className="button button_close" onClick={onClosePopup}></button>
        <div className="popup__info">
          <img src={infoImg} className="popup__info-img"></img>
          {isError ?
            <p className="popup__info-text">Что-то пошло не так! Попробуйте еще раз</p>
            :
            <p className="popup__info-text">Вы успешно зарегистрировались!</p>}
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;