import Popup from "./Popup.js";

export default class PopupWithForms extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector(".modal__form");
    this._inputList = Array.from(this._form.querySelectorAll(".modal__input"));

    this._submitButton = this._form.querySelector(".modal__button");
    this._defaultButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
  super.setEventListeners();

  this._form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  });
}

renderLoading(isLoading, loadingText = "Saving...") {
  this._submitButton.textContent = isLoading
    ? loadingText
    : this._defaultButtonText;
}

  close() {
    super.close();
    this._form.reset();
  }
}
