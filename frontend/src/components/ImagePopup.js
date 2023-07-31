import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card, onClosePopup }) {
  usePopupClose(card._id, onClosePopup)
  return (
    <div className={`popup popup-img-big ${card._id && "popup_opened"}`} >
      <div className="popup-img-big__container">
        <button type="button" className="button button_close popup-big-image-close" onClick={onClosePopup} />
        <img src={card.link} alt={card.name} className="popup-img-big__image" />
        <p className="popup-img-big__image-subline">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;