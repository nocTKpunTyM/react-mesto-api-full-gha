import React, { useState, useEffect } from 'react';

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";

import Register from './Register';
import Login from './Login';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/Api';
import * as auth from '../utils/Auth';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isError, setIsError] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [emailData, setEmailData] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    setEmailData('');
  }

  useEffect(() => {
    Promise.all([api.getPlaces(), api.getProfile()])
      .then(([cards, user]) => {
        setCards(cards);
        setCurrentUser(user)
      }
      )
      .catch(console.error)
  }, [])

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((user) => {
          setEmailData(user.data.email);
          setLoggedIn(true);
          navigate('/me');
        })
        .catch(console.error)
    }
    else {
      setLoggedIn(false);
    }
  }
  useEffect(() => {
    tokenCheck();
  }, [])

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  // ОТКРЫТИЕ ПОПАВОВ 
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  // Закрываем любой попап
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoPopupOpen(false);
  }

  // ФУНКЦИОНАЛ МЕСТ (КАРТОЧЕК)
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLike(card, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error)
  }

  function handleCardDelete(card) {
    api.delPlace(card._id)
      .then((place) => {
        setCards(cards.filter((place) => place._id !== card._id));
      })
      .catch(console.error)
  }

  // ЗАПРОС АПИ С ИЗМЕНЕНИЕМ ПОЛЬЗОВАТЕЛЯ
  function handleApiWhithUser(name, about) {
    setIsLoading(true);
    api.changeProfile(name, about)
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.changeAvatar(avatar)
      .then(setCurrentUser)
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }


  function handleAddPlaceSubmit(place) {
    setIsLoading(true);
    api.putPlace(place)
      .then((place) => {
        setCards([place, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function toAuthRegister({ email, password }) {
    auth.register({ email, password })
      .then(() => {
        acceptInfoTooltip();
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        denyInfoTooltip();
        console.log(err);
      });
  }

  function toAuthLogin({ email, password }) {
    auth.authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          tokenCheck();
          navigate('/me');
        }
      })
      .catch(console.error);
  }

  function acceptInfoTooltip() {
    setIsError(false);
    setInfoPopupOpen(true);
  }

  function denyInfoTooltip() {
    setIsError(true);
    setInfoPopupOpen(true);
  }

  return (
    <div className="page">
      <AppContext.Provider value={{ isLoading, closeAllPopups }}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            emailData={emailData}
            tokenCheck={tokenCheck}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route path="/" element={loggedIn ? <Navigate to="/me" replace /> : <Navigate to="/sign-in" replace />} />
            <Route path="/sign-up" element={<Register handleRegister={toAuthRegister} />} />
            <Route path="/sign-in" element={<Login handleLogin={toAuthLogin} />} />
            <Route path="/me"
              element={<ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                handleEditAvatarClick={handleEditAvatarClick}
                handleEditProfileClick={handleEditProfileClick}
                handleAddPlaceClick={handleAddPlaceClick}
                handleCardClick={handleCardClick}
              />}
            />
          </Routes>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleApiWhithUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} />
          <ImagePopup card={selectedCard} onClosePopup={closeAllPopups} />
          <InfoTooltip onClosePopup={closeAllPopups} isOpen={isInfoPopupOpen} isError={isError} />

          <Footer />
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  )
}

export default App;