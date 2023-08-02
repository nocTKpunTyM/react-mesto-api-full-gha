import {checkResponse} from './checkResponse';

class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    /////////////////////// ЗАПРОС ДАННЫХ ПРОФИЛЯ //////////////////
    getProfile() {
        this.urlGet = this.baseUrl + '/users/me';
        return fetch(this.urlGet, {
            headers: this.headers
        })
            .then(checkResponse)
    }

    //----------------------- Изменение профиля ---------------//
    changeProfile(inputName, inputJob) {
        this.urlGet = this.baseUrl + '/users/me';
        return fetch(this.urlGet, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: inputName,
                about: inputJob
            })
        })
            .then(checkResponse)
    }

    //----------------------- Изменение аватарки ---------------//
    changeAvatar(inputAvatar) {
        this.urlGet = this.baseUrl + '/users/me/avatar';
        return fetch(this.urlGet, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: inputAvatar
            })
        })
            .then(checkResponse)
    }

    /////////////////////// ЗАПРОС КАРТОЧЕК //////////////////
    getPlaces() {
        this.urlGet = this.baseUrl + '/cards';
        return fetch(this.urlGet, {
            headers: this.headers
        })
            .then(checkResponse);
    }

    //----------------------- Добавление нового места -----------//
    putPlace(place) {
        this.urlGet = this.baseUrl + '/cards';
        return fetch(this.urlGet, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: place.name,
                link: place.link
            })
        })
            .then(checkResponse);
    }

    //----------------------- Удаление карточки места -----------//
    delPlace(cardId) {
        this.urlGet = this.baseUrl + '/cards/' + cardId;
        return fetch(this.urlGet, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(checkResponse);
    }

    ////////////////// ИЗМЕНИТЬ КОЛИЧЕСТВО ЛАЙКОВ ///////////////////
    changeLike(card, isLiked) {
        this.urlGet = this.baseUrl + '/cards/' + card._id + '/likes';
        if (!isLiked) {
            return fetch(this.urlGet, {
                method: 'PUT',
                headers: this.headers
            })
            .then(checkResponse);
        } else {
            return fetch(this.urlGet, {
                method: 'DELETE',
                headers: this.headers
            })
                .then(checkResponse)
        }
    }
}

export const api = new Api({
    baseUrl: 'https://noctkpuntym2.students.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});