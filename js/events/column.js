import { getElem, getTargetParentByClassName } from "../utils/utils.js";
import { store } from "../init.js";
import { columns } from "../stores/Columns.js";
import { newColumn } from "../components/card.js";
import { columnNameInputField } from "../components/column.js";
import { inputFieldsValidator } from "../utils/validations.js";
import { Logs } from "../stores/Logs.js";

const logWrapper = getElem(".log-wrapper");
const DUMMY_TEXT = "HELLO WORLD!";
let originColName;

const changeColumnNameEventHandler = ({ target }) => {
  if (target.className === "column-header-title") {
    const currentName = target.innerHTML;
    originColName = currentName;
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
    if (!inputFieldsValidator(fixedColName, DUMMY_TEXT)) {
      alert("You can't leave Column Name empty!");
      titleEl.innerHTML = originColName;
      return;
    }
    titleEl.innerHTML = fixedColName;
    if (fixedColName !== originColName)
      new Logs(logWrapper, originColName, fixedColName, "NAME");
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
