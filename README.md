# Around The U.S. – Interactive Photo Gallery

A responsive, interactive gallery where users can edit profile information, add new places as cards, like or delete cards, and view full-size image previews.  
This project demonstrates modular JavaScript, object-oriented programming, and real-time form validation using reusable classes.

---

## 🚀 Features

### 🖼️ Card Functionality

- Six initial cards rendered dynamically using JavaScript
- Add new cards via popup form
- Like/unlike cards
- Delete cards
- Click card images to open a full-screen preview modal

### 🧩 Popup Modals

- Smooth CSS-based open/close animations
- Close by:
  - Clicking the overlay
  - Clicking the close button
  - Pressing the ESC key
- Forms reset automatically after submission
- Validation resets when popup opens

### ✔️ Form Validation (OOP)

- Built using a reusable `FormValidator` class
- Uses HTML5 Validity API
- Dynamic error messages
- Submit button enables/disables based on form validity
- Validation resets on modal open

---

## 🛠️ Technologies Used

- **HTML5**
- **CSS3**
  - BEM methodology
  - Responsive design
  - Flexbox & Grid
- **JavaScript (ES6+)**
  - Classes
  - Modules (`import/export`)
  - DOM manipulation
- **Git / GitHub Pages**
- **Normalize.css**

---

## 📁 Project Structure

```
se_project_aroundtheus/
│
├── components/
│ ├── Card.js
│ └── FormValidator.js
│
├── pages/
│ ├── index.js
│ └── index.css
│
├── blocks/ → BEM CSS block files
├── vendor/ → fonts, normalize.css
├── images/ → project assets
│
├── index.html
├── .gitignore
├── .prettierignore
└── README.md
```

---

## 🌐 Live Demo (GitHub Pages)

https://mykeram.github.io/se_project_aroundtheus/

---

## 🎥 Project Video (Optional)

https://drive.google.com/file/d/1gw28P6PjBcZf5-zdGcl0D_wNzC6D21xg/view?usp=sharing

---

## ✨ Figma Design Reference

Original Sprint 3 layout:
https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1

```

```
