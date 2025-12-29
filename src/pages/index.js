import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForms.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import { validationConfig } from "../utils/constants.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a3eb5cba-124c-47ee-af00-efa63d1e94e7",
    "Content-Type": "application/json",
  },
});

/* -------------------- Validators -------------------- */
const formValidators = {};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(validationConfig);

/* -------------------- User Info -------------------- */
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

/* -------------------- Image Preview Popup -------------------- */
const imagePopup = new PopupWithImage("#modal_type-preview");
imagePopup.setEventListeners();

/* -------------------- Card Section -------------------- */
function handleCardClick(link, name) {
  imagePopup.open({ name, link });
}

const deleteConfirmPopup = new PopupWithConfirmation("#delete-confirm-modal");
deleteConfirmPopup.setEventListeners();

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    (cardId, isLiked) => {
      return isLiked ? api.dislikeCard(cardId) : api.likeCard(cardId);
    },
    (cardId) => {
      deleteConfirmPopup.open();

      deleteConfirmPopup.setSubmitAction(() => {
        api.deleteCard(cardId)
          .then(() => {
            card.removeCard();
            deleteConfirmPopup.close();
          })
          .catch((err) => console.error("Delete error:", err));
      });
    }
  );

  return card.generateCard();
}

const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

api.getAppInfo()
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });

    userInfo.setUserAvatar(userData.avatar);
    cardSection.renderItems(cards);
  })
  .catch((err) => console.error("APP INFO ERROR:", err));


/* -------------------- Popups With Forms -------------------- */
const profilePopup = new PopupWithForms("#profile-edit-modal", (inputValues) => {
  profilePopup.renderLoading(true);

  api.updateUserInfo({
    name: inputValues.title,
    about: inputValues.description,
  })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });
      profilePopup.close();
      formValidators["profile-form"].disableSubmitButton();
    })
    .catch((err) => console.error("Profile update error:", err))
    .finally(() => {
      profilePopup.renderLoading(false);
    });
});

profilePopup.setEventListeners();

const addCardPopup = new PopupWithForms("#add-card-modal", (inputValues) => {
  addCardPopup.renderLoading(true);

  api.addCard({
    name: inputValues.title,
    link: inputValues.url,
  })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
      addCardPopup.close();
      formValidators["card-form"].disableSubmitButton();
    })
    .catch((err) => console.error("Add card error:", err))
    .finally(() => addCardPopup.renderLoading(false));
});

addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForms("#avatar-edit-modal", (inputValues) => {
  avatarPopup.renderLoading(true);

  api.updateAvatar({ avatar: inputValues.avatar })
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      avatarPopup.close();
      formValidators["avatar-form"].disableSubmitButton();
    })
    .catch((err) => console.error("Avatar update error:", err))
    .finally(() => avatarPopup.renderLoading(false));
});

avatarPopup.setEventListeners();

/* -------------------- Buttons -------------------- */
const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__avatar-edit");

avatarEditButton.addEventListener("click", () => {
  formValidators["avatar-form"].resetValidation();
  avatarPopup.open();
});

profileEditBtn.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();

  const profileForm = document.querySelector("#profile-edit-modal .modal__form");
  profileForm.querySelector(".modal__input_type_name").value = currentUser.name;
  profileForm.querySelector(".modal__input_type_description").value =
    currentUser.job;

  formValidators["profile-form"].resetValidation();
  profilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  formValidators["card-form"].resetValidation();
  addCardPopup.open();
});