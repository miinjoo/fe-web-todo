import {
  newCardWrapper,
  cardWrapper,
  fixCardWrapper,
  fixedWrapper,
} from "../components/card.js";
import {
  deleteNode,
  getTargetParent,
  getElems,
  getElem,
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
  cardsBackgroundColorToggle,
} from "../utils/styles.js";
import {
  addCardDataToServer,
  getCardDataFromServer,
  modifyCardDataInServer,
} from "../utils/fetch.js";

const logWrapper = getElem(".log-wrapper");

const cardAddBtnClickEventHandler = ({ target }) => {
  if (target.className !== "column-add-btn") return;
  const targetColumn = getTargetParent(target, "column-wrapper");
  target.classList.add("active");
  targetColumn.innerHTML += newCardWrapper({ id: "newCardInput" });
};

const cardAddBtnConfirmEventHandler = ({ target }) => {
  if (target.className !== "card-add-btn") return;
  const targetColumn = getTargetParent(target, "column-wrapper");
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
    standing: columnId,
    title,
    contents: text,
  };
  store.addItems(newCardItem);
  addCardDataToServer(newCardItem);
  targetColumn.innerHTML += cardWrapper({ title, text, id });
  new Logs(logWrapper, columnName.innerHTML, title, "ADD");
  cardCountChecker();
};

const cardCancelBtnClickEventHandler = ({ target }) => {
  if (target.className !== "card-cancel-btn") return;
  const targetColumn = getTargetParent(target, "column-wrapper");
  removeClassNameActive(targetColumn);
  deleteNode("#newCardInput");
};

const cardRemoveBtnMouseOnEventHandler = ({ target }) => {
  if (target.className !== "card-remove-btn") return;
  const cardNode = getTargetParent(target, "card-wrapper");
  cardNode.classList.add("mouse-on");
  const editBtn = target.nextElementSibling;
  cardRightBtnsBackgroundChange(target, editBtn, "#ffeeec");
};

const cardRemoveBtnMouseOutEvenetHandler = ({ target }) => {
  if (target.className !== "card-remove-btn") return;
  const cardNode = getTargetParent(target, "card-wrapper");
  cardNode.classList.remove("mouse-on");
  const editBtn = target.nextElementSibling;
  cardRightBtnsBackgroundChange(target, editBtn, "#fff");
};

const cardRemoveConfirmEventHandler = ({ target }) => {
  if (target.className !== "card-remove-btn") return;
  const cardNode = getTargetParent(target, "card-wrapper");
  const modalWrapperEl = getElem(".modal-wrapper");
  cardRightBtnToggle(target, target.nextElementSibling, "clicked");
  toggleClassNamedFadeoutCol();
  cardNode.classList.add("focused", "clicked");
  modalWrapperEl.classList.add("active");
  document.body.classList.add("modal-display");
  cardsBackgroundColorToggle();
};

const cardModificationEventHandler = ({ target }) => {
  if (target.className !== "card-edit-btn") return;
  const targetCard = getTargetParent(target, "card-wrapper");
  targetCard.innerHTML = fixCardWrapper({ title: "", text: "" });
  targetCard.classList.add("fixing");
};
//both cancel, submit modifications needs to be fixed!
const cardModificationCancelBtnHandler = async ({ target }) => {
  if (target.className !== "card-fix-cancel-btn") return;
  const cardEl = getTargetParent(target, "fixing");
  const cardId = cardEl.getAttribute("id");
  const originData = await getCardDataFromServer();
  console.log(originData);
  const parsedData = originData.find((ele) => "card-" + ele.id == cardId);
  console.log(parsedData);
  cardEl.innerHTML = fixedWrapper({
    title: parsedData.title,
    text: parsedData.text,
  });
  cardEl.classList.remove("fixing");
};

const cardModificationSubmittnHandler = ({ target }) => {
  if (target.className !== "card-fix-add-btn") return;
  const cardEl = getTargetParent(target, "fixing");
  const cardId = cardEl.getAttribute("id");
  const targetColumn = getTargetParent(cardEl, "column-wrapper");
  const standing = targetColumn.getAttribute("id");
  const columnName = getElem(".column-header-title", targetColumn);
  const newInputData = [...cardEl.children]
    .filter((v) => v.tagName === "INPUT")
    .map((v) => v.value);
  const [title, text] = newInputData;
  store.modifyDataFromEdit(cardId, title, text);
  const cardIdForServer = cardId.slice(5);
  modifyCardDataInServer(cardIdForServer, {
    id: cardIdForServer,
    standing,
    title,
    text,
  });
  cardEl.innerHTML = fixedWrapper({ title, text });
  cardEl.classList.remove("fixing");
  new Logs(logWrapper, columnName.innerHTML, title, "FIX");
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
