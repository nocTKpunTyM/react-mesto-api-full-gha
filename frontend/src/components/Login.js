import { useEffect } from 'react';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import Auth from './AuthForm';

function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  useEffect(() => {
    resetForm();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    handleLogin({ email, password });
  }

  return (
    <Auth
      name="login"
      title="Вход"
      submitText="Войти"
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <div className="form__input-div">
        <input
          name="email"
          type="email"
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

export default Login; 