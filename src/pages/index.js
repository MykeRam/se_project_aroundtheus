import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForms from "../components/PopupWithForms.js";
import UserInfo from "../components/UserInfo.js";

import { validationConfig } from "../utils/constants.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2c4a817-f1b5-4b76-9c1b-aeec907bc5b2",
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

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
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
  .catch((err) => console.error(err));


/* -------------------- Popups With Forms -------------------- */
const profilePopup = new PopupWithForms("#profile-edit-modal", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.title,       
    job: inputValues.description,    
  });

  formValidators["profile-form"].disableSubmitButton();
});

profilePopup.setEventListeners();

const addCardPopup = new PopupWithForms("#add-card-modal", (inputValues) => {
  const cardElement = createCard({
    name: inputValues.title,
    link: inputValues.url,
  });

  cardSection.addItem(cardElement);
  formValidators["card-form"].disableSubmitButton();
});
addCardPopup.setEventListeners();

/* -------------------- Buttons -------------------- */
const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

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