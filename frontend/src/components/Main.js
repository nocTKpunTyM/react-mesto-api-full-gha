import Card from './Card.js';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({
  userData,
  onCardLike,
  onCardDelete,
  cards,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleCardClick
}) {
  const user = React.useContext(CurrentUserContext);

  return (
    <main className="main">

      <section className="lead">
        <div className="lead__picture" style={{ backgroundImage: `url(${user.avatar})` }}></div>
        <button className="lead__picture-button" onClick={handleEditAvatarClick}></button>
        <div className="lead__profile">
          <div className="lead__profile-name">
            <h1 className="lead__title">{user.name}</h1>
            <button type="button" className="button lead__edit-button" onClick={handleEditProfileClick}></button>
          </div>
          <p className="lead__subtitle">{user.about}</p>
        </div>
        <button type="button" className="button lead__add-button" onClick={handleAddPlaceClick}></button>
      </section>

      <section className="places">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onOpenCard={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )
        })}
      </section>

    </main>
  );
}

export default Main;