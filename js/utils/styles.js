import { getElem, getElems } from "./utils.js";

const cardRightBtnsBackgroundChange = (removeBtn, editBtn, color) => {
  removeBtn.style.backgroundColor = color;
  editBtn.style.backgroundColor = color;
};

const cardRightBtnToggle = (removeBtn, editBtn, className) => {
  removeBtn.classList.toggle(className);
  editBtn.classList.toggle(className);
};

const removeClassNameActive = (targetColumn) => {
  const btns = getElems(".column-add-btn", targetColumn);
  btns.forEach((btn) => {
    if (btn.classList.contains("active")) btn.classList.remove("active");
  });
};

const toggleClassNamedFadeoutCol = () => {
  const addBtns = getElems(".column-add-btn");
  const removeBtns = getElems(".column-remove-btn");
  const rightBtn = getElem(".chat-menu-btn");
  rightBtn.classList.toggle("fadeout-col");
  addBtns.forEach((ele) => ele.classList.toggle("fadeout-col"));
  removeBtns.forEach((ele) => ele.classList.toggle("fadeout-col"));
};

export {
  cardRightBtnsBackgroundChange,
  cardRightBtnToggle,
  removeClassNameActive,
  toggleClassNamedFadeoutCol,
};
