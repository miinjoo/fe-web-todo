import {
  checkLogCount,
  getTargetParentByClassName,
  getElem,
  getElems,
  cardsBackgroundColorToggle,
} from "../utils/utils.js";
import { log } from "../components/log.js";

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
  const modalWrapperEl = getElem(".modal-wrapper");
  const focusedCard = getElem(".focused");
  const removedData = getElem(".card-title", focusedCard).textContent;
  const focusedCardRemoveBtn = getElem(".clicked", focusedCard);
  const bodyEl = document.body;
  const columnWrapper = getTargetParentByClassName(
    focusedCard,
    "column-wrapper"
  );
  cardsBackgroundColorToggle();
  getElem(".log-wrapper").innerHTML += log(
    getElem(".column-header-title", columnWrapper).innerHTML,
    removedData,
    "remove"
  );
  bodyEl.classList.remove("modal-display");
  focusedCardRemoveBtn.classList.toggle("clicked");
  focusedCard.remove();
  modalWrapperEl.classList.remove("active");
  columnBtnsBackgroundRemove();
  checkLogCount(columnWrapper);
};

const cancelBtnClickEventHandler = () => {
  const modalWrapperEl = getElem(".modal-wrapper");
  const bodyEl = document.body;
  const wrapperEl = getElem(".clicked");
  const focusedCardRemoveBtns = getElems(".clicked", wrapperEl);
  cardsBackgroundColorToggle();
  focusedCardRemoveBtns.forEach((btn) => btn.classList.toggle("clicked"));
  modalWrapperEl.classList.remove("active");
  bodyEl.classList.remove("modal-display");
  wrapperEl.classList.remove("clicked");
  wrapperEl.classList.remove("focused");
  wrapperEl.classList.remove("mouse-on");
  columnBtnsBackgroundRemove();
};

export { modalEvent };
