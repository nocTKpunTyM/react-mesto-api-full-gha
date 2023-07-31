import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const { values, handleChange, errors, isValid, setValues } = useFormAndValidation();
  const user = useContext(CurrentUserContext);
  const popupContext = useContext(AppContext);
  const onClose = popupContext.closeAllPopups;
  const { isLoading } = popupContext;

  const popup = {
    isOpen: isOpen,
    isValid: isValid,
    isOnlyButton: false,
    name: 'edit-profile',
    title: 'Редактировать профиль'
  }
  isLoading ? popup.submitText = 'Сохраняем...' : popup.submitText = 'Сохранить';

  useEffect(() => {
    setValues(user);
  }, [user, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values.name, values.about);
  }

  return (
    <PopupWithForm
      popup={popup}
      onClosePopup={onClose}
      onSubmit={handleSubmit}>
      <div className="form__input-div">
        <input id="name-input"
          name="name"
          type="text"
          placeholder="Имя и фамилия"
          className="form__input form__input_type_name"
          minLength="2" maxLength="40"
          value={values.name || ''}
          onChange={handleChange}
          required />
        {!isValid && (
          <span className="title-input-error form__input-error">
            {errors.name}
          </span>
        )}
      </div>
      <div className="form__input-div">
        <input id="job-input"
          name="about" type="text"
          placeholder="Профессия"
          className="form__input form__input_type_job"
          minLength="2" maxLength="200"
          value={values.about || ''}
          onChange={handleChange}
          required />
        {!isValid && (
          <span className="title-input-error form__input-error">
            {errors.about}
          </span>
        )}
      </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;