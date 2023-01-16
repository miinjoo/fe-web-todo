import { getElem, getTargetParentByClassName } from "../utils/utils.js";
import { store } from "../init.js";
import { columns } from "../stores/Columns.js";
import { newColumn } from "../components/card.js";
import { columnNameInputField } from "../components/column.js";

const logWrapper = getElem(".log-wrapper");
const headerRightBtn = getElem(".chat-menu-btn");

const changeColumnNameEventHandler = ({ target }) => {
  if (target.className === "column-header-title") {
    const currentName = target.innerHTML;
    target.innerHTML = columnNameInputField(currentName);
  }
};

const columnNameOtherAreaClickEventHandler = ({ target }) => {
  const fixingColEl = getElem(".colname-fix");
  if (fixingColEl && target.className !== "colname-fix") {
    const titleEl = getTargetParentByClassName(
      fixingColEl,
      "column-header-title"
    );
    const fixedColName = fixingColEl.value;
    fixingColEl.remove();
    titleEl.innerHTML = fixedColName;
  }
};

const addWholeColumnClickEventHandler = (e) => {
  const colNode = getElem(".columns-wrapper");
  store.updateColumnId();
  colNode.innerHTML += newColumn({ id: store.getColumnId(), title: "냉무" });
  columns.addCol(store.getColumnId());
};

const deleteWholeColumnClickEventHandler = (e) => {
  if (e.target.className === "column-remove-btn") {
    const targetColumn = getTargetParentByClassName(e.target, "column-wrapper");
    const columnId = targetColumn.getAttribute("id");
    if (columnId <= 2) {
      alert("You can't remove default Column!");
      return;
    }
    columns.removeCol(columnId);
    targetColumn.remove();
  }
};

const columnEvents = () => {
  const columnWrapperEl = getElem(".columns-wrapper");
  const fabEl = getElem(".add-column-btn-wrapper");
  const bodyEl = document.body;
  columnWrapperEl.addEventListener("click", deleteWholeColumnClickEventHandler);
  columnWrapperEl.addEventListener("dblclick", changeColumnNameEventHandler);
  bodyEl.addEventListener("click", columnNameOtherAreaClickEventHandler);
  fabEl.addEventListener("click", addWholeColumnClickEventHandler);
};

export { columnEvents };
