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

console.log(initialCards);


const profileEditbtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseBtn = document.querySelector('.modal__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileTitleInput = document.querySelector('.modal__input-title');
const profileDescriptionInput = document.querySelector('.modal__input-description');
const profileEditForm = profileEditModal.querySelector('.modal__form');
const cardListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;


/* functions */
function closePopup() {
    profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
const cardElement = cardTemplate.cloneNode(true);
const cardImageEl = cardElement.querySelector('.card__image');
const cardTitleEl = cardElement.querySelector('.card__title');

cardTitleEl.textContent = cardData.name;
cardImageEl.src = cardData.link;
cardImageEl.alt = cardData.name;
return cardElement;
}

/* Event Handlers */
function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup();
}


/*Event Listeners */
profileEditbtn.addEventListener('click', () => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    profileEditModal.classList.add("modal_opened")
});


profileCloseBtn.addEventListener('click', closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);


initialCards.forEach((cardData) => {
const cardElement = getCardElement(cardData);
cardListEl.prepend(cardElement);

});

