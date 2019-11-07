/* eslint-disable linebreak-style */
/* eslint-disable brace-style */
/* eslint-disable arrow-parens */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable lines-between-class-members */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */
const cardContainer = document.querySelector('.places-list');
const saveProfileButton = document.querySelector('.popup__button_save_profile');
const popupButton = document.querySelector('.user-info__button');
const popupOpenProfileButton = document.querySelector('.user-info_profile');
const savePlaceButton = document.querySelector('.popup__button');
const placeForm = document.forms.new;
const placeName = placeForm.elements.placeName;
const placeLink = placeForm.elements.link;
const authorName = document.querySelector('.user-info__name');
const authorJob = document.querySelector('.user-info__job');
const profileForm = document.forms.profile;
const profileAuthorName = profileForm.elements.name;
const profileAuthorJob = profileForm.elements.job;
const popup = document.querySelector('.popup');
const popupAvatar = document.querySelector('.popup_avatar');
const popupProfile = document.querySelector('.popup_profile');
const token = 'b2bd7464-a835-4f04-b8ac-13db5545ebd0';

let cardList;

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  postPlace(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${token}`,

        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        link: link.value,
      }),
    })

      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка1: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  patchProfile() {
    fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: profileAuthorName.value,
        about: profileAuthorJob.value,
      }),
    })

      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  patchAvatar(linkAvatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: linkAvatar,

      }),
    })

      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getProphile() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, переходим в catch
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }


  deleteCard(_id) {
    fetch(`${this.baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })

      .catch((err) => {
        console.log(err);
      });
  }
  putLike(_id) {
    fetch(`${this.baseUrl}/cards/like/${_id}`, {
      method: 'PUT',
      headers: {
        authorization: `${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })

      .catch((err) => {
        console.log(err);
      });
  }
  deleteLike(_id) {
    fetch(`${this.baseUrl}/cards/like/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })

      .catch((err) => {
        console.log(err);
      });
  }
  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })

      .catch((err) => {
        console.log(err);
      });
  }
}


const api = new Api({
  baseUrl: 'http://95.216.175.5/cohort3',
  headers: {
    authorization: `${token}`,

    'Content-Type': 'application/json',
  },
});

api.getCards().then((cards) => { cardList = new CardList(cardContainer, cards); });

api.getProphile().then((res) => {
  authorName.textContent = res.name;
  authorJob.textContent = res.about;
  document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`;
});
const myID = 'ba779b70717b07ad9c49ec5f';
class Card {
  constructor(cardName, cardImage, likes, cardID, idOwner, liked) {
    this.liked = liked;
    this.cardElement = this.createCard(cardName, cardImage, likes, cardID, idOwner, liked);
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.cardElement.querySelector('.place-card__image').addEventListener('click', this.openImage);
  }
  createCard(cardName, cardImage, likes, cardID, idOwner, liked) {
    const card = document.createElement('div');
    card.classList.add('place-card');
    card.setAttribute('id', `${cardID}`);

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('place-card__name');
    cardTitle.textContent = cardName;

    const cardImg = document.createElement('div');
    cardImg.classList.add('place-card__image');
    cardImg.style.backgroundImage = `url(${cardImage})`;

    const deleteIcon = document.createElement('button');
    deleteIcon.classList.add('place-card__delete-icon');
    if (idOwner !== myID) {
      deleteIcon.classList.add('notvisible');
    }
    const likePlace = document.createElement('div');
    likePlace.classList.add('place-card__like-place');
    const likeIcon = document.createElement('button');

    likeIcon.classList.add('place-card__like-icon');
    if (liked) {
      likeIcon.classList.add('place-card__like-icon_liked');
    }
    const likeNumber = document.createElement('p');
    likeNumber.classList.add('place-card__like-number');
    likeNumber.textContent = `${likes}`;
    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card__description');
    placeCard.appendChild(cardTitle);
    placeCard.appendChild(likePlace);
    likePlace.appendChild(likeIcon);
    likePlace.appendChild(likeNumber);
    cardImg.appendChild(deleteIcon);
    card.appendChild(cardImg);
    card.appendChild(placeCard);
    return card;
  }

  like(event) {
    if (this.liked) {
      api.putLike(event.target.parentElement.parentElement.parentElement.id);
      let numbLike = Number(event.target.parentElement.parentElement.parentElement.querySelector('.place-card__like-number').textContent);
      numbLike += 1;
      event.target.parentElement.parentElement.parentElement.querySelector('.place-card__like-number').textContent = numbLike;
      event.target.classList.add('place-card__like-icon_liked');
      this.liked = false;
    } else {
      api.deleteLike(event.target.parentElement.parentElement.parentElement.id);
      let numbLike = Number(event.target.parentElement.parentElement.parentElement.querySelector('.place-card__like-number').textContent);
      numbLike -= 1;
      event.target.parentElement.parentElement.parentElement.querySelector('.place-card__like-number').textContent = numbLike;
      event.target.classList.remove('place-card__like-icon_liked');
      this.liked = true;
    }
  }
  remove(event) {
    event.stopPropagation();
    if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
      const card = event.target.parentElement.parentElement;
      card.parentElement.removeChild(card);
      api.deleteCard(event.target.parentElement.parentElement.id);
    }
    else return false;
  }
  openImage(event) {
    document.querySelector('.image').classList.add('image_open');
    const src = event.target.style.backgroundImage.substr(4).substr(0, event.target.style.backgroundImage.length);
    document.querySelector('.image_src').src = src.substr(1, src.length - 3);
  }
}

class CardList {
  constructor(container, initialCards) {
    this.container = container;
    this.initialCards = initialCards;
    this.render(initialCards);
    // массивы принято называть во множественном числе
    // внутри методов лучше использовать поля класса
    // this.initialCards
    // render лучше выполнять внутри конструктора класса без передачи параметров
  }

  addCard(name, link, likes, cardID, idOwner, liked) {
    const { cardElement } = new Card(name, link, likes, cardID, idOwner, liked);
    this.container.appendChild(cardElement);
  }
  render(initialCards) {
    initialCards.forEach((card) => this.addCard(card.name, card.link, card.likes.length, card._id, card.owner._id, true));
  }
}
class Popup {
  constructor(popupElement) {
    this.popupElement = popupElement;
  }
  open() {
    this.popupElement.classList.add('popup_is-opened');
  }
  close() {
    this.popupElement.classList.remove('popup_is-opened');
    this.popupElement.querySelector('.error_valid').textContent = '';
    this.popupElement.querySelector('.a').textContent = ''; // убираем сообщение об ошибке у второго ввода
  }
}

class Validate {
  constructor(button, popuptype) {
    this.button = button;
    this.popuptype = popuptype;
  }
  buttonIsValid() {
    this.button.removeAttribute('disabled');
    this.button.classList.add('popup__button_save_profile__valid');
  }
  buttonIsNotValid() {
    this.button.setAttribute('disabled', true);
    this.button.classList.remove('popup__button_save_profile__valid');
  }


  handleValidate(event) {
    this.buttonValidate();
    if (event.target.value.length === 0) {
      this.popuptype.querySelector(`#error-${event.target.name}`).textContent = 'Это обязательное поле';
      return false;
    }
    if ((event.target.value.length < 2 || event.target.value.length > 30) && event.target.name !== 'link') {
      this.popuptype.querySelector(`#error-${event.target.name}`).textContent = 'Должно быть от 2 до 30 символов';
      return false;
    }

    if (event.target.name === 'link' && !event.target.value.startsWith('https://')) {
      this.popuptype.querySelector(`#error-${event.target.name}`).textContent = 'Здесь должна быть ссылка';
      return false;
    }
    this.popuptype.querySelector(`#error-${event.target.name}`).textContent = '';
    return true;
  }
}
class ValidateProfile extends Validate {
  buttonValidate() {
    const form = document.forms.profile;
    const name = form.elements.name;
    const job = form.elements.job;
    if (name.value.length > 1 && name.value.length < 30 && job.value.length > 1 && job.value.length < 30) {
      this.buttonIsValid();
      return true;
    }
    this.buttonIsNotValid();
    return false;
  }
}
class ValidateNewCard extends Validate {
  buttonValidate() {
    const form = document.forms.new;
    const name = form.elements.placeName;
    const link = form.elements.link;
    if (name.value.length > 1 && name.value.length < 30 && link.value.length > 1 && link.value.startsWith('https://')) {
      this.buttonIsValid();
      return true;
    }
    this.buttonIsNotValid();
    return false;
  }
}


const popupPlace = new Popup(popup);
const popupProf = new Popup(popupProfile);
const popupAva = new Popup(popupAvatar);
const profileValidate = new ValidateProfile(saveProfileButton, popupProfile);
const placeValidate = new ValidateNewCard(savePlaceButton, popup);


function changeProfile(event) {
  event.preventDefault();
  const form = document.forms.profile;
  const name = form.elements.name;
  const job = form.elements.job;
  authorName.textContent = name.value;
  authorJob.textContent = job.value;
  popupProf.close();
  api.patchProfile();
}

document.querySelector('.image_close_button').addEventListener('click', () => {
  document.querySelector('.image').classList.remove('image_open');
});
popupButton.addEventListener('click', () => {
  popupPlace.open();
});

document.querySelector('.popup__close').addEventListener('click', () => {
  popupPlace.close();
  placeForm.reset();
  placeValidate.buttonIsNotValid();
});

popupOpenProfileButton.addEventListener('click', () => {
  popupProf.open();
  const form = document.forms.profile;
  const name = form.elements.name;
  const job = form.elements.job;
  name.value = authorName.textContent;
  job.value = authorJob.textContent;
  profileValidate.buttonValidate();
});
document.querySelector('.popup__close-profile').addEventListener('click', () => {
  popupProf.close();
  profileForm.reset();
});
document.querySelector('.user-info__photo').addEventListener('click', () => {
  popupAva.open();
});
document.querySelector('.popup__close-avatar').addEventListener('click', () => {
  popupAva.close();
});
document.querySelector('.popup__button_save_avatar').addEventListener('click', () => {
  event.preventDefault();
  const form = document.forms.avatar;
  const name = form.elements.avatarLink;
  api.patchAvatar(name.value).then(res => {
    document.querySelector('.user-info__photo').style.backgroundImage = `url(${res.avatar})`;
  });
  popupAva.close();
});
placeName.addEventListener('input', () => {
  placeValidate.handleValidate(event);
});
placeLink.addEventListener('input', () => {
  placeValidate.handleValidate(event);
});
profileAuthorName.addEventListener('input', () => {
  profileValidate.handleValidate(event);
});
profileAuthorJob.addEventListener('input', () => {
  profileValidate.handleValidate(event);
});

placeForm.addEventListener('submit', () => {
  event.preventDefault();
  api.postPlace(placeName, placeLink).then((result) => {
    cardList.addCard(result.name, result.link, 0, myID, liked);
  });
  popupPlace.close();
  placeValidate.buttonIsNotValid();
});
profileForm.addEventListener('submit', changeProfile);
