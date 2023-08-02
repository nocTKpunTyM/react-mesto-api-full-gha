import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onOpenCard, onCardLike, onCardDelete }) {
  const user = React.useContext(CurrentUserContext);
  const isOwn = card.owner === user._id;
  const isLiked = card.likes.some(i => i === user._id);
  const cardLikeButtonClassName = (
    `button button__like ${isLiked && 'button__like_active'}`
  );
  function handleClick() {
    onOpenCard(card);
  }
  function handleLike() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="place">
      {isOwn && <button type="button" className="button button__trash" onClick={handleDeleteClick} ></button>}
      <img src={card.link} alt={card.name} className="place__image" onClick={handleClick} />
      <div className="place__description">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-box">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLike}></button>
          <p className="place__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;