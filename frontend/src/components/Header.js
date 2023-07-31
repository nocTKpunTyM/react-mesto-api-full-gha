import headerLogo from '../images/header-logo.svg';
import { Link, useNavigate } from 'react-router-dom';

function Header({ emailData, tokenCheck, handleLogout }) {

  const navigate = useNavigate();
  const path = window.location.pathname;
  function logOut() {
    localStorage.removeItem('token');
    handleLogout();
    tokenCheck();
    navigate('/sign-in');
  }

  const getContent = () => {
    if (emailData) {
      return <><p>{emailData}</p> <p className="link link_white button" onClick={logOut}>Выйти</p></>;
    } else if (path == '/sign-in') {
      return <Link to="/sign-up" className="link link_white button">Регистрация</Link>;
    } else {
      return <Link to="/sign-in" className="link link_white button">Войти</Link>;
    }
  }

  return (
    <header className="header">
      <Link to="/me"><img src={headerLogo} alt="Проект Место" className="header__logo" /></Link>
      <div className="header__menu">
        {getContent()}
      </div>
    </header>
  );
}

export default Header;