const cardRightBtnsBackgroundChange = (removeBtn, editBtn, color) => {
  removeBtn.style.backgroundColor = color;
  editBtn.style.backgroundColor = color;
};

const cardRightBtnToggle = (removeBtn, editBtn, className) => {
  removeBtn.classList.toggle(className);
  editBtn.classList.toggle(className);
};

export { cardRightBtnsBackgroundChange, cardRightBtnToggle };
