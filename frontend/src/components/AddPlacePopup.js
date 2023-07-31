import { useEffect, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, onAddPlace }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  const popupContext = useContext(AppContext);
  const onClose = popupContext.closeAllPopups;
  const { isLoading } = popupContext;

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  const popup = {
    isOpen: isOpen,
    isValid: isValid,
    isOnlyButton: false,
    name: 'add-place',
    title: 'Новое место'
  }
  isLoading ? popup.submitText = 'Добавление...' : popup.submitText = 'Добавить';

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.title,
      link: values.url
    });
  }

  return (
    <PopupWithForm
      popup={popup}
      onClosePopup={onClose}
      onSubmit={handleSubmit}>
      <div className="form__input-div">
        <input id="title-input"
          name="title"
          type="text"
          placeholder="Название"
          className="form__input form__input_type_title"
          minLength="2" maxLength="40"
          value={values.title || ''}
          onChange={handleChange}
          required />
        {!isValid && (
          <span className="title-input-error form__input-error">
            {errors.title}
          </span>
        )}
      </div>
      <div className="form__input-div">
        <input id="url-input"
          name="url"
          type="url"
          placeholder="Ссылка на картинку"
          className="form__input form__input_type_url"
          value={values.url || ''}
          onChange={handleChange}
          required />
        {!isValid && (
          <span className="title-input-error form__input-error">
            {errors.url}
          </span>
        )}
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;