import {
  checkLogCount,
  getTargetParentByClassName,
  getElem,
  getElems,
  cardsBackgroundColorToggle,
} from "../utils/utils.js";
import { Logs } from "../stores/Logs.js";
import {
  cardRightBtnsBackgroundChange,
  cardRightBtnToggle,
} from "../utils/styles.js";

const modalWrapperEl = getElem(".modal-wrapper");

const modalEvent = () => {
  const modalCancelBtnEl = getElem(".modal-cancel-btn");
  const modalRemoveBtnEl = getElem(".modal-remove-btn");
  modalRemoveBtnEl.addEventListener("click", removeBtnClickEventHandler);
  modalCancelBtnEl.addEventListener("click", cancelBtnClickEventHandler);
};

const columnBtnsBackgroundRemove = () => {
  const addBtns = getElems(".column-add-btn");
  const removeBtns = getElems(".column-remove-btn");
  const rightBtn = getElem(".chat-menu-btn");
  rightBtn.classList.remove("fadeout-col");
  addBtns.forEach((ele) => ele.classList.remove("fadeout-col"));
  removeBtns.forEach((ele) => ele.classList.remove("fadeout-col"));
};

const removeBtnClickEventHandler = () => {
  const focusedCard = getElem(".focused");
  const removedData = getElem(".card-title", focusedCard).textContent;
  const bodyEl = document.body;
  const logWrapper = getElem(".log-wrapper");
  const columnWrapper = getTargetParentByClassName(
    focusedCard,
    "column-wrapper"
  );
  const colHeaderEl = getElem(".column-header-title", columnWrapper).innerHTML;
  cardsBackgroundColorToggle();
  new Logs(logWrapper, colHeaderEl, removedData, "remove");
  bodyEl.classList.remove("modal-display");
  focusedCard.remove();
  modalWrapperEl.classList.remove("active");
  columnBtnsBackgroundRemove();
  checkLogCount(columnWrapper);
};

const cancelBtnClickEventHandler = () => {
  const bodyEl = document.body;
  const wrapperEl = getElem(".clicked");
  const [removeBtn, editBtn] = getElems(".clicked", wrapperEl);
  cardRightBtnsBackgroundChange(removeBtn, editBtn, "#ffffff");
  cardRightBtnToggle(removeBtn, editBtn, "clicked");
  modalWrapperEl.classList.remove("active");
  bodyEl.classList.remove("modal-display");
  wrapperEl.classList.remove("clicked", "focuesd", "mouse-on");
  columnBtnsBackgroundRemove();
};

export { modalEvent };
