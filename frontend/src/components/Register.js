import React, { useEffect } from 'react';
import Auth from './AuthForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function Register({ handleRegister }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  useEffect(() => {
    resetForm();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    handleRegister({ email, password });
  }

  return (
    <Auth
      name="register"
      title="Регистрация"
      submitText="Зарегистрироваться"
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <div className="form__input-div">
        <input
          name="email" type="email"
          placeholder="Email"
          className="form-reg__input"
          minLength="2"
          value={values.email || ''} onChange={handleChange}
          required
        />
        {!isValid && (
          <span className="title-input-error form__input-error">
            {errors.email}
          </span>
        )}
      </div>
      <div className="form__input-div">
        <input
          name="password" type="password"
          placeholder="Пароль"
          className="form-reg__input"
          minLength="2" maxLength="200"
          value={values.password || ''} onChange={handleChange}
          required
        />
        {!isValid && (
          <span className="title-input-error form__input-error">
            {errors.password}
          </span>
        )}
      </div>
    </Auth>
  )
}

export default Register; 