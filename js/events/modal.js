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
  toggleClassNamedFadeoutCol,
} from "../utils/styles.js";

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
  toggleClassNamedFadeoutCol();
  checkLogCount(columnWrapper);
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
