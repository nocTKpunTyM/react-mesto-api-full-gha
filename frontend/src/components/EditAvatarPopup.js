import { useRef, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { AppContext } from '../contexts/AppContext';

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
    const inputRef = useRef();
    const popupContext = useContext(AppContext);
    const onClose = popupContext.closeAllPopups;
    const { isLoading } = popupContext;

    useEffect(() => {
        inputRef.current.value = '';
    }, [isOpen]);

    const popup = {
        isOpen: isOpen,
        isValid: true,
        isOnlyButton: false,
        name: 'change-avatar',
        title: 'Обновить аватар'
    }
    isLoading ? popup.submitText = 'Меняем...' : popup.submitText = 'Изменить';

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(inputRef.current.value);
    }

    return (
        <PopupWithForm
            popup={popup}
            onClosePopup={onClose}
            onSubmit={handleSubmit}>
            <input id="avatar-input"
                name="avatar"
                type="url"
                placeholder="Ссылка на аватар"
                className="form__input form__input_type_avatar"
                ref={inputRef} required />
            <span className="avatar-input-error form__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;