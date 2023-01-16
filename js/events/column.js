import { getElem, getTargetParentByClassName } from "../utils/utils.js";
import { store } from "../init.js";
import { newColumn } from "../components/card.js";

const logWrapper = getElem(".log-wrapper");
const headerRightBtn = getElem(".chat-menu-btn");

const changeColumnNameEventHandler = (e) => {
  if (e.target.className === "column-header-title") {
    const targetColumn = getTargetParentByClassName(e.target, "column-wrapper");
    const currentName = e.target.innerHTML;
    console.log("to be fixed......");
  }
};

const addWholeColumnClickEventHandler = (e) => {
  const colNode = getElem(".columns-wrapper");
  store.updateColumnId();
  console.log("is working?");
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

const columnEvents = () => {
  const columnWrapperEl = getElem(".columns-wrapper");
  columnWrapperEl.addEventListener("click", deleteWholeColumnClickEventHandler);
  columnWrapperEl.addEventListener("dblclick", changeColumnNameEventHandler);
  const fab = getElem(".add-column-btn-wrapper");
  fab.addEventListener("click", addWholeColumnClickEventHandler);
};

export { columnEvents };
