import {
  newCardWrapper,
  cardWrapper,
  newColumn,
  fixCardWrapper,
  fixedWrapper,
} from "../components/card.js";
import {
  deleteNode,
  addClsssName,
  getTargetParentByClassName,
  checkLogCount,
  getElems,
  getElem,
  cardsBackgroundColorToggle,
} from "../utils/utils.js";
import { store } from "../init.js";
import { cancel, threeBars } from "../components/rightBtn.js";
import { inputFieldsValidator } from "../utils/validations.js";
import { Logs } from "../stores/Logs.js";
import {
  cardRightBtnsBackgroundChange,
  cardRightBtnToggle,
} from "../utils/styles.js";

const logWrapper = getElem(".log-wrapper");
const headerRightBtn = getElem(".chat-menu-btn");

const changeColumnNameEventHandler = (e) => {
  if (e.target.className === "column-header-title") {
    const targetColumn = getTargetParentByClassName(e.target, "column-wrapper");
    const currentName = e.target.innerHTML;
    console.log("to be fixed......");
  }
};

const columnAddBtnClickEventHandler = (e) => {
  if (e.target.className === "column-add-btn") {
    const targetColumn = getTargetParentByClassName(e.target, "column-wrapper");
    addClsssName(e.target, "active");
    targetColumn.innerHTML += newCardWrapper({ id: "newCardInput" });
  }
};

const cardAddBtnClickEventHandler = (e) => {
  if (e.target.className === "card-add-btn") {
    const newCardInfor = {
      title: null,
      text: null,
      id: null,
    };
    const targetColumn = getTargetParentByClassName(e.target, "column-wrapper");
    const newCardInputEl = getElem("#newCardInput");
    const columnName = getElem(".column-header-title", targetColumn);
    const newInputData = [...newCardInputEl.children]
      .filter((v) => v.tagName === "INPUT")
      .map((v) => v.value);
    newCardInfor.title = newInputData[0];
    newCardInfor.text = newInputData[1];
    if (!inputFieldsValidator(newCardInfor)) {
      getElems(".column-add-btn", targetColumn).forEach((v) => {
        if (v.classList.contains("active")) v.classList.remove("active");
      });
      deleteNode("#newCardInput");
      alert("please input all fields");
      return;
    }
    store.updateCardId();
    newCardInfor.id = "card-" + String(store.getCardId());
    const columnId = targetColumn.getAttribute("id");
    store.addItems({
      id: newCardInfor.id,
      standing: columnId,
      title: newInputData[0],
      contents: newCardInfor.text,
    });

    getElems(".column-add-btn", targetColumn).forEach((v) => {
      if (v.classList.contains("active")) v.classList.remove("active");
    });
    targetColumn.innerHTML += cardWrapper(newCardInfor);

    deleteNode("#newCardInput");
    new Logs(logWrapper, columnName.innerHTML, newCardInfor.title, "add");
    checkLogCount(targetColumn, columnId);
  }
};

const cardCancelBtnClickEventHandler = (e) => {
  if (e.target.className === "card-cancel-btn") {
    getElems(".column-add-btn").forEach((v) => {
      if (v.classList.contains("active")) v.classList.remove("active");
    });
    deleteNode("#newCardInput");
  }
};

const cardRemoveHoverEventHandler = (e) => {
  if (e.target.className === "card-remove-btn") {
    const cardNode = getTargetParentByClassName(e.target, "card-wrapper");
    cardNode.classList.add("mouse-on");
    const editBtn = e.target.nextElementSibling;
    cardRightBtnsBackgroundChange(e.target, editBtn, "#ffeeec");
  }
};

const cardRemoveOutEvenetHandler = (e) => {
  if (e.target.className === "card-remove-btn") {
    const cardNode = getTargetParentByClassName(e.target, "card-wrapper");
    cardNode.classList.remove("mouse-on");
    const editBtn = e.target.nextElementSibling;
    cardRightBtnsBackgroundChange(e.target, editBtn, "#fff");
  }
};

const cardRemoveClickEventHandler = (e) => {
  if (e.target.className === "card-remove-btn") {
    const cardNode = getTargetParentByClassName(e.target, "card-wrapper");
    const modalWrapperEl = getElem(".modal-wrapper");
    cardRightBtnToggle(e.target, e.target.nextElementSibling, "clicked");
    const bodyEl = document.body;
    addClassToAllBtns();
    cardNode.classList.add("focused", "clicked");
    modalWrapperEl.classList.add("active");
    bodyEl.classList.add("modal-display");
    cardsBackgroundColorToggle();
  }
};

const addClassToAllBtns = () => {
  const addBtns = getElems(".column-add-btn");
  const removeBtns = getElems(".column-remove-btn");
  headerRightBtn.classList.add("fadeout-col");
  addBtns.forEach((ele) => ele.classList.add("fadeout-col"));
  removeBtns.forEach((ele) => ele.classList.add("fadeout-col"));
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
    const columnName = getElem(".column-header-title", targetColumn);
    const newInputData = [...cardEl.children]
      .filter((v) => v.tagName === "INPUT")
      .map((v) => v.value);
    store.modifyData(cardId, newInputData[0], newInputData[1]);
    cardEl.innerHTML = fixedWrapper({
      title: newInputData[0],
      text: newInputData[1],
    });
    cardEl.classList.remove("fixing");
    new Logs(logWrapper, columnName.innerHTML, newInputData[0], "fix");
  }
};

const addWholeColumnClickEventHandler = (e) => {
  const colNode = getElem(".columns-wrapper");
  store.updateColumnId();
  colNode.innerHTML += newColumn({ id: store.getColumnId(), title: "냉무" });
};

const deleteWholeColumnClickEventHandler = (e) => {
  if (e.target.className === "column-remove-btn") {
    const targetColumn = getTargetParentByClassName(e.target, "column-wrapper");
    const columnId = targetColumn.getAttribute("id");
    if (columnId <= 2) {
      alert("You can't remove default Column!");
      return;
    }
    targetColumn.remove();
  }
};

const doubleClickEvent = () => {
  const columnsWrapperEl = getElem(".columns-wrapper");
  columnsWrapperEl.addEventListener("dblclick", changeColumnNameEventHandler);
};

const columnEvent = () => {
  const columnsWrapperEl = getElems(".columns-wrapper");
  columnsWrapperEl.forEach((columnWrapper) => {
    columnWrapper.addEventListener("click", (e) => {
      columnAddBtnClickEventHandler(e);
      cardAddBtnClickEventHandler(e);
      cardCancelBtnClickEventHandler(e);
      cardRemoveClickEventHandler(e);
      deleteWholeColumnClickEventHandler(e);
      cardModificationCancelBtnHandler(e);
      cardModificationSubmittnHandler(e);
      cardModificationEventHandler(e);
    });
  });
  columnsWrapperEl.forEach((removeBtn) => {
    removeBtn.addEventListener("mouseover", (e) => {
      cardRemoveHoverEventHandler(e);
    });
  });
  columnsWrapperEl.forEach((removeBtn) => {
    removeBtn.addEventListener("mouseout", (e) => {
      cardRemoveOutEvenetHandler(e);
    });
  });

  const columns = getElem(".add-column-btn-wrapper");
  columns.addEventListener("click", addWholeColumnClickEventHandler);
};

const logSgvChange = () => {
  if (headerRightBtn.getAttribute("class").includes("hidden")) {
    headerRightBtn.innerHTML = cancel();
  } else {
    headerRightBtn.innerHTML = threeBars();
  }
};

const logBtnClickEvent = () => {
  headerRightBtn.addEventListener("click", () => {
    logWrapper.classList.toggle("hidden");
    logWrapper.classList.toggle("disappear");
    headerRightBtn.classList.toggle("hidden");
    logSgvChange();
  });
};

export { columnEvent, logBtnClickEvent, doubleClickEvent };
