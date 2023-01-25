import {
  getTargetParent,
  getElem,
  getElems,
  cardCountChecker,
} from "../utils/utils.js";
import { Logs } from "../stores/Logs.js";
import {
  cardRightBtnsBackgroundChange,
  cardRightBtnToggle,
  toggleClassNamedFadeoutCol,
  cardsBackgroundColorToggle,
} from "../utils/styles.js";
import { store } from "../init.js";

const modalWrapperEl = getElem(".modal-wrapper");

const modalEvent = () => {
  const modalCancelBtnEl = getElem(".modal-cancel-btn");
  const modalRemoveBtnEl = getElem(".modal-remove-btn");
  modalRemoveBtnEl.addEventListener("click", removeBtnClickEventHandler);
  modalCancelBtnEl.addEventListener("click", cancelBtnClickEventHandler);
};

const removeBtnClickEventHandler = () => {
  const focusedCard = getElem(".focused");
  const removedData = getElem(".card-title", focusedCard).textContent;
  const bodyEl = document.body;
  const logWrapper = getElem(".log-wrapper");
  const columnWrapper = getTargetParent(focusedCard, "column-wrapper");
  const colHeaderEl = getElem(".column-header-title", columnWrapper).innerHTML;
  cardsBackgroundColorToggle();
  new Logs(logWrapper, colHeaderEl, removedData, "REMOVE");
  bodyEl.classList.remove("modal-display");
  store.removeObjectById(focusedCard.id);
  focusedCard.remove();
  modalWrapperEl.classList.remove("active");
  toggleClassNamedFadeoutCol();
  cardCountChecker();
};

const cancelBtnClickEventHandler = () => {
  const bodyEl = document.body;
  const wrapperEl = getElem(".clicked");
  const [removeBtn, editBtn] = getElems(".clicked", wrapperEl);
  cardRightBtnsBackgroundChange(removeBtn, editBtn, "#ffffff");
  cardRightBtnToggle(removeBtn, editBtn, "clicked");
  cardsBackgroundColorToggle();
  modalWrapperEl.classList.remove("active");
  bodyEl.classList.remove("modal-display");
  wrapperEl.classList.remove("clicked", "focuesd", "mouse-on");
  toggleClassNamedFadeoutCol();
};

export { modalEvent };
