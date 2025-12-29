// src/components/Card.js
export default class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.likes?.some((like) => (like._id || like) === currentUserId);
    this._ownerId = data.owner?._id || data.owner;
    this._userId = currentUserId;

    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked)
        .then((updatedCard) => {
          this._isLiked = updatedCard.likes?.some(
  (like) => (like._id || like) === this._userId
);
          this._renderLikeState();
        })
        .catch((err) => console.error("Like error:", err));
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this._id);
      });
    }

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._link, this._name);
    });
  }

  _renderLikeState() {
    this._likeButton.classList.toggle(
      "card__like-button_active",
      this._isLiked
    );
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    if (this._ownerId !== this._userId && this._deleteButton) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    this._renderLikeState();
    this._setEventListeners();

    return this._element;
  }
}