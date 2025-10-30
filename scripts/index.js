/* -------------------- Initial Cards -------------------- */
const initialCards = [
  { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" },
];

/* -------------------- DOM References -------------------- */
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");

// Profile
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditBtn = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

// Modals
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewModal = document.querySelector("#modal_type-preview");

// Modal buttons
const profileModalCloseBtn = profileEditModal.querySelector(".modal__close");
const addCardModalCloseBtn = addCardModal.querySelector(".modal__close");
const previewCloseBtn = previewModal.querySelector(".modal__close_preview");

// Modal forms
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

// Profile form inputs
const profileTitleInput = profileEditForm.querySelector(".modal__input_type_name");
const profileDescriptionInput = profileEditForm.querySelector(".modal__input_type_description");

// New Place form inputs
const cardTitleInput = addCardFormElement.querySelector(".modal__input_type_title");
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");
const addCardSubmitButton = addCardFormElement.querySelector(".modal__button");

// Preview modal elements
const previewImage = previewModal.querySelector(".card__image_preview");
const previewCaption = previewModal.querySelector(".modal__caption");

/* -------------------- Modal Functions -------------------- */
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(e) {
  if (e.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_opened");
    if (openedModal) closeModal(openedModal);
  }
}

function outsideClickClose(e) {
  if (e.currentTarget === e.target) {
    closeModal(e.target);
  }
}

/* -------------------- Card Functions -------------------- */
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => likeButton.classList.toggle("card__like-button_active"));
  deleteButton.addEventListener("click", () => cardElement.remove());
  cardImageEl.addEventListener("click", () => openPreviewModal(cardData.link, cardData.name));

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

function openPreviewModal(src, caption) {
  previewImage.src = src;
  previewImage.alt = caption;
  previewCaption.textContent = caption;
  openModal(previewModal);
}

/* -------------------- Render Initial Cards -------------------- */
initialCards.forEach(cardData => {
  cardListEl.append(getCardElement(cardData));
});

/* -------------------- Form Submit Handlers -------------------- */
profileEditForm.addEventListener("submit", e => {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
});

addCardFormElement.addEventListener("submit", e => {
  e.preventDefault();
  const cardElement = getCardElement({ name: cardTitleInput.value, link: cardUrlInput.value });
  cardListEl.prepend(cardElement);
  addCardFormElement.reset();
  toggleCardButton();
  closeModal(addCardModal);
});

/* -------------------- Event Listeners -------------------- */
// Open modals
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  toggleProfileButton();
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openModal(addCardModal));

// Close modals
profileModalCloseBtn.addEventListener("click", () => closeModal(profileEditModal));
addCardModalCloseBtn.addEventListener("click", () => closeModal(addCardModal));
previewCloseBtn.addEventListener("click", () => closeModal(previewModal));

// Close on outside click
[profileEditModal, addCardModal, previewModal].forEach(modal => modal.addEventListener("click", outsideClickClose));
