import {
  newCardWrapper,
  cardWrapper,
  fixCardWrapper,
  fixedWrapper,
} from "../components/card.js";
import {
  deleteNode,
  addClsssName,
  getTargetParentByClassName,
  getElems,
  getElem,
  cardsBackgroundColorToggle,
  cardCountChecker,
} from "../utils/utils.js";
import { store } from "../init.js";
import { inputFieldsValidator } from "../utils/validations.js";
import { Logs } from "../stores/Logs.js";
import {
  cardRightBtnsBackgroundChange,
  cardRightBtnToggle,
  removeClassNameActive,
  toggleClassNamedFadeoutCol,
} from "../utils/styles.js";
import { addCardDataToServer, modifyCardDataInServer } from "../utils/fetch.js";

const logWrapper = getElem(".log-wrapper");

const cardAddBtnClickEventHandler = (e) => {
  if (e.target.className === "column-add-btn") {
    const targetColumn = getTargetParentByClassName(e.target, "column-wrapper");
    addClsssName(e.target, "active");
    targetColumn.innerHTML += newCardWrapper({ id: "newCardInput" });
  }
};

const cardAddBtnConfirmEventHandler = (e) => {
  if (e.target.className === "card-add-btn") {
    const targetColumn = getTargetParentByClassName(e.target, "column-wrapper");
    const columnId = targetColumn.getAttribute("id");
    const newCardInputEl = getElem("#newCardInput");
    const columnName = getElem(".column-header-title", targetColumn);
    const newInputData = [...newCardInputEl.children]
      .filter((v) => v.tagName === "INPUT")
      .map((v) => v.value);
    const [title, text] = newInputData;
    removeClassNameActive(targetColumn);
    deleteNode("#newCardInput");
    if (!inputFieldsValidator(title, text)) {
      alert("please input all fields");
      return;
    }
    store.updateCardId();
    const id = "card-" + String(store.getCardId());
    const newCardItem = {
      id,
      standing: columnId,
      title,
      contents: text,
    };
    store.addItems(newCardItem);
    addCardDataToServer(newCardItem);
    targetColumn.innerHTML += cardWrapper({ title, text, id });
    new Logs(logWrapper, columnName.innerHTML, title, "ADD");
    cardCountChecker();
  }
};

const cardCancelBtnClickEventHandler = (e) => {
  if (e.target.className === "card-cancel-btn") {
    const targetColumn = getTargetParentByClassName(e.target, "column-wrapper");
    removeClassNameActive(targetColumn);
    deleteNode("#newCardInput");
  }
};

const cardRemoveBtnMouseOnEventHandler = (e) => {
  if (e.target.className === "card-remove-btn") {
    const cardNode = getTargetParentByClassName(e.target, "card-wrapper");
    cardNode.classList.add("mouse-on");
    const editBtn = e.target.nextElementSibling;
    cardRightBtnsBackgroundChange(e.target, editBtn, "#ffeeec");
  }
};

const cardRemoveBtnMouseOutEvenetHandler = (e) => {
  if (e.target.className === "card-remove-btn") {
    const cardNode = getTargetParentByClassName(e.target, "card-wrapper");
    cardNode.classList.remove("mouse-on");
    const editBtn = e.target.nextElementSibling;
    cardRightBtnsBackgroundChange(e.target, editBtn, "#fff");
  }
};

const cardRemoveConfirmEventHandler = (e) => {
  if (e.target.className === "card-remove-btn") {
    const cardNode = getTargetParentByClassName(e.target, "card-wrapper");
    const modalWrapperEl = getElem(".modal-wrapper");
    cardRightBtnToggle(e.target, e.target.nextElementSibling, "clicked");
    toggleClassNamedFadeoutCol();
    cardNode.classList.add("focused", "clicked");
    modalWrapperEl.classList.add("active");
    document.body.classList.add("modal-display");
    cardsBackgroundColorToggle();
  }
};

const cardModificationEventHandler = (e) => {
  if (e.target.className === "card-edit-btn") {
    const targetCard = getTargetParentByClassName(e.target, "card-wrapper");
    targetCard.innerHTML = fixCardWrapper({ title: "", text: "" });
    targetCard.classList.add("fixing");
  }
};

const cardModificationCancelBtnHandler = (e) => {
  if (e.target.className === "card-fix-cancel-btn") {
    const cardEl = getTargetParentByClassName(e.target, "fixing");
    const cardId = cardEl.getAttribute("id");
    const originData = store.getDatas();
    const parsedData = originData.find((ele) => ele.id === cardId);
    cardEl.innerHTML = fixedWrapper({
      title: parsedData.title,
      text: parsedData.contents,
    });
    cardEl.classList.remove("fixing");
  }
};

const cardModificationSubmittnHandler = (e) => {
  if (e.target.className === "card-fix-add-btn") {
    const cardEl = getTargetParentByClassName(e.target, "fixing");
    const cardId = cardEl.getAttribute("id");
    const targetColumn = getTargetParentByClassName(cardEl, "column-wrapper");
    const standing = targetColumn.getAttribute("id");
    const columnName = getElem(".column-header-title", targetColumn);
    const newInputData = [...cardEl.children]
      .filter((v) => v.tagName === "INPUT")
      .map((v) => v.value);
    const [title, text] = newInputData;
    store.modifyDataFromEdit(cardId, title, text);
    modifyCardDataInServer(cardId, { cardId, standing, title, text });
    cardEl.innerHTML = fixedWrapper({ title, text });
    cardEl.classList.remove("fixing");
    new Logs(logWrapper, columnName.innerHTML, title, "FIX");
  }
};

const cardEvents = () => {
  const columnsWrapperEl = getElems(".columns-wrapper");
  columnsWrapperEl.forEach((columnWrapper) => {
    columnWrapper.addEventListener("click", (e) => {
      cardAddBtnConfirmEventHandler(e);
      cardAddBtnClickEventHandler(e);
      cardCancelBtnClickEventHandler(e);
      cardRemoveConfirmEventHandler(e);
      cardModificationCancelBtnHandler(e);
      cardModificationSubmittnHandler(e);
      cardModificationEventHandler(e);
    });
  });
  columnsWrapperEl.forEach((removeBtn) => {
    removeBtn.addEventListener("mouseover", (e) => {
      cardRemoveBtnMouseOnEventHandler(e);
    });
  });
  columnsWrapperEl.forEach((removeBtn) => {
    removeBtn.addEventListener("mouseout", (e) => {
      cardRemoveBtnMouseOutEvenetHandler(e);
    });
  });
};

export { cardEvents };
