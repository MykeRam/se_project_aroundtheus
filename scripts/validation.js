/* -------------------- Validation Helpers -------------------- */
function showError(input, message) {
  const errorEl = document.querySelector(`#${input.id}-error`);
  if (!errorEl) return;
  errorEl.textContent = message;
  input.classList.add("modal__input_type_error");
}

function hideError(input) {
  const errorEl = document.querySelector(`#${input.id}-error`);
  if (!errorEl) return;
  errorEl.textContent = "";
  input.classList.remove("modal__input_type_error");
}

function validateInput(input, rules) {
  if (!input.value.trim()) {
    showError(input, "This field is required");
    return false;
  }
  if (rules.minLength && input.value.length < rules.minLength) {
    showError(input, rules.errorMin || "Too short");
    return false;
  }
  if (rules.maxLength && input.value.length > rules.maxLength) {
    showError(input, rules.errorMax || "Too long");
    return false;
  }
  if (rules.isUrl && !input.validity.valid) {
    showError(input, rules.errorUrl || "Invalid URL");
    return false;
  }
  hideError(input);
  return true;
}

/* -------------------- Profile Validation -------------------- */
function toggleProfileButton() {
  const button = profileEditForm.querySelector(".modal__button");
  const isValid =
    validateInput(profileTitleInput, { minLength: 2, maxLength: 40, errorMin: "Name must be 2–40 characters" }) &&
    validateInput(profileDescriptionInput, { minLength: 2, maxLength: 200, errorMin: "About must be 2–200 characters" });

  button.disabled = !isValid;
  button.classList.toggle("modal__button_disabled", !isValid);
}

/* -------------------- Card Validation -------------------- */
function toggleCardButton() {
  const isValid =
    validateInput(cardTitleInput, { minLength: 2, maxLength: 40, errorMin: "Title must contain 2–40 characters" }) &&
    validateInput(cardUrlInput, { isUrl: true, errorUrl: "Please enter a web address" });

  addCardSubmitButton.disabled = !isValid;
  addCardSubmitButton.classList.toggle("modal__button_disabled", !isValid);
}

/* -------------------- Event Listeners for Validation -------------------- */
function initValidation() {
  [profileTitleInput, profileDescriptionInput].forEach(input =>
    input.addEventListener("input", toggleProfileButton)
  );

  [cardTitleInput, cardUrlInput].forEach(input =>
    input.addEventListener("input", toggleCardButton)
  );

  toggleProfileButton();
  toggleCardButton();
}

initValidation();
