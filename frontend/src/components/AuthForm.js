import { Link } from 'react-router-dom';
function AuthForm({ name, title, submitText, isValid, onSubmit, children }) {
    return (
        <main className="main">
            <section className="lead lead_center">
                <form name={name} className="form-reg" onSubmit={onSubmit} noValidate>
                    <h2 className="form-reg__title">{title}</h2>
                    {children}
                    <button
                        type="submit"
                        className={`button form-reg_submit ${!isValid && "form-reg_submit_inactive"}`}
                        disabled={!isValid}
                    >
                        {submitText}
                    </button>
                    {name == 'register' && (
                        <p className="form-reg__paragraph">
                            Уже зарегистрированы?
                            <Link to="/sign-in" className="link link_white button"> Войти</Link>
                        </p>
                    )}
                </form>
            </section>
        </main >
    );
}

export default AuthForm;