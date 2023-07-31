import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({ popup, onClosePopup, onSubmit, children }) {
  usePopupClose(popup.isOpen, onClosePopup)
  return (
    <div className={`popup popup-${popup.name} ${popup.isOpen && "popup_opened"}`} >
      <div className={`popup__container ${popup.isOnlyButton && 'popup__container_only-button'}`}>
        <button type="button" className={`button button_close popup-${popup.name}__close`} onClick={onClosePopup}></button>
        <form name={popup.name} className={`form form-${popup.name} ${popup.isOnlyButton && 'form_only-button'}`} onSubmit={onSubmit} noValidate>
          <h2 className="form__title">{popup.title}</h2>
          {children}
          <button
            type="submit"
            className={`button button_submit ${!popup.isValid && "button_submit_inactive"}`}
            disabled={!popup.isValid}
          >
            {popup.submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;