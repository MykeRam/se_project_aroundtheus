const initialCards = [
{
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
},
{
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
},
{
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
},
{
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
},
{
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
},
{
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
},
];

const cardTemplate = document.querySelector("#card-template").content.firstElementChild;


//Wrappers
const cardListEl = document.querySelector('.cards__list');
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector('.modal__form');
const addCardFormElement = addCardModal.querySelector('.modal__form');


//Buttons and other DOM nodes
const profileEditbtn = document.querySelector("#profile-edit-button");
const profileModalCloseBtn = profileEditModal.querySelector('.modal__close');
const addCardModalCloseBtn = addCardModal.querySelector('.modal__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addNewCardButton = document.querySelector('.profile__add-button');



//Form data
const profileTitleInput = document.querySelector(".modal__input_type_name");
const profileDescriptionInput = document.querySelector(".modal__input_type_description");

const cardTitleInput = addCardFormElement.querySelector('.modal__input_type_title');
const cardUrlInput = addCardFormElement.querySelector('.modal__input_type_url');


/* functions */
function closePopup(modal) {
    modal.classList.remove("modal_opened");
}

function openModal(modal) {
    modal.classList.add("modal_opened");
}


function getCardElement(cardData) {
const cardElement = cardTemplate.cloneNode(true);
const cardImageEl = cardElement.querySelector('.card__image');
const cardTitleEl = cardElement.querySelector('.card__title');
const likeButton = cardElement.querySelector('.card__like-button');
const deleteButton = cardElement.querySelector('.card__delete-button');




likeButton.addEventListener("click", () => {
    likeButton.classList.toggle('card__like-button_active');
    });

deleteButton.addEventListener("click", () => {
    cardElement.remove();
    });


cardTitleEl.textContent = cardData.name;
cardImageEl.src = cardData.link;
cardImageEl.alt = cardData.name;
return cardElement;
}

function renderCard(cardData, wrapper) {
    const cardElement = getCardElement(cardData);
    wrapper.prepend(cardElement);

}



/* Event Handlers */
function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(profileEditModal);
}


function handleAddCardFormSubmit(e) {
    e.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
    closePopup(addCardModal);
}


//Form listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);


/*Event Listeners */

profileEditbtn.addEventListener('click', () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileEditModal.classList.add("modal_opened")
});


profileModalCloseBtn.addEventListener('click', () => closePopup(profileEditModal));
profileEditbtn.addEventListener('click', () => openModal(profileEditForm));
// add new card button
addNewCardButton.addEventListener('click', () => openModal(addCardModal));
addCardModalCloseBtn.addEventListener('click', () => closePopup(addCardModal));


initialCards.forEach ((cardData) => renderCard(cardData, cardListEl));

